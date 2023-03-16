// Get references to the calculator result and buttons
const result = document.getElementById('result');
const buttons = document.getElementsByTagName('input');

// Add click event listeners to the buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    // Get the current button value
    const buttonValue = this.value;

    // Clear the calculator result if the "C" button is clicked
    if (buttonValue === 'C') {
      result.value = '';
    }
    // Perform the calculation if the "=" button is clicked
    else if (buttonValue === '=') {
      try {
        const calculationResult = eval(result.value);
        result.value = calculationResult;
      } catch (error) {
        result.value = 'Error';
      }
    }
    // Perform a math function if the button value is a function name
    else if (buttonValue === 'sin' || buttonValue === 'cos' || buttonValue === 'tan' || buttonValue === 'log') {
      const functionName = buttonValue;
      const argument = result.value;
      try {
        const calculationResult = Math[functionName](argument);
        result.value = calculationResult;
      } catch (error) {
        result.value = 'Error';
      }
    }
    // Add the button value to the calculator result
    else {
      result.value += buttonValue;
    }
  });
}