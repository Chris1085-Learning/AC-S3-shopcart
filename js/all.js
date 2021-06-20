// target the switch element
const darkModeToggle = document.getElementById('darkModeToggle')
/* radio button */
const radioBtnStandard = document.getElementById('standardTransposrt')
const DHLBtnStandard = document.getElementById('DHLTransposrt')
/* Step Btn*/
const stepControl = document.getElementById('step-control')
const steps = stepControl.querySelectorAll('.step')
const form = document.getElementById('checkout-form')
const formParts = form.querySelectorAll('.part')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.btn-primary')
const prevBtn = btnControl.querySelector('.btn-secondary')
let step = 0
/* Count Price Section */
const minusButton = document.querySelectorAll('.minus')
const plusButton = document.querySelectorAll('.plus')
const itemsPrice = document.querySelectorAll('.item__price')
const totalCost = document.getElementById('total-cost')
const shippingPrice = document.getElementById('shipping-price')
const productPrice = {
  破壞補丁修身牛仔褲: 3999,
  刷色直筒牛仔褲: 1299
}

/* dark mode section */
// toggle handler
const darkModeToggleHandler = (event) => {
  document.documentElement.classList.toggle('lightTheme')
  document.documentElement.classList.toggle('darkTheme')
  darkModeToggle.childNodes[0].classList.toggle('fa-sun')
  darkModeToggle.childNodes[0].classList.toggle('fa-moon')
}
// bind the event
darkModeToggle.addEventListener('click', darkModeToggleHandler)

/* header section */
// toggle menu will add 'open' class that adding margin-bottom in header
const header = document.getElementById('header')
const menuToggle = document.getElementById('hamburger__toggle')
menuToggle.addEventListener('click', () => {
  header.classList.toggle('open')
})

/* radio button */
radioBtnStandard.addEventListener('click', () => {
  shippingPrice.textContent = '免運'
  calcTotalPrice()

  const theme = document.documentElement.classList[0]
  if (theme === 'darkTheme') {
    radioBtnStandard.parentNode.parentNode.classList.add('border-white')
    DHLBtnStandard.parentNode.parentNode.classList.remove('border-white')
  }
})

DHLBtnStandard.addEventListener('click', () => {
  shippingPrice.textContent = '$' + 500
  calcTotalPrice()

  const theme = document.documentElement.classList[0]
  if (theme === 'darkTheme') {
    DHLBtnStandard.parentNode.parentNode.classList.add('border-white')
    radioBtnStandard.parentNode.parentNode.classList.remove('border-white')
  }
})

/* Step handler function section*/
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

    document.querySelectorAll('.connectLine')[1].classList.remove('connect-active')
  } else {
    prevBtn.classList.add('d-flex')
    prevBtn.classList.remove('d-none')
    btnControl.classList.remove('justify-content-end')
    btnControl.classList.add('justify-content-between')

    document.querySelectorAll('.connectLine')[1].classList.add('connect-active')
    document.querySelectorAll('.connectLine')[0].classList.add('connect-active')
  }

  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步'
  }
}

btnControl.addEventListener('click', handleBtnControlClicked)

minusButton.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const countLabel = btn.nextElementSibling
    let count = parseInt(countLabel.innerHTML)
    const product = btn.parentNode.previousElementSibling.innerHTML
    const productSumLabel = btn.parentNode.parentNode.nextElementSibling

    // 計算price並轉為有comma的數字字串
    price = count > 0 ? (productPrice[product] * (count - 1)).toLocaleString() : 0
    // 重新計算itam count, price
    countLabel.textContent = count > 0 ? --count : 0
    productSumLabel.textContent = '$' + price

    // 重新計算total price
    calcTotalPrice()
  })
})

plusButton.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const countLabel = btn.previousElementSibling
    let count = parseInt(countLabel.innerHTML)
    const product = btn.parentNode.previousElementSibling.innerHTML
    const productSumLabel = btn.parentNode.parentNode.nextElementSibling

    // 計算price並轉為有comma的數字字串
    price = (productPrice[product] * (count + 1)).toLocaleString()
    // 重新計算itam count, price
    countLabel.textContent = ++count
    productSumLabel.textContent = '$' + price

    // 重新計算total price
    calcTotalPrice()
  })
})

function calcTotalPrice() {
  // 計算運費
  const shippingPriceCalc = shippingPrice.innerHTML === '$500' ? 500 : 0

  let totalPrice = 0
  itemsPrice.forEach((el) => {
    // 從數字字串轉為數字
    const price = parseInt(el.innerHTML.split('$')[1].replace(/,/g, ''))
    totalPrice += price
  })

  totalPrice = '$' + parseInt(totalPrice + shippingPriceCalc).toLocaleString()
  totalCost.textContent = totalPrice
}
