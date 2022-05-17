import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import Loading from '../../common/Loading/Loading'
import LogoGit from '../../common/LogoGit/LogoGit'
import NoResult from '../../common/NoResult/NoResult'
import { debounced } from '../../helpers/Debounce/debounce'
import { getUserList } from '../../services/GetDataUser'
import ListUser from '../ListUser/ListUser'
import style from './searchUser.module.scss'

const SearchUser = () => {
  const storageList = JSON.parse(localStorage.getItem('List'))
  const [userName, setUsername] = useState('')
  const [listUsers, setListUsers] = useState(() => {
    return storageList?.list || []
  })
  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState(() => {
    return storageList?.total
  })
  const [loading, setLoading] = useState(false)
  const debounceChange = debounced(userName || storageList?.name, 1000)

  useEffect(() => {
    const getData = async (_username) => {
      setLoading(true)
      const res = await getUserList(_username || storageList?.name, page)
      setLoading(false)
      setTotalData(res.total_count)
      const listDataUsers = res?.items?.map((item) => {
        return {
          login: item?.login,
          avatar: item?.avatar_url,
          id: item?.id
        }
      })
      if (page === 1) {
        setListUsers(listDataUsers)
      } else {
        setListUsers([...listUsers, ...listDataUsers])
      }
    }
    if (debounceChange) getData(debounceChange)
  }, [debounceChange, page])

  useEffect(() => {
    const jsonListUsers = JSON.stringify({
      name: userName || storageList?.name,
      list: listUsers,
      page,
      total: totalData
    })
    localStorage.setItem('List', jsonListUsers)
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('List')
    })

    const handleScrollList = () => {
      const body = document.querySelector('body').clientHeight
      const scrollHeight = window.scrollY + window.innerHeight
      if (Math.ceil(scrollHeight) >= body) {
        setPage((prev) => prev + 1)
      }
    }
    const _debounceHandleScroll = debounce(handleScrollList, 1000)

    if (totalData !== listUsers.length) {
      window.addEventListener('scroll', _debounceHandleScroll)
    }
    return () => {
      window.removeEventListener('scroll', _debounceHandleScroll)
    }
  })

  return (
    <>
      <LogoGit />
      <div className={style.background}>
        <div className={style.search}>
          <div className={style['search-box']}>
            <input
              type="text"
              placeholder="Search for username..."
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value)
                setListUsers([])
                setPage(1)
              }}
            />
            <button
              type="reset"
              onClick={() => {
                setUsername('')
                setListUsers([])
                localStorage.removeItem('List')
              }}
            ></button>
          </div>
        </div>
        {userName && (
          <p className={style.total_result}>
            There are {totalData} search results
          </p>
        )}
        <ListUser total={totalData} data={listUsers} />
        {totalData === listUsers.length && listUsers.length > 0 ? (
          <NoResult />
        ) : (
          ''
        )}
      </div>
      {loading && <Loading />}
    </>
  )
}

export default SearchUser
