import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
      },
});

const clinicalTrialsApi = axios.create({
  baseURL: 'https://clinicaltrials.gov/api/query/',
  headers: {
      'Content-Type': 'application/json',
    },
});


export {api, clinicalTrialsApi};