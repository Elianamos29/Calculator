const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')
const display = document.querySelector('.calculator_display')

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
         const key = e.target
         const action = key.dataset.action
         const keyContent = key.textContent
         const displayContent = display.textContent
         const previousKeyType = calculator.dataset.previousKeyType

         if (!action) {
            if (displayContent === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayContent + keyContent
            }
         }

         if (action === 'decimal') {
            display.textContent = displayContent + keyContent
         }

         if (action === 'add' ||
             action === 'subtract' ||
             action === 'multiply' ||
             action === 'divide') {
                key.classList.add('is-depressed')
                calculator.dataset.previousKeyType = 'operator'
                calculator.dataset.firstValue = displayContent
                calculator.dataset.operator = action

             }
         
         if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayContent
            
            let result = calculate(firstValue, operator, secondValue)
            display.textContent = result
         }

         Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    }
})

const calculate = (n1, op, n2) => {
    let result = ''

    if (op === 'add') {
        result = n1 + n2
    }

    else if (op === 'subtract') {
        result = n1 - n2
    }

    else if (op === 'multiply') {
        result = n1 * n2
    } else {
        result = n1 / n2
    }

    return result
}