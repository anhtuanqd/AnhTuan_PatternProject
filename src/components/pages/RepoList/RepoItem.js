import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useState } from 'react'
import '../../../styles/responsive.css'
import Readme from '../../common/ReadMe/Readme'
import { getReadme } from '../../services/GetDataUser'
import style from './RepoList.module.scss'

const RepoItem = (props) => {
  const { id, data, nameUser } = props
  const { name, open_issues, forks, watchers, language } = data

  const [openReadMe, setOpenReadMe] = useState(false)
  const [contentReadMe, setContentReadMe] = useState('')

  const handleOpenReadMe = async () => {
    setOpenReadMe(true)
    await getReadme(nameUser, data.name)
      .then((res) => {
        setContentReadMe(decodeURIComponent(escape(window.atob(res.content))))
      })
      .catch((err) => {
        setContentReadMe("We can't find README file from this repo!!!")
      })
  }

  const OnClick = () => {
    setOpenReadMe(!openReadMe)
  }

  const body = document.querySelector('body')
  if (openReadMe) {
    body.style.overflow = 'hidden'
  } else {
    body.style.overflow = 'auto'
  }

  return (
    <>
      <div
        onClick={OnClick}
        className={clsx('col l-4 m-6 c-12', style.container_repo)}
      >
        {openReadMe && <Readme content={contentReadMe} onClick={OnClick} />}
        <div onClick={handleOpenReadMe} className={style.tilesWrap_item}>
          <h2>{id + 1}</h2>
          <h3>{name}</h3>
          <p>Open Issuses: {open_issues}</p>
          <p>Forks: {forks}</p>
          <p>Watchers: {watchers}</p>
          <p>Language: {language || 'No Language'}</p>
          <button>ReadMe</button>
        </div>
      </div>
    </>
  )
}

RepoItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  data: PropTypes.object,
}

export default RepoItem
