import Dashboard from './Dashboard'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'
import FlexHireTheme from 'FlexHireTheme'

describe('<Dashboard />', () => {
  it('mounts without error', () => {
    const props = {
      interviews: [
        {
          description: 'blah',
          client: {
            avatar_url: 'https://image.com',
            name: 'client name',
            company_website: 'http://company.com'
          },
          availability_type: ['full_time'],
          start_date: '1/1/1970',
        }
      ],
      jobOffers: [
        {
          description: 'blah',
          client: {
            avatar_url: 'https://image.com',
            name: 'client name',
            company_website: 'http://company.com'
          },
          availability_type: ['full_time'],
          start_date: '1/1/1970',
        }
      ],
      clients: [
        {
          description: 'blah',
          client: {
            avatar_url: 'https://image.com',
            name: 'client name',
            company_website: 'http://company.com'
          },
          availability_type: ['full_time'],
          start_date: '1/1/1970',
        }
      ],
      user: {
        profile: {
          availability: 'available_now',
          current: 'available_now'
        }
      },
    }
    shallow(<ThemeProvider theme={FlexHireTheme}><Dashboard {...props}/></ThemeProvider>)
  })
})
