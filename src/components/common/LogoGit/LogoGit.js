import style from './LogoGit.module.scss'
import React from 'react'

const LogoGit = () => {
  return (
    <>
      <div className={style.logo}>
        <i className="fa-brands fa-github"></i>
        <label>Git Search</label>
      </div>
    </>
  )
}
export default LogoGit
