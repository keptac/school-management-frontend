import axios from 'axios';

const qs = require('qs');

async function postMaterial(data) {
  const config = {
    baseURL: 'https://esm-backend.herokuapp.com/api/teacher',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const res = await axios.post('/new_material', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const UploadService = {
  postMaterial
};

export default UploadService;
