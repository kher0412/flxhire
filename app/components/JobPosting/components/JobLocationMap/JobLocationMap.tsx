import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from './JobLocationMap.module.css'

const STYLE: React.CSSProperties = {
  height: 300,
  position: 'relative',
  pointerEvents: 'none',
}

mapboxgl.accessToken = process.env.MAPBOX_KEY

interface IJobLocationMapProps {
  latitude: number
  longitude: number
  style?: React.CSSProperties
  alwaysRender?: boolean
}

export default class JobLocationMap extends React.PureComponent<IJobLocationMapProps> {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }

  container: any

  map: any

  locationMarker: any

  render() {
    let style: React.CSSProperties = STYLE

    if (this.props.style) {
      style = {
        ...STYLE,
        ...this.props.style,
      }
    }

    if (!this.isValidLocation()) {
      if (this.props.alwaysRender) {
        return (
          <div className={styles.container} style={style} ref={div => this.container = div} />
        )
      }

      return null
    }

    return (
      <div className={styles.container} style={style} ref={div => this.container = div} />
    )
  }

  componentDidMount() {
    this.createMapIfNeeded()
    this.addMapMarkerFromCurrentLocation()
  }

  componentDidUpdate() {
    if (!this.isValidLocation() && this.map) {
      this.removeMap()
    } else if (this.map) {
      // Location changing, need new coordinates for map.
      this.addMapMarkerFromCurrentLocation()
    } else {
      this.createMapIfNeeded()
      this.addMapMarkerFromCurrentLocation()
    }
  }

  componentWillUnmount() {
    this.removeMap()
  }

  removeMap() {
    if (!this.map) return
    try {
      this.map.remove()
    } catch (error) {
      // Ignore this error
    }
  }

  createMapIfNeeded() {
    if (this.container && !this.map) {
      try {
        this.map = new mapboxgl.Map({
          container: this.container,
          style: 'mapbox://styles/mapbox/light-v9',
          attributionControl: false,
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  isValidLocation = () => {
    return this.props.latitude && this.props.longitude
  }

  addMapMarkerFromCurrentLocation = () => {
    if (this.isValidLocation() && this.map) {
      let markerElem = document.createElement('div')
      markerElem.style.width = '24px'
      markerElem.style.height = '24px'
      markerElem.style.borderRadius = '24px'
      markerElem.style.backgroundColor = 'red'
      markerElem.style.border = '2px solid white'

      if (this.locationMarker) {
        this.locationMarker.remove()
      }
      try {
        const location = this.getConvertedLocationData(this.props.latitude, this.props.longitude)
        this.locationMarker = new mapboxgl.Marker(markerElem)
          .setLngLat([location.longitude, location.latitude])
          .addTo(this.map)

        if (location.bounds) {
          this.map.fitBounds(location.bounds)
        }
      } catch (err) {
        // Let's not break up the signup flow with API errors.
        console.error(err)
      }
    }
  }

  getConvertedLocationData(latitude, longitude) {
    return {
      latitude: latitude,
      longitude: longitude,
      bounds: [
        longitude - 1,
        latitude - 1,
        longitude + 1,
        latitude + 1,
      ],
    }
  }
}
