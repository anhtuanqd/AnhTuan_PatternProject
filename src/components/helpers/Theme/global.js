import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

   body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    background-image: ${({ theme }) => theme.backgroundimage};
    position: relative;
    background-repeat: round!important;
    background-attachment: fixed;
    background-size: cover;
  }
  `
