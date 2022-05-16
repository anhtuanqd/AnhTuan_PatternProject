import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../../styles/responsive.css'
import Loading from '../../common/Loading/Loading'
import { getUserDetail } from '../../services/GetDataUser'
import RepoItem from './RepoItem'
import style from './RepoList.module.scss'

const RepoList = () => {
  const { name } = useParams()
  const [repoList, setRepoList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getDataRepository = async () => {
      setLoading(true)
      const res = await getUserDetail(name)
      setLoading(false)
      setRepoList(res)
    }
    getDataRepository()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={style.container}>
        <div className={style.repo_header}>
          <Link to="/">« Back</Link>
          <h1>Repo List</h1>
          <i>Total repositories: {repoList.length} </i>
        </div>
        <div className="grid wide">
          <div className={clsx('row', style.tilesWrap)}>
            {repoList &&
              repoList.map((item, index) => (
                <RepoItem key={index} id={index} data={item} nameUser={name} />
              ))}
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  )
}

export default RepoList
