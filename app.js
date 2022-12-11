const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
         const key = e.target
         const action = key.dataset.action

         if(!action){
            alert("Number key!")
         }

        else if(action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'){
                alert('Operator!')
        }

        else if(action === 'decimal'){
            alert('Decimal key!')
        }

        else if(action === 'clear'){
            alert('Clear key!')
        }

        else if(action === 'calculate'){
            alert('Equal key!')
        }
    }
})