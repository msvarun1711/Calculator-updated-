document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.querySelector('.inputbox h6');
    const buttons = document.querySelectorAll('.calc form input');
    let container = document.getElementById('cont');
    let calc = document.getElementById('calc');
    let icon = document.getElementById('icon');

    icon.addEventListener('click', function (){
        document.getElementById('cont').classList.toggle('dark-mode-container');
        calc.classList.toggle('dark-mode-calc');
        icon.classList.toggle('dark-mode-icon');
        document.getElementById('h1').classList.toggle('dark-mode-h1');


    });
    // Load saved input from local storage
    const savedInput = localStorage.getItem('calculatorInput');
    if (savedInput) {
        inputBox.textContent = savedInput;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.value;

            if (value === '=') {
                try {
                    // Evaluate the expression safely
                    const result = math.evaluate(inputBox.textContent);
                    inputBox.textContent = result;
                    localStorage.setItem('calculatorInput', result);
                } catch (error) {
                    inputBox.textContent = 'Error';
                    localStorage.setItem('calculatorInput', '');
                }
            } else if (value === 'C') {
                // Clear the input
                inputBox.textContent = '';
                localStorage.setItem('calculatorInput', '');
            } else if (value === 'De') {
                // Remove the last character from the input
                inputBox.textContent = inputBox.textContent.slice(0, -1);
                localStorage.setItem('calculatorInput', inputBox.textContent);
            } else {
                // Append number or operator to input
                if (inputBox.textContent === 'Error') {
                    inputBox.textContent = '';
                }
                inputBox.textContent += value;
                localStorage.setItem('calculatorInput', inputBox.textContent);
            }
        });
    });
});