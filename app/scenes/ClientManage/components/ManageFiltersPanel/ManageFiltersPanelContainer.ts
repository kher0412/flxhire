import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import {
  SET_FILTER_PARAMS,
  CLEAR_FILTER_PARAMS,
  IManageFilterParams,
} from '../../ManageDucks'
import ManageFiltersPanel from './ManageFiltersPanel'

export type SetManageFilter = (key: keyof IManageFilterParams, value: IManageFilterParams[typeof key]) => void

const mapStateToProps = (state: RootState) => ({
  filterParams: state.clientManage.filterParams,
})

const mapDispatchToProps = dispatch => ({
  setFilter: ((key, value) => {
    dispatch(createAction(SET_FILTER_PARAMS)({
      key: key,
      value: value,
    }))
  }) as SetManageFilter,
  clearFilterParams: () => dispatch(createAction(CLEAR_FILTER_PARAMS)()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ManageFiltersPanel)
