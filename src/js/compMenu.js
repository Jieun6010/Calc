
export const fnGetTheme = () => {
  let themeStorage = window.localStorage.getItem('themeStorage')

  let theme
  let className

  if (themeStorage) {
    theme = JSON.parse(window.localStorage.getItem('themeStorage'))

    if (theme[1]) {
      className = 'gray'
    } else if (theme[2]) {
      className = 'pink'
    } else {
      className = 'skyblue'
    }
    document.body.setAttribute('class', className)

  } else {
    theme = { '1': true, '2': false, '3': false }
    window.localStorage.setItem('themeStorage', JSON.stringify(theme))

  }
  return theme
}