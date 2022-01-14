import axios from 'axios';
import qs from 'qs';

// const deploymentUrl = 'http://localhost:3001';
const deploymentUrl = 'https://mtgs-backend.herokuapp.com';

async function postStudentMarks(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
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
    headers: { }
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
    headers: { }
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
    headers: { }
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
    headers: { }
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

async function getResourcesBySubjectCode(subjectCode) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/teacher/resources/subject/${subjectCode}`,
    headers: { }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const TeacherServices = {
  postStudentMarks,
  getStudentsPerClass,
  getStudentMarksPerClass,
  addTeacherClass,
  getTeacherClasses,
  checkTeacherSubmissionStatus,
  submitReports,
  getResourcesBySubjectCode
};

export default TeacherServices;
