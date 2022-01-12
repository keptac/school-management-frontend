import axios from 'axios';

const qs = require('qs');

// const apiUrl = 'http://localhost:3001/api';

// Submissions
async function submitAssignment(data) {
  const token = await JSON.parse(localStorage.getItem('token'));
  const config = {
    baseURL: 'https://mtgs-backend.herokuapp.com/api/student',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': 'https://pawacyberschool.net',
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

// Student Subjects
async function getStudentSubjects(studentId) {
  // const token = await JSON.parse(localStorage.getItem('token'));
  const config = {
    baseURL: 'https://mtgs-backend.herokuapp.com/api/esm/student-enrolment',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Authorization: `Bearer ${token}`,
      // 'Access-Control-Allow-Credentials': true,
    },
  };
  try {
    const res = await axios.get(`/student/${studentId}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function download(data) {
  const token = await JSON.parse(localStorage.getItem('token'));
  try {
    const res = await axios.post(
      'https://mtgs-backend.herokuapp.com/api/upload/get',
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
  const token = await JSON.parse(localStorage.getItem('token'));

  try {
    const res = await axios.delete(
      'https://mtgs-backend.herokuapp.com/api/upload/delete',
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

const StudentServices = {
  submitAssignment,
  getStudentSubjects,
  download,
  deleteResource,
};

export default StudentServices;
