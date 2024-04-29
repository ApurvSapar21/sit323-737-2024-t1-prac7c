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

    // Check if num1 and num2 are valid numbers
    if (isNaN(parseFloat(num1)) || isNaN(parseFloat(num2))) {
        return res.status(400).send('Invalid input. Please provide valid numbers.');
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
        // Additional operations
        case 'power':
            result = Math.pow(parseFloat(num1), parseFloat(num2));
            break;
        case 'modulus':
            result = parseFloat(num1) % parseFloat(num2);
            break;
        default:
            return res.status(400).send('Invalid operation.');
    }

    res.send(`Result: ${num1} ${operation} ${num2} = ${result}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
