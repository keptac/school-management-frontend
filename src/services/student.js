import axios from 'axios';

const qs = require('qs');

const deploymentUrl = 'http://localhost:3001/api';
// const deploymentUrl = 'https://mtgs-backend.herokuapp.com/api';

const token = sessionStorage.getItem('token');

// Student Subjects
async function getStudentSubjects(classId) {
  // const token = await JSON.parse(localStorage.getItem('token'));
  const config = {
    baseURL: `${deploymentUrl}/esm/student-enrolment`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Authorization: `Bearer ${token}`,
      // 'Access-Control-Allow-Credentials': true,
    },
  };
  try {
    const res = await axios.get(`/student/${classId}`, config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getStudentSubmissions(subjectCode, studentId) {
  const config = {
    baseURL: `${deploymentUrl}/esm/submissions`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const res = await axios.get(`/student/${subjectCode}/${studentId}`, config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Submissions
async function submitAssignment(data) {
  const config = {
    baseURL: `${deploymentUrl}/student`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Credentials': true,
    },
  };
  try {
    const res = await axios.post('/new_submission', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function download(data) {
  try {
    const res = await axios.post(
      `${deploymentUrl}/upload/get`,
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        responseType: 'blob',
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function deleteResource(data) {
  try {
    const res = await axios.delete(
      `${deploymentUrl}/upload/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      }
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getStudentReport(studentId) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/esm/studentMarks/student/${studentId}`,
    headers: {}
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const StudentServices = {
  submitAssignment,
  getStudentSubjects,
  download,
  deleteResource,
  getStudentSubmissions,
  getStudentReport
};

export default StudentServices;
