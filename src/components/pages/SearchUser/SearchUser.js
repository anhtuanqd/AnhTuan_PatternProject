/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import Loading from '../../common/Loading/Loading'
import LogoGit from '../../common/LogoGit/LogoGit'
import { Debounce } from '../../helpers/Debounce/Debouce'
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
  const debounceChange = Debounce(userName || storageList?.name, 1000)

  useEffect(() => {
    const getData = async (_username) => {
      setLoading(true)
      let res = await getUserList(_username || storageList?.name, page)
      setLoading(false)
      setTotalData(res.total_count)
      let listDataUsers = res?.items?.map((item) => {
        return {
          login: item?.login,
          avatar: item?.avatar_url,
          id: item?.id,
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
      page: page,
      total: totalData,
    })
    localStorage.setItem('List', jsonListUsers)
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('List')
    })

    const handleScrollList = () => {
      let body = document.querySelector('body').clientHeight
      let scrollHeight = window.scrollY + window.innerHeight
      if (Math.ceil(scrollHeight) >= body) {
        setPage((prev) => prev + 1)
      }
    }
    const _debounceHandleScroll = debounce(handleScrollList, 1000)

    if (totalData !== storageList?.list.length) {
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
        {totalData === storageList?.list.length &&
        storageList?.list.length > 0 ? (
          <div className={style.no_card}>
            <div className={style.no_card_item}>
              <h2>Oops !!!</h2>
              <p>Run out of results </p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {loading && <Loading />}
    </>
  )
}

export default SearchUser
