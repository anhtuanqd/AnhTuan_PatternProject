import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../../styles/responsive.css'
import style from './ListUser.module.scss'

export const ListUser = (props) => {
  const { total, data } = props

  return (
    <>
      <div className="grid wide">
        <div className="row">
          {total > 0 || data?.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className={clsx('col l-4 m-6 c-12', style.card_item)}
              >
                <Link to={`/repo/${item.login}`} className={style.card}>
                  <img
                    src={item.avatar}
                    alt={item.login}
                    className={style.card__image}
                  />
                  <div className={style.card__overlay}>
                    <div className={style.card__header}>
                      <svg
                        className={style.card__arc}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path />
                      </svg>
                      <img
                        className={style.card__thumb}
                        src={item.avatar}
                        alt="card__image-thumbnail"
                      />
                      <div className={style['card__header-text']}>
                        <h3 className={style.card__title}>{item.login}</h3>
                        <span className={style.card__status}>{item.id}</span>
                      </div>
                    </div>
                    <p className={style.card__description}></p>
                  </div>
                </Link>
              </div>
            ))
          ) : total === 0 ? (
            <div className={style.no_card}>
              <div className={style.no_card_item}>
                <h2>Oops !!!</h2>
                <p>
                  We Couldn&apos;t Find The You Were Looking For . Try Again{' '}
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

ListUser.propTypes = {
  total: PropTypes.number,
  data: PropTypes.array
}

export default ListUser
