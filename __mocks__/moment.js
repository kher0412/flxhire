'use strict'

let moment = jest.genMockFromModule('moment')

moment.toDate = () => new Date.UTC('2017-10-10')

module.exports = moment

