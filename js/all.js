// dark mode
// target the switch element
const darkModeToggle = document.getElementById('dark__mode__toggle')
// toggle handler
const darkModeToggleHandler = (event) => {
  document.documentElement.classList.toggle('lightTheme')
  document.documentElement.classList.toggle('darkTheme')
}
// bind the event
darkModeToggle.addEventListener('change', darkModeToggleHandler)
