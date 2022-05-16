import { func, string } from 'prop-types'
import React from 'react'
import ToggleContainer from './Toggle.styled'

const Toggle = ({ theme, toggleTheme }) => {
  return <ToggleContainer onClick={toggleTheme}></ToggleContainer>
}

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle
