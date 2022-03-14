import '@babel/polyfill'
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import MockDate from 'mockdate'
import { initializeTimezones } from 'services/timeKeeping'

Enzyme.configure({ adapter: new Adapter() })

window.matchMedia = window.matchMedia || function mockMatchMedia() {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {},
  }
}

MockDate.set('2017/01/01')

initializeTimezones()

jest.setTimeout(5000)
