import axios from 'axios';

const FormData = require('form-data');
const fs = require('fs');

const data = new FormData();

async function postMaterial() {
  data.append('resourceName', 'Value');
  data.append('subjectCode', 'SUB124');
  data.append('topicName', 'Test');
  data.append('resourcePath', '');
  data.append('teacherId', 'TEC123');
  data.append('vividlearn', fs.createReadStream('/Users/kelvinchelenje/Desktop/DATA BASE TWO GREEN.xlsx'));
  data.append('type', 'resource');

  const config = {
    method: 'post',
    url: 'localhost:3001/api/esm/teacher/resources',
    headers: {
      ...data.getHeaders()
    },
    data
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

const UploadService = {
  postMaterial
};

export default UploadService;
