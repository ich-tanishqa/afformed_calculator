// solution to question 1

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 9876;

let windowSize = 10;
let numberWindow = [];

// Helper function to fetch numbers from the test server
const fetchNumbers = async (numberId) => {
  try {
    if(numberId === 'p'){
        const token = await axios.post('http://20.244.56.144/test/auth',
            {
                "companyName": "goMart",
                "clientID": "6d85c193-7db6-4a6a-b59c-e9538b7c6f30",
                "clientSecret": "iFqkneTIzOODdYuM",
                "ownerName": "Tanishqa",
                "ownerEmail": "bansaltanishqa@gmail.com",
                "rollNo": "10519011721"
            }
        )
        const access_token = token.data.access_token;
        const response = await axios.get(`http://20.244.56.144/test/primes`,
            { 
                timeout: 500, 
                headers: {
                    'content-type' : 'application/json',
                    'Authorization' : `Bearer ${access_token}`
                } 
            });
        return response.data.numbers
    }else if(numberId === 'f'){
        const token = await axios.post('http://20.244.56.144/test/auth',
            {
                "companyName": "goMart",
                "clientID": "6d85c193-7db6-4a6a-b59c-e9538b7c6f30",
                "clientSecret": "iFqkneTIzOODdYuM",
                "ownerName": "Tanishqa",
                "ownerEmail": "bansaltanishqa@gmail.com",
                "rollNo": "10519011721"
            }
        )
        const access_token = token.data.access_token;
        const response = await axios.get(`http://20.244.56.144/test/fibo`,
            { 
                timeout: 500, 
                headers: {
                    'content-type' : 'application/json',
                    'Authorization' : `Bearer ${access_token}`
                } 
            });
        return response.data.numbers
    }else if(numberId === 'e'){
        const token = await axios.post('http://20.244.56.144/test/auth',
            {
                "companyName": "goMart",
                "clientID": "6d85c193-7db6-4a6a-b59c-e9538b7c6f30",
                "clientSecret": "iFqkneTIzOODdYuM",
                "ownerName": "Tanishqa",
                "ownerEmail": "bansaltanishqa@gmail.com",
                "rollNo": "10519011721"
            }
        )
        const access_token = token.data.access_token;
        const response = await axios.get(`http://20.244.56.144/test/even`,
            { 
                timeout: 500, 
                headers: {
                    'content-type' : 'application/json',
                    'Authorization' : `Bearer ${access_token}`
                } 
            });
        return response.data.numbers
    }else if(numberId === 'r'){
        const token = await axios.post('http://20.244.56.144/test/auth',
            {
                "companyName": "goMart",
                "clientID": "6d85c193-7db6-4a6a-b59c-e9538b7c6f30",
                "clientSecret": "iFqkneTIzOODdYuM",
                "ownerName": "Tanishqa",
                "ownerEmail": "bansaltanishqa@gmail.com",
                "rollNo": "10519011721"
            }
        )
        const access_token = token.data.access_token;
        const response = await axios.get(`http://20.244.56.144/test/rand`,
            { 
                timeout: 500, 
                headers: {
                    'content-type' : 'application/json',
                    'Authorization' : `Bearer ${access_token}`
                } 
            });
        return response.data.numbers
    }
    
  } catch (error) {
    console.log('Error fetching numbers:', error.message);
    return [];
  }
};

// Helper function to calculate average
const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  let sum = 0;
  for(let i=0; i<numbers.length; i++){
    sum += numbers[i];
  }
  return sum / numbers.length;
};

app.get('/numbers/:numberId', async (req, res) => {
  const { numberId } = req.params;
  const validIds = ['p', 'f', 'e', 'r'];

  if (!validIds.includes(numberId)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const Numbers = await fetchNumbers(numberId);

  Numbers.forEach(num => {
    if (!numberWindow.includes(num)) {
      if (numberWindow.length >= windowSize) {
        numberWindow.shift(); 
      }
      numberWindow.push(num); 
    }
  });

  const average = calculateAverage(numberWindow);

  res.json({
    previousWindow: numberWindow.slice(0, -Numbers.length),
    currentWindow: numberWindow,
    Numbers,
    average,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});