import axios from 'axios';

const qs = require('qs');

const apiUrl = 'http://localhost:3001/api';
// const apiUrl = 'https://westminster-backend.herokuapp.com/api';

const config = {
  baseURL: `${apiUrl}/westminster`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

async function register(data) {
  try {
    const res = await axios.post('/staff', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Connection failed. Please check your connection.' };
  }
}

async function login(data) {
  try {
    const res = await axios.post('/staff/authenticate', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

const AuthService = {
  register,
  login
};

export default AuthService;
