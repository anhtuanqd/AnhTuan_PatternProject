import { Route, Routes } from 'react-router-dom'
import ErrorPage from './components/common/ErrorPage/ErrorPage'
import RepoList from './components/pages/RepoList/RepoList'
import SearchUser from './components/pages/SearchUser/SearchUser'
import './styles/reset.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchUser />} />
        <Route path="/repo/:name" element={<RepoList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
