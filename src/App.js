import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../src/components/helpers/Theme/global'
import { darkTheme, lightTheme } from '../src/components/helpers/Theme/theme'
import { useDarkMode } from '../src/components/helpers/Theme/useDarkMode'
import ErrorPage from './components/common/ErrorPage/ErrorPage'
import Toggle from './components/helpers/Theme/toggle'
import RepoList from './components/pages/RepoList/RepoList'
import SearchUser from './components/pages/SearchUser/SearchUser'
import React from 'react'
import './styles/reset.css'

const App = () => {
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
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
