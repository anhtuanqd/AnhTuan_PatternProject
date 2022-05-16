import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../src/components/helpers/Theme/global'
import { darkTheme, lightTheme } from '../src/components/helpers/Theme/theme'
import ErrorPage from './components/common/ErrorPage/ErrorPage'
import Toggle from './components/helpers/Theme/toggle'
import RepoList from './components/pages/RepoList/RepoList'
import SearchUser from './components/pages/SearchUser/SearchUser'
import './styles/reset.css'

function App() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <div className="App">
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<SearchUser />} />
          <Route path="/repo/:name" element={<RepoList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
