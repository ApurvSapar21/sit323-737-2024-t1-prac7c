const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission for arithmetic operations
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    if (!num1 || !num2 || !operation) {
        return res.status(400).send('Invalid input. Please provide all required fields.');
    }

    let result;
    switch (operation) {
        case 'add':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case 'subtract':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case 'multiply':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case 'divide':
            if (parseFloat(num2) === 0) {
                return res.status(400).send('Cannot divide by zero.');
            }
            result = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            return res.status(400).send('Invalid operation.');
    }

    res.send(`Result: ${num1} ${operation} ${num2} = ${result}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
