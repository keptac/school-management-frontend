import axios from 'axios';
import qs from 'qs';

const deploymentUrl = 'http://localhost:3001';
// const deploymentUrl = 'https://esm-backend.herokuapp.com';

const token = sessionStorage.getItem('token');

async function postStudentMarks(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token
    },
  };
  try {
    const res = await axios.post('/studentMarks', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getStudentsPerClass(classId) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/students/class/${classId}`,
    headers: { 'x-access-token': token }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getStudentMarksPerClass(teacherId) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/studentMarks/class/${teacherId}`,
    headers: { 'x-access-token': token }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getTeacherClasses(teacherId) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/teacherClasses/teacher/${teacherId}`,
    headers: { 'x-access-token': token }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function checkTeacherSubmissionStatus(teacherId, subjectCode) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/reportsubmissions/teacherSubmissionStatus/${teacherId}/${subjectCode}`,
    headers: { 'x-access-token': token }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function addTeacherClass(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token
    },
  };
  try {
    const res = await axios.post('/teacherClasses', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function submitReports(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token
    },
  };
  try {
    const res = await axios.post('/reportsubmissions', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

const TeacherServices = {
  postStudentMarks,
  getStudentsPerClass,
  getStudentMarksPerClass,
  addTeacherClass,
  getTeacherClasses,
  checkTeacherSubmissionStatus,
  submitReports
};

export default TeacherServices;
