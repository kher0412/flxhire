import React from 'react'
import dynamic from 'services/dynamic'
import { DialogTitle, DialogContent, DialogActions, Zoom } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { FormValue } from 'types'
import Address from './components/Address'
import styles from './LocationFields.module.css'

// Mapbox does not work on the server side
const FreelancerLocationMap = dynamic(
  () => import(/* webpackChunkName: "FreelancerLocationMap" */'components/FreelancerLocationMap'),
  {
    ssr: false,
    loading: () => <div style={{ height: 240, backgroundColor: '#eee' }} />,
  },
) as any

interface ILocationFieldsProps {
  editable?: boolean
  location_bounds_0: FormValue<number>
  location_bounds_1: FormValue<number>
  location_bounds_2: FormValue<number>
  location_bounds_3: FormValue<number>
  location_latitude: FormValue<number>
  location_longitude: FormValue<number>
  full_address: FormValue<string>
  region: FormValue<string>
  country: FormValue<string>
  city: FormValue<string>
}

interface ILocationFieldsState {
  isEditorOpen: boolean
}

export default class LocationFields extends React.PureComponent<ILocationFieldsProps, ILocationFieldsState> {
  render() {
    const {
      editable,
      location_bounds_0,
      location_bounds_1,
      location_bounds_2,
      location_bounds_3,
      location_latitude,
      location_longitude,
      full_address,
    } = this.props

    const locationStyle = {
      marginTop: 0,
      marginBottom: 0,
      backgroundColor: 'rgba(0,0,0,0.08)',
      borderBottom: '2px solid #E0E9F2',
      height: 240,
      zIndex: 2, // allow clicking the map near the avatar as well
    }

    return (
      <div className={styles.container}>
        <div className={styles.map}>
          <FreelancerLocationMap
            profile={{
              location_bounds_0: location_bounds_0.input.value || 0,
              location_bounds_1: location_bounds_1.input.value || 0,
              location_bounds_2: location_bounds_2.input.value || 0,
              location_bounds_3: location_bounds_3.input.value || 0,
              location_latitude: location_latitude.input.value || 0,
              location_longitude: location_longitude.input.value || 0,
            }}
            style={locationStyle}
            alwaysRender
          />
        </div>

        {full_address.meta.error && full_address.meta.touched && (
          <div className={styles.error} data-cy="profile-location-error">
            {full_address.meta.error}
          </div>
        )}

        <Zoom in={editable} mountOnEnter unmountOnExit style={{ transitionDelay: '1000ms' }}>
          <Address
            name="full_address"
            label="Enter your location..."
            onSelectLocation={this.onAddressSelect}
            editable={editable}
          />
        </Zoom>
      </div>
    )
  }

  onAddressSelect = (e, address) => {
    /* eslint-disable camelcase */
    const {
      location_bounds_0,
      location_bounds_1,
      location_bounds_2,
      location_bounds_3,
      location_latitude,
      location_longitude,
      full_address,
      region,
      country,
      city,
    } = this.props

    e.preventDefault()

    location_latitude.input.onChange(address.latitude)
    location_longitude.input.onChange(address.longitude)
    location_bounds_0.input.onChange(address.bounds[0])
    location_bounds_1.input.onChange(address.bounds[1])
    location_bounds_2.input.onChange(address.bounds[2])
    location_bounds_3.input.onChange(address.bounds[3])
    region.input.onChange(address.region)
    country.input.onChange(address.country)
    city.input.onChange(address.city)
    full_address.input.onChange(address.placeName)
  }
}
