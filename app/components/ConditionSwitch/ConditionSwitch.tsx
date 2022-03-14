const ConditionSwitch = ({ children = [] }: { children: any[] }) => children.find(c => Boolean(c?.props?.condition))

export default ConditionSwitch
