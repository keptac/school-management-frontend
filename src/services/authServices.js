import axios from 'axios';

const qs = require('qs');

// const deploymentUrl = 'http://localhost:3001/api';
const deploymentUrl = 'https://mtgs-backend.herokuapp.com/api';

const config = {
  baseURL: `${deploymentUrl}/esm`,
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

async function studentAuthRegister(data) {
  try {
    const res = await axios.post('/student/authenticateReg', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Connection failed. Please check your connection.' };
  }
}
async function studentLogin(data) {
  try {
    const res = await axios.post('/student/authenticate', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function studentPasswordReset(data) {
  try {
    const res = await axios.post('/student/passwordReset', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Connection failed. Please check your connection.' };
  }
}

const AuthService = {
  register,
  login,
  studentLogin,
  studentAuthRegister,
  studentPasswordReset
};

export default AuthService;
