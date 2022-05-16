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
  const [totalData, setTotalData] = useState()
  const [loading, setLoading] = useState(false)
  const debounceChange = Debounce(userName || storageList?.name, 1000)

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

  useEffect(() => {
    if (debounceChange) getData(debounceChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceChange, page])

  useEffect(() => {
    const jsonListUsers = JSON.stringify({
      name: userName || storageList?.name,
      list: listUsers,
      page: page,
    })
    localStorage.setItem('List', jsonListUsers)

    window.addEventListener('beforeunload', function () {
      localStorage.removeItem('List')
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
        {totalData === storageList?.list.length && totalData > 0 ? (
          <div className={style.no_card}>
            <div className={style.no_card_item}>
              <h2>Oops !!!</h2>
              <p>We Couldn't Find The You Were Looking For . Try Again </p>
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
