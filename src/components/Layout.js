import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../utils/theme'
import { CSSReset } from '@chasemccoy/kit'

const GlobalStyles = createGlobalStyle`
  body {
    font-size: 18px;
    font-family: ${p => p.theme.fonts.system};
  }
`

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout
