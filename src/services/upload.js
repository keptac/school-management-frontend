import axios from 'axios';

const FormData = require('form-data');
// const fs = require('fs');

const data = new FormData();
const { create } = require('ipfs-http-client');

const client = create('https://ipfs.infura.io:5001/api/v0');
// const deploymentUrl = 'http://localhost:3001';
const deploymentUrl = 'https://mtgs-backend.herokuapp.com';

async function postMaterialIpfs(body) {
  try {
    const url = await client.add(body.vividlearn);
    const uploadedImageUrl = `https://ipfs.infura.io/ipfs/${url.path}`;

    const metadata = body;

    const metadataRes = await client.add(JSON.stringify(metadata));
    const tokenURI = `https://ipfs.infura.io/ipfs/${metadataRes.path}`;

    console.log(body);
    console.log(tokenURI);
    console.log(uploadedImageUrl);

    data.append('resourceName', body.resourceName);
    data.append('subjectCode', body.subjectCode);
    data.append('topicName', body.topicName);
    data.append('resourcePath', uploadedImageUrl);
    data.append('teacherId', body.teacherId);
    data.append('vividlearn', body.vividlearn);
    data.append('type', body.type);
    data.append('resourceId', body.resourceId);

    const config = {
      method: 'post',
      url: `${deploymentUrl}/api/esm/teacher/resources/upload-ipfs`,
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
  } catch (error) {
    console.log('error uploading to IPFS ', error);
    return { message: error };
  }
}

async function postMaterial(body) {
  data.append('resourceName', body.resourceName);
  data.append('subjectCode', body.subjectCode);
  data.append('topicName', body.topicName);
  data.append('resourcePath', '');
  data.append('teacherId', body.teacherId);
  data.append('vividlearn', body.vividlearn);
  data.append('type', body.type);
  data.append('resourceId', body.resourceId);

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
  data.append('assignmentId', body.assignmentId);
  data.append('status', body.status);
  data.append('assignmentDescription', body.description);

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

async function submitAssignment(body) {
  data.append('submissionId', body.submissionId);
  data.append('subjectName', body.subjectName);
  data.append('subjectCode', body.subjectCode);
  data.append('studentName', body.studentName);
  data.append('studentId', body.studentId);
  data.append('submissionPath', '');
  data.append('assignmentId', body.assignmentId);
  data.append('graded', body.graded);
  data.append('mark', body.mark);
  data.append('grade', body.grade);
  data.append('vividlearn', body.vividlearn);

  const config = {
    method: 'post',
    url: `${deploymentUrl}/api/esm/submissions/subject`,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
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
  issueAssignment,
  submitAssignment,
  postMaterialIpfs
};

export default UploadService;
