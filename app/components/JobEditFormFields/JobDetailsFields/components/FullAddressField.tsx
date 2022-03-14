import React from 'react'
import { FormValue } from 'types'
import Address from 'components/Address'

export interface IFullAddressFieldProps {
  location_type: FormValue<string>
  job_countries: FormValue<any[]>
  job_timezone: FormValue<number>
  timezone_value: FormValue<number>
  timezone_range: FormValue<number>
  full_address: FormValue<string>
  default_distance: FormValue<number>
  country: FormValue<string>
  region: FormValue<string>
  city: FormValue<string>
  location_latitude: FormValue<number>
  location_longitude: FormValue<number>
}

export interface IFullAddressFieldState {
}

export default class FullAddressField extends React.PureComponent<IFullAddressFieldProps, IFullAddressFieldState> {
  render() {
    // eslint-disable-next-line camelcase
    const { full_address } = this.props

    return (
      <Address
        value={full_address.input.value}
        onChange={full_address.input.onChange}
        onSelectLocation={this.handleFullAddressChange}
      />
    )
  }

  handleFullAddressChange = (e: React.ChangeEvent<any>, address: any) => {
    // eslint-disable-next-line camelcase
    const { full_address, region, country, city, location_latitude, location_longitude } = this.props

    e.preventDefault()

    full_address.input.onChange(address.placeName)
    region.input.onChange(address.region)
    country.input.onChange(address.country)
    city.input.onChange(address.city)
    location_latitude.input.onChange(address.latitude)
    location_longitude.input.onChange(address.longitude)
  }
}
