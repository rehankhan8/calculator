class Calculator {
    constructor(prevText, currentText) {
        this.prevText = prevText
        this.currentText = currentText
        this.clear()
    }

    clear() {
        this.prevOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand =this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()    
    }

    chooseOperation(operation) {
        if(this.operation === '') return
        if(this.operation !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let compution
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                compution = prev + current
                break
            case '-':
                compution = prev - current
                break
            case '*':
                compution = prev * current
                break
            case '/':
                compution = prev / current
                break
            default: return
        }
        this.currentOperand = compution
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimal = stringNumber.split('.')[1]
        let integerDisplay
        
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimal != null) {
            return `${integerDisplay}.${decimal}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentText.innerText =this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.prevText.innerText =`${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevText.innerText = ''
        }
    }
}




const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevText = document.querySelector('[data-prev-operand]')
const currentText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(prevText, currentText)

numberButton.forEach(button => {
    button.addEventListener('click' ,() =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click' ,() =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click' ,() =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',() =>{
    calculator.delete()
    calculator.updateDisplay()
})