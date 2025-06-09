import React from 'react'
import Messages from './Messages'
import InputArea from './InputArea'

function ChatWindow({ onClose }) {
  // TODO: Accept and pass messages, input handlers as props
  return (
    <div>
      <button onClick={onClose}>×</button>
      <Messages />
      <InputArea />
    </div>
  )
}

export default ChatWindow