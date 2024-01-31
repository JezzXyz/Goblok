module.exports = {
  config: {
    name: "math",
    version: "1.0",
    author: "Aji Satria",
    role: 0,
    category: "math"
  },

  onStart: async function ({ api, event }) {
    const input = event.body;
    const data = input.match(/(-?\d+(?:\.\d+)?)\s*([\+\-\*\/\%])\s*(-?\d+(?:\.\d+)?)/);

    if (!data || data.length !== 4) {
      return api.sendMessage("Invalid command. Please use it like this: !calculate [number1][operator][number2]", event.threadID);
    }

    const number1 = parseFloat(data[1]);
    const operator = data[2];
    const number2 = parseFloat(data[3]);

    if (isNaN(number1) || isNaN(number2)) {
      return api.sendMessage("Invalid numbers provided. Please use valid numbers.", event.threadID);
    }

    let result;
    switch (operator) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        if (data[3].endsWith('%')) {
          const percent = parseFloat(data[3].replace('%', ''));
          result = number1 - (number1 * percent / 100);
        } else {
          result = number1 - number2;
        }
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        if (number2 === 0) {
          return api.sendMessage('Error: Cannot divide by zero', event.threadID);
        }
        result = number1 / number2;
        break;
      case '%':
        result = (number1 * number2) / 100; // Menghitung persentase
        break;
      default:
        return api.sendMessage('Invalid operator. Supported operators: +, -, *, /, %', event.threadID);
    }

    api.sendMessage(`Result: ${result}`, event.threadID);
  }
};