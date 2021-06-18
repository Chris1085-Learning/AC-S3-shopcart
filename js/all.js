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

// toggle menu will add 'open' class that adding margin-bottom in header
const header = document.getElementById('header')
const menuToggle = document.getElementById('hamburger__toggle')
menuToggle.addEventListener('click', () => {
  header.classList.toggle('open')
})

const radioBtnStandard = document.getElementById('standardTransposrt')
const DHLBtnStandard = document.getElementById('DHLTransposrt')
const standardContainer = document.getElementsByClassName('form__transport')[0]
const DHLContainer = document.getElementsByClassName('form__transport')[1]

radioBtnStandard.addEventListener('click', () => {
  standardContainer.classList.add('border-focus')
  DHLContainer.classList.remove('border-focus')
})

DHLBtnStandard.addEventListener('click', () => {
  DHLContainer.classList.add('border-focus')
  standardContainer.classList.remove('border-focus')
})

const stepControl = document.getElementById('step-control')
const steps = stepControl.querySelectorAll('.step')
const form = document.getElementById('checkout-form')
const formParts = form.querySelectorAll('.part')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.btn-primary')
const prevBtn = btnControl.querySelector('.btn-secondary')
const nextBtnIcon = `<i class="ml-4 fal fa-long-arrow-right fa-lg"></i>`
const preBtnIcon = `<i class="ml-4 fal fa-long-arrow-right fa-lg"></i>`

let step = 0

function handleBtnControlClicked(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.btn-primary') && e.target.innerHTML.trim() === '下一步') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-secondary')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisabled()
}

function setBtnDisabled() {
  if (step === 0) {
    prevBtn.classList.add('d-none')
    prevBtn.classList.remove('d-flex')

    btnControl.classList.add('justify-content-end')
    btnControl.classList.remove('justify-content-between')
  } else {
    prevBtn.classList.add('d-flex')
    prevBtn.classList.remove('d-none')
    btnControl.classList.remove('justify-content-end')
    btnControl.classList.add('justify-content-between')
  }

  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步'
  }
}

btnControl.addEventListener('click', handleBtnControlClicked)
