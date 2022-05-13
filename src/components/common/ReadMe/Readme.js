import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Modal from '../Modal/Modal'
import styled from './index.module.scss'

const Readme = ({ content, onClick }) => {
  const modal = useRef()
  const remove = useRef()

  useEffect(() => {
    const modalCurrent = modal.current
    const removeCurrent = remove.current

    const ControlReadme = (e) => {
      e.stopPropagation()
    }

    modalCurrent.addEventListener('click', ControlReadme)
    removeCurrent.addEventListener('click', onClick)
  })

  return (
    <>
      <Modal>
        <div className={styled.modalDialog}>
          <div className="grid wide" ref={modal}>
            <div className="row">
              <div className={styled.openModal}>
                <div className={styled.headerReadME}>
                  <h1>README</h1>
                  <i className="fa-solid fa-xmark" ref={remove}></i>
                </div>
                <div className={styled.bodyReadME}>
                  <ReactMarkdown
                    children={content}
                    rehypePlugins={[rehypeRaw]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

Readme.propTypes = {
  content: PropTypes.string,
  onClick: PropTypes.func,
}

export default Readme
