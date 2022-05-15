import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import Loading from '../../common/Loading/Loading'
import LogoGit from '../../common/LogoGit/LogoGit'
import { Debounce } from '../../helpers/Debounce/Debouce'
import { getUserList } from '../../services/GetDataUser'
import ListUser from '../ListUser/ListUser'
import style from './searchUser.module.scss'

const SearchUser = () => {
  const [userName, setUsername] = useState('')
  const [listUsers, setListUsers] = useState(() => {
    const storageListUser = JSON.parse(localStorage.getItem('ListUser'))
    return storageListUser?.list || []
  })
  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState()
  const [loading, setLoading] = useState(false)
  const storageName = JSON.parse(localStorage.getItem('ListUser'))
  const debounceChange = Debounce(userName || storageName?.name, 1000)

  const getData = async (_username) => {
    setLoading(true)
    let res = await getUserList(_username || storageName?.name, page)
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
    if (debounceChange) getData(debounceChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceChange, page])

  useEffect(() => {
    const jsonListUsers = JSON.stringify({
      name: storageName?.name || userName,
      list: listUsers,
      page: page,
    })
    localStorage.setItem('ListUser', jsonListUsers)

    window.addEventListener('beforeunload', function () {
      localStorage.removeItem('ListUser')
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
              // className={style['search-box']}
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
