import React from 'react'

export interface IConditionProps {
  condition: boolean
  children: React.ReactNode
}

export default class Condition extends React.Component<IConditionProps> {
  public shouldComponentUpdate(nextProps: IConditionProps): boolean {
    return (this.props.condition || nextProps.condition) ? true : false
  }

  public render(): React.ReactNode {
    if (this.props.condition) {
      return this.props.children
    }

    return null
  }
}
