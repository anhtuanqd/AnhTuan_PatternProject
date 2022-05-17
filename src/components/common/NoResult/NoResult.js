import React from 'react'
import style from './NoResult.module.scss'

const NoResult = () => {
  return (
    <>
      <div className={style.no_card}>
        <div className={style.no_card_item}>
          <h2>Oops !!!</h2>
          <p>Run out of results </p>
        </div>
      </div>
    </>
  )
}

export default NoResult
