import React, { useState } from 'react'
import FloatingButton from './FloatingButton'
import ChatWindow from './ChatWindow'

function Chatbot() {
  const [open, setOpen] = useState(false)
  // TODO: manage messages and input state here, pass as props

  return (
    <div>
      {!open && <FloatingButton onClick={() => setOpen(true)} />}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  )
}

export default Chatbot