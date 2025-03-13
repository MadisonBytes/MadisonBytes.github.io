const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const budgetilePath = path.join(__dirname, 'data/budget.json');
const goalsFilePath = path.join(__dirname, 'data/goals.json');
const summaryFilePath = path.join(__dirname, 'data/summary.json');
const transactionsFilePath = path.join(__dirname, 'data/transactions.json');

// Helper function to read data from file
const readData = (dataFilePath, callback) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data));
  });
};

// Helper function to write data to file
const writeData = (data, dataFilePath, callback) => {
  fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

// Get account summary
app.get('/api/account-summary', (req, res) => {
  readData(summaryFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(data.summary);
  });
});

// Get monthly budget
app.get('/api/monthly-budget', (req, res) => {
  readData(budgetilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(data.budget);
  });
});

// Get recent transactions
app.get('/api/recent-transactions', (req, res) => {
  readData(transactionsFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(data.transactions);
  });
});

// Get savings goals
app.get('/api/savings-goals', (req, res) => {
  readData(goalsFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(data.goals);
  });
});

// Save data
app.post('/api/data', (req, res) => {
  const newData = req.body;
  readData(transactionsFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    data.transactions.push(...newData.recentTransactions);
    writeData(data, transactionsFilePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data' });
      }
      res.json({ message: 'Data saved successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});