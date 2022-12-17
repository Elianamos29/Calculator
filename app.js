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
            display.textContent = '0'
            key.textContent = 'CE'
            calculator.dataset.previousKeyType = 'clear'
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
    let result = ''

    if (op === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    }

    else if (op === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    }

    else if (op === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}