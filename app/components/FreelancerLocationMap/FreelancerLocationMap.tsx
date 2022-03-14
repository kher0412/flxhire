import React from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { IProfile } from 'types'

const STYLE: React.CSSProperties = {
  height: 300,
  marginBottom: 48,
  marginTop: 24,
  position: 'relative',
}

mapboxgl.accessToken = process.env.MAPBOX_KEY

export interface IFreelancerLocationMapProps {
  profile: {
    location_latitude: number
    location_longitude: number
    location_bounds_0: number
    location_bounds_1: number
    location_bounds_2: number
    location_bounds_3: number
    location_bounds_4: number
  }
  dark?: boolean
  style?: React.CSSProperties
  alwaysRender?: boolean
}

export interface IFreelancerLocationMapState {
}

export default class FreelancerLocationMap extends React.PureComponent<IFreelancerLocationMapProps, IFreelancerLocationMapState> {
  container: HTMLElement

  map: any

  locationMarker: any

  componentDidMount() {
    this.createMapIfNeeded()
    if (this.isValidLocation()) this.addMapMarkerFromCurrentLocation()
  }

  componentDidUpdate(prevProps) {
    if (this.isFreelancerLocationMapDataDifferent(this.props.profile, prevProps.profile)) {
      if (this.isValidLocation()) {
        // Location changing, need new coordinates for map.
        this.addMapMarkerFromCurrentLocation()
      } else {
        this.removeMarker()
      }
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

  removeMarker() {
    try {
      if (this.locationMarker) this.locationMarker.remove()
    } catch (error) {
      console.error(error)
    }
  }

  createMapIfNeeded() {
    if (this.container && !this.map) {
      try {
        this.map = new mapboxgl.Map({
          container: this.container,
          style: this.props.dark ? 'mapbox://styles/mapbox/dark-v9' : 'mapbox://styles/mapbox/light-v9',
          attributionControl: false,
        })
        this.map.addControl(new mapboxgl.NavigationControl())
      } catch (err) {
        console.error(err)
      }
    }
  }

  getConvertedLocationData(profile) {
    return {
      latitude: profile.location_latitude,
      longitude: profile.location_longitude,
      bounds: [
        (profile.location_bounds_0 - 0.24) || (profile.location_longitude - 1),
        (profile.location_bounds_1 - 0.24) || (profile.location_latitude - 1),
        (profile.location_bounds_2 + 0.24) || (profile.location_longitude + 1),
        (profile.location_bounds_3 + 0.24) || (profile.location_latitude + 1),
      ],
    }
  }

  addMapMarkerFromCurrentLocation = () => {
    if (this.isValidLocation() && this.map) {
      const markerElem = document.createElement('div')
      markerElem.style.width = '12px'
      markerElem.style.height = '12px'
      markerElem.style.borderRadius = '24px'
      markerElem.style.backgroundColor = 'red'
      markerElem.style.border = '2px solid white'

      this.removeMarker()
      try {
        const location = this.getConvertedLocationData(this.props.profile)
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

  isValidLocation = () => this.props.profile && this.props.profile.location_latitude && this.props.profile.location_longitude

  isFreelancerLocationMapDataDifferent(newProfile, previousProfile) {
    if (newProfile && previousProfile) {
      if (newProfile.location_latitude !== previousProfile.location_latitude) return true
      if (newProfile.location_longitude !== previousProfile.location_longitude) return true

      return false
    }
    return (!!newProfile !== !!previousProfile)
  }

  render() {
    let style = STYLE

    if (this.props.style) {
      style = {
        ...STYLE,
        ...this.props.style,
      }
    }

    if (this.isValidLocation() || this.props.alwaysRender) {
      return (
        <div style={style} ref={div => this.container = div} />
      )
    }

    return null
  }
}
