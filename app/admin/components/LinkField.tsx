import React, { CSSProperties } from 'react'
import { get } from 'lodash'

interface ILinkFieldProps {
  record?: any
  source: string
  text?: any
  download?: any
  elStyle?: CSSProperties
  sortable?: boolean
  label?: any
}

const LinkField = ({
  source, text, record = {}, elStyle, download,
}: ILinkFieldProps) => {
  const url = get(record, source)
  return (url ?
    <a href={url} style={elStyle} target="_blank" download={download}>{text || url}</a> :
    null
  )
}

export default LinkField
