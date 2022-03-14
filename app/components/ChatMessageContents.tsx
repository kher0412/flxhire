import { memo } from 'react'

// eslint-disable-next-line max-len
const urlRegexp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm

const urlReplacer = (match: string) => {
  const result = `<a href="${match}">${match}</a>`
  // console.log('REPLACE LINK', match, result)
  return result
}

const messageToHTML = (message: string) => {
  if (typeof message?.replaceAll !== 'function') return message

  let result = message.replaceAll('\n', '<br/>')
  result = result.replaceAll(urlRegexp, urlReplacer)
  // console.log('Message to HTML', message, result)
  return result
}

const ChatMessageContents = memo(({ message }: { message: string }) => (
  // eslint-disable-next-line react/no-danger
  <span dangerouslySetInnerHTML={{ __html: messageToHTML(message) }} />
))

export default ChatMessageContents
