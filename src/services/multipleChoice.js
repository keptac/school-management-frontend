import axios from 'axios';

const qs = require('qs');

const deploymentUrl = 'http://localhost:3001/api';
// const deploymentUrl = 'https://mtgs-backend.herokuapp.com/api';

const config = {
  baseURL: `${deploymentUrl}/esm`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

async function uploadPastMutlichoice(data) {
  try {
    const res = await axios.post('/staff', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Connection failed. Please check your connection.' };
  }
}

async function getTests(data) {
  const config2 = {
    method: 'get',
    url: `${deploymentUrl}/esm/multiplechoice/${data.subjectCode}/${data.testTitle}`,
    headers: { }
  };

  return axios(config2)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getTestsPerSubject(subectcode) {
  const config2 = {
    method: 'get',
    url: `${deploymentUrl}/esm/multiplechoice/${subectcode}`,
    headers: { }
  };

  return axios(config2)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const AuthService = {
  uploadPastMutlichoice,
  getTests,
  getTestsPerSubject
};

export default AuthService;
