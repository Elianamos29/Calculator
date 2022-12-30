const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')
const display = document.querySelector('.calculator_display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayContent = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if (displayContent === '0' ||
             previousKeyType === 'operator' ||
             previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayContent + keyContent
            }

            calculator.dataset.previousKeyType = 'number'
        }

        if (action === 'decimal') {
            if (!displayContent.includes('.')) {

                display.textContent = displayContent + keyContent
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayContent

            if (
                firstValue && 
                operator && 
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
                ) {
                calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayContent
            }

            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayContent
            calculator.dataset.operator = action

        }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.previousKeyType = ''
                calculator.dataset.operator = ''
            } else {

                key.textContent = 'AC'
            }

            display.textContent = '0'
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action = clear')
            clearButton.textContent = 'CE'
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayContent

            if (firstValue) {

                if (previousKeyType === 'calculate') {
                    firstValue = displayContent
                    secondValue = calculator.dataset.modValue
                }

                let result = calculate(firstValue, operator, secondValue)
                display.textContent = result
            }

            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    }
})

const calculate = (n1, op, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)

    if (op === 'add') return firstNum + secondNum
    if (op === 'subtract') return firstNum - secondNum
    if (op === 'multiply') return firstNum * secondNum
    if (op === 'divide') return firstNum / secondNum
}