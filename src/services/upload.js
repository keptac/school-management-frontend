import axios from 'axios';

const FormData = require('form-data');
// const fs = require('fs');

const data = new FormData();

const deploymentUrl = 'http://localhost:3001';
// const deploymentUrl = 'https://mtgs-backend.herokuapp.com';

async function postMaterial(body) {
  data.append('resourceName', body.resourceName);
  data.append('subjectCode', body.subjectCode);
  data.append('topicName', body.topicName);
  data.append('resourcePath', '');
  data.append('teacherId', body.teacherId);
  // data.append('vividlearn', fs.createReadStream(body.vividlearn));
  data.append('vividlearn', body.vividlearn);

  data.append('type', body.type);

  const config = {
    method: 'post',
    url: `${deploymentUrl}/api/esm/teacher/resources`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return { message: error };
    });
}

async function issueAssignment(body) {
  data.append('assignmentTitle', body.assignmentTitle);
  data.append('subjectCode', body.subjectCode);
  data.append('assignmentPath', '');
  data.append('vividlearn', body.vividlearn);
  data.append('category', body.category);
  data.append('dueDate', body.dueDate);
  data.append('totalMarks', body.totalMarks);

  const config = {
    method: 'post',
    url: `${deploymentUrl}/api/esm/teacher/assignments`,

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return { message: error };
    });
}

const UploadService = {
  postMaterial,
  issueAssignment
};

export default UploadService;
