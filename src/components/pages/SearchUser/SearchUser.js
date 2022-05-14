import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import Loading from '../../common/Loading/Loading'
import LogoGit from '../../common/LogoGit/LogoGit'
import { Debounce } from '../../helpers/Debounce/Debouce'
import { getUserList } from '../../services/GetDataUser'
import ListUser from '../ListUser/ListUser'
import style from './searchUser.module.scss'

const SearchUser = () => {
  const [userName, setUsername] = useState(() => {
    const storageName = JSON.parse(localStorage.getItem('Name'))
    return storageName || ''
  })
  const [listUsers, setListUsers] = useState(() => {
    const storageListUser = JSON.parse(localStorage.getItem('ListUser'))
    return storageListUser
  })
  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState()
  const [loading, setLoading] = useState(false)
  const debounceChange = Debounce(userName, 1000)

  const getData = async (_username) => {
    setLoading(true)
    let res = await getUserList(_username, page)
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

  useEffect(() => {
    if (userName) getData(debounceChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceChange, page])

  useEffect(() => {
    setPage(1)
  }, [userName])

  useEffect(() => {
    const jsonListUsers = JSON.stringify(listUsers)
    localStorage.setItem('ListUser', jsonListUsers)

    const jsonName = JSON.stringify(userName)
    localStorage.setItem('Name', jsonName)

    window.addEventListener('beforeunload', function () {
      localStorage.removeItem('ListUser')
      localStorage.removeItem('Name')
    })
  })

  useEffect(() => {
    const handleScrollList = () => {
      let body = document.querySelector('body').clientHeight
      let scrollHeight = window.scrollY + window.innerHeight
      if (Math.ceil(scrollHeight) >= body) {
        setPage((prev) => prev + 1)
      }
    }
    const _debounceHandleScroll = debounce(handleScrollList, 1000)
    window.addEventListener('scroll', _debounceHandleScroll)

    return () => {
      window.removeEventListener('scroll', _debounceHandleScroll)
    }
  }, [])

  return (
    <>
      <LogoGit />
      <div className={style.background}>
        <div className={style.search}>
          <div className={style['search-box']}>
            <input
              type="text"
              className={style['search-box']}
              placeholder="Search for username..."
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value)
                setListUsers([])
              }}
            />
            <button
              type="reset"
              onClick={() => {
                setUsername('')
                setListUsers([])
                localStorage.removeItem('ListUser')
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
      </div>
      {loading && <Loading />}
    </>
  )
}

export default SearchUser
