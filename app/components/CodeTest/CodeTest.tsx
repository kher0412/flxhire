import { memo, CSSProperties } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './CodeTest.module.css'

interface ICodeTestProps {
  title: string
  description: string
  footNote?: string
  style?: CSSProperties
}

const CodeTest = memo(({ title, description, footNote, style }: ICodeTestProps) => {
  if (!title && !description) {
    return null
  }

  return (
    <div className={styles.container} style={style}>
      <div>
        {title || 'Untitled code test'}
      </div>

      <div className={styles.description}>
        <ReactMarkdown source={description || 'No description.'} />
      </div>

      {footNote && (
      <div className={styles.footnote}>
        {footNote}
      </div>
      )}
    </div>
  )
})

export default CodeTest
