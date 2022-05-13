import React from 'react'
import LoadingImage from './loading.gif'
import style from './Loading.module.scss'

const Loading = () => {
  return (
    <>
      <div className={style.loadingSpinner}>
        <img alt="loading" src={LoadingImage} />
      </div>
    </>
  )
}

export default Loading
