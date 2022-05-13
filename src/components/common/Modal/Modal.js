import ReactDOM from 'react-dom'

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.querySelector('#portal'),
  )
}

export default Modal
