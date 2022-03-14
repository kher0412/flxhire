import React from 'react'
import { getShortName } from 'services/form'
import { pickAndStore } from 'services/filestack'
import { FormValueInput, FormValueMeta } from 'types'
import { Button } from 'components/themed'
import { Receipt } from '@material-ui/icons'
import styles from './DocumentUploadField.module.css'

interface IDocumentUploadFieldProps {
  input: FormValueInput<string>
  meta: FormValueMeta
  onReceiptUploadOpen?: () => void
  onReceiptUploadClose?: () => void
}

class DocumentUploadField extends React.PureComponent<IDocumentUploadFieldProps> {
  openDialog = () => {
    const { input: { onChange }, onReceiptUploadOpen, onReceiptUploadClose } = this.props

    if (onReceiptUploadOpen) onReceiptUploadOpen()

    pickAndStore(
      {
        accept: ['image/*', 'application/pdf'],
        onClose: () => { if (onReceiptUploadClose) onReceiptUploadClose() },
      },
      (file) => {
        onChange(file.url)
        if (onReceiptUploadClose) onReceiptUploadClose()
      },
    )
  }

  render() {
    const { input: { value, name }, meta: { touched, error } } = this.props

    const shortName = getShortName(name)

    return (
      <div className={styles.container}>
        <Button onClick={this.openDialog} data-cy={`document-upload-button-${shortName}`}>
          <Receipt /> Upload Receipt
        </Button>

        {value && <a className={styles.filename} href={value} target="_blank" rel="noopener noreferrer">receipt</a>}
        {touched && error && <div className={styles.errorText} data-cy={`document-upload-error-${shortName}`}>{error}</div>}
      </div>
    )
  }
}

export default DocumentUploadField
