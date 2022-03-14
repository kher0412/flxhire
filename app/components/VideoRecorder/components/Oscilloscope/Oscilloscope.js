import React from 'react'
import { trackError } from 'services/analytics'
import styles from './Oscilloscope.module.css'

const ANALYSER_FAST_FOURIER_TRANSFORM_SIZE = 128
const CANVAS_PADDING = 16
const AMBIENT_SIGNAL_FREQ = 372
const AMBIENT_SIGNAL_FREQ_RAMP_ORIGIN = 20000
const AMBIENT_SIGNAL_FREQ_RAMP_DURATION = 1.25
const AMBIENT_SIGNAL_GAIN = 0
const AMBIENT_SIGNAL_GAIN_RAMP_ORIGIN = 0.2
const AMBIENT_SIGNAL_GAIN_RAMP_DURATION = 1.75
const SPECTRUM_NOISE_GATE = 94
const SPECTRUM_MAX_FALL_RATE = 14

export default class Oscilloscope extends React.PureComponent {
  componentDidMount() {
    const { stream } = this.props

    try {
      // Note: on Safari the API is prefixed, so we need to use webkitAudioContext
      const AudioContext = window.AudioContext || window.webkitAudioContext
      this.audioCtx = new AudioContext()
    } catch (err) {
      trackError(err)
    }

    if (!this.audioCtx) return

    try {
      this.analyserNode = this.audioCtx.createAnalyser()
      this.analyserNode.fftSize = ANALYSER_FAST_FOURIER_TRANSFORM_SIZE
      this.analyserNode.smoothingTimeConstant = 0.3
      this.analyserBin = new Uint8Array(this.analyserNode.frequencyBinCount)
      this.analyserCurrentData = new Uint8Array(this.analyserNode.frequencyBinCount)

      this.gainNode = this.audioCtx.createGain()
      this.gainNode.gain.value = 1.5
      this.gainNode.connect(this.analyserNode)

      // Add a subtle, ambient sine signal to animate the oscilloscope even without loud-enough voice input.
      this.ambientOscillatorNode = this.audioCtx.createOscillator()
      this.ambientGainNode = this.audioCtx.createGain()
      this.ambientOscillatorNode.frequency.value = AMBIENT_SIGNAL_FREQ
      this.ambientGainNode.gain.value = AMBIENT_SIGNAL_GAIN
      this.ambientOscillatorNode.start()
      this.ambientOscillatorNode.connect(this.ambientGainNode)
      this.ambientGainNode.connect(this.analyserNode)

      if (stream) {
        this.streamSourceNode = this.audioCtx.createMediaStreamSource(stream)
        this.streamSourceNode.connect(this.gainNode)

        this.ambientOscillatorNode.frequency.cancelScheduledValues(0)
        this.ambientOscillatorNode.frequency.setValueCurveAtTime(
          [AMBIENT_SIGNAL_FREQ_RAMP_ORIGIN, AMBIENT_SIGNAL_FREQ],
          this.audioCtx.currentTime,
          AMBIENT_SIGNAL_FREQ_RAMP_DURATION,
        )

        this.ambientGainNode.gain.cancelScheduledValues(0)
        this.ambientGainNode.gain.setValueCurveAtTime(
          [AMBIENT_SIGNAL_GAIN_RAMP_ORIGIN, AMBIENT_SIGNAL_GAIN],
          this.audioCtx.currentTime,
          AMBIENT_SIGNAL_GAIN_RAMP_DURATION,
        )
      }
    } catch (error) {
      trackError(error)
    }

    this.draw()
  }

  componentDidUpdate(prevProps) {
    const { stream } = this.props

    if (!this.audioCtx) return

    try {
      if (stream !== prevProps.stream) {
      // Recreate and rewire MediaStreamAudioSourceNode to AnalyserNode.
        if (prevProps.stream) {
          if (typeof this.streamSourceNode?.disconnect === 'function') this.streamSourceNode.disconnect()
          this.streamSourceNode = undefined
        }

        if (stream) {
          this.streamSourceNode = this.audioCtx.createMediaStreamSource(stream)
          this.streamSourceNode.connect(this.gainNode)

          this.ambientOscillatorNode.frequency.cancelScheduledValues(0)
          this.ambientOscillatorNode.frequency.setValueCurveAtTime(
            [AMBIENT_SIGNAL_FREQ_RAMP_ORIGIN, AMBIENT_SIGNAL_FREQ],
            this.audioCtx.currentTime,
            AMBIENT_SIGNAL_FREQ_RAMP_DURATION,
          )

          this.ambientGainNode.gain.cancelScheduledValues(0)
          this.ambientGainNode.gain.setValueCurveAtTime(
            [AMBIENT_SIGNAL_GAIN_RAMP_ORIGIN, AMBIENT_SIGNAL_GAIN],
            this.audioCtx.currentTime,
            AMBIENT_SIGNAL_GAIN_RAMP_DURATION,
          )
        }
      }
    } catch (error) {
      trackError(error)
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.drawAnimFrameHandle)

    try {
      this.audioCtx?.close()
    } catch (err) {
      // Support for older browsers with legacy audio context extension IDL throwing for closing realtime contexts.
      // This call only throws in this case, no need to handle or track the error.
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <canvas
          className={styles.canvas}
          style={{ width: ANALYSER_FAST_FOURIER_TRANSFORM_SIZE * 3 }}
          ref={canvas => this.canvas = canvas}
        />
      </div>
    )
  }

  draw() {
    try {
      const canvas = this.canvas
      const canvasCtx = canvas.getContext('2d')

      // ========================================================================
      // Actualize canvas dimensions and clear.
      // ========================================================================

      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        // Setting canvas buffer dimensions also clears the canvas.
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
      } else {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      }

      const h = canvas.height - CANVAS_PADDING * 2

      // ========================================================================
      // Acquire audio frequency bands and plot on canvas.
      // ========================================================================

      if (this.analyserNode) {
        this.analyserNode.getByteFrequencyData(this.analyserBin)

        // Smooth fall.
        for (let i = 0, n = this.analyserBin.length; i < n; i++) {
          this.analyserCurrentData[i] = Math.max(
            0,
            this.analyserBin[i],
            Math.round(this.analyserCurrentData[i] - Math.max(1, SPECTRUM_MAX_FALL_RATE * (this.analyserCurrentData[i] / 255))),
          )
        }
      }

      canvasCtx.beginPath()

      for (let i = 0, n = this.analyserCurrentData.length; i < n; i++) {
        // Distribute frequency bands evenly across canvas.
        const x0 = Math.round(canvas.width / 2 + i / (n - 1) * canvas.width) + 0.5
        const x1 = canvas.width - x0

        const amp = Math.pow(Math.max(0, this.analyserCurrentData[i] - SPECTRUM_NOISE_GATE) / (255 - SPECTRUM_NOISE_GATE), 1.5)
        const ampYOffset = amp * h / 2
        const y0 = h / 2 + ampYOffset + CANVAS_PADDING
        const y1 = h / 2 - ampYOffset + CANVAS_PADDING

        canvasCtx.moveTo(x0, y0)
        canvasCtx.lineTo(x0, y1)

        canvasCtx.moveTo(x1, y0)
        canvasCtx.lineTo(x1, y1)
      }

      canvasCtx.strokeStyle = '#fff'
      canvasCtx.lineJoin = 'round'
      canvasCtx.lineWidth = 3
      canvasCtx.lineCap = 'round'
      canvasCtx.stroke()

      this.drawAnimFrameHandle = window.requestAnimationFrame(() => this.draw())
    } catch (error) {
      trackError(error)
    }
  }
}
