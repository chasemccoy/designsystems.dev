const breakpoints = ['576px', '768px', '1000px', '1300px']

const namedBreakpoints = {
  tiny: breakpoints[0],
  small: breakpoints[1],
  medium: breakpoints[2],
  large: breakpoints[3],
}

const space = [0, 4, 8, 12, 16, 24, 32, 40]

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
}

const fonts = {
  system: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  mono: `Menlo, Monaco, OperatorMono-Book, Inconsolata, monospace`,
}

const theme = {
  breakpoints,
  namedBreakpoints,
  space,
  fontWeights,
  fonts,
}

export default theme
