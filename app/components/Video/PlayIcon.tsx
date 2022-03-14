/* eslint-disable max-len */
import { useTheme } from '@material-ui/core/styles'
import { memo } from 'react'

const PlayIcon = memo(({ compact }: { compact?: boolean }) => {
  const theme = useTheme()

  return (
    <svg width={compact ? 64 : 126} height={compact ? 64 : 126} viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <circle cx="62.5851" cy="59.014" r="37.1115" fill="white" />
        <path d="M55.9302 72.8417C55.4618 72.8417 55.0127 72.6556 54.6815 72.3245C54.3503 71.9933 54.1643 71.5441 54.1643 71.0758V46.3538C54.1642 46.0372 54.2491 45.7265 54.4102 45.4541C54.5714 45.1816 54.8028 44.9575 55.0802 44.8052C55.3576 44.6528 55.6709 44.5778 55.9873 44.5881C56.3036 44.5983 56.6114 44.6934 56.8784 44.8634L76.3029 57.2244C76.5538 57.3838 76.7603 57.604 76.9035 57.8645C77.0466 58.1251 77.1216 58.4175 77.1216 58.7148C77.1216 59.012 77.0466 59.3045 76.9035 59.565C76.7603 59.8256 76.5538 60.0457 76.3029 60.2052L56.8784 72.5662C56.595 72.7463 56.266 72.8419 55.9302 72.8417Z" fill={theme.palette.primary.main} />
      </g>

      <defs>
        <filter id="filter0_d" x="0.473633" y="0.902588" width="124.223" height="124.223" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="12.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
})

export default PlayIcon
