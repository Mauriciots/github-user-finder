import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const modalRootEl = document.getElementById('root-modal') as HTMLElement

const Modal: React.FC = () => {
  const el = document.createElement('div')

  useEffect(() => {
    modalRootEl.appendChild(el)
    return () => {
      modalRootEl.removeChild(el)
    }
  }, [])

  return ReactDOM.createPortal(
    <div
      role="dialog"
      style={{
        position: 'absolute',
        top: 'calc(50% - 100px)',
        left: 'calc(50% - 150px)',
        width: '300px',
        height: '200px',
        backgroundColor: '#FFFFFF',
        border: '4px solid blue',
        padding: '16px',
      }}
    >
      <p>This is a cool modal!</p>
    </div>,
    el,
  )
}

export default Modal
