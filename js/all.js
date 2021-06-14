// dark mode
// target the switch element
const darkModeToggle = document.getElementById('darkModeToggle')
// toggle handler
const darkModeToggleHandler = (event) => {
  document.documentElement.classList.toggle('lightTheme')
  document.documentElement.classList.toggle('darkTheme')
  darkModeToggle.childNodes[0].classList.toggle('fa-sun')
  darkModeToggle.childNodes[0].classList.toggle('fa-moon')
}
// bind the event
darkModeToggle.addEventListener('click', darkModeToggleHandler)
