import axios from 'axios';
import qs from 'qs';

import fileDownload from 'js-file-download';

const deploymentUrl = 'http://localhost:3001';
// const deploymentUrl = 'https://mtgs-backend.herokuapp.com';

const token = sessionStorage.getItem('token');

async function postClasses(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const res = await axios.post('/class', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function postNewStudent(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const res = await axios.post('/students', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getAllStudents() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/students`,
    headers: { }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function postSubject(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const res = await axios.post('/subjects', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getAllClasses() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/class`,
    headers: { }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getAllSubjects() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/subjects`,
    headers: { }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getAllTeachers() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/staffType/TEACHER`,
    headers: { }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function postAnnouncement(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const res = await axios.post('/announcements', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getAllNotices() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/announcements`,
    headers: {}
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getNoticesByTaget(target) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/announcements/${target}`,
    headers: {}
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getTeacherSubmissions() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/reportsubmissions`,
    headers: {}
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getStudentReport(studentId) {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/studentMarks/student/${studentId}`,
    headers: {}
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function getAllPayments() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/payments`,
    headers: { }
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

async function postNewPayment(data) {
  const config = {
    baseURL: `${deploymentUrl}/api/esm`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  try {
    const res = await axios.post('/payments', qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function downloadReports() {
  const config = {
    method: 'get',
    url: `${deploymentUrl}/api/esm/studentMarks/reportgeneration`,
    headers: { 'Content-Type': 'application/pdf', 'x-access-token': token }
  };

  return axios(config)
    .then((response) => {
      if (response.data.reportsGenerated > 0) {
        console.log(response.data.files);
        response.data.files.forEach((file) => {
          axios.get(`${deploymentUrl}/${file.reportPath}`, {
            responseType: 'blob',
          })
            .then((res) => {
              fileDownload(res.data, `${file.studentName}.pdf`);
            });
        });
        return { success: true, message: `${response.data.reportsGenerated} reports have generated and saved` };
      }
      return { success: false, message: 'Reports not found' };
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const AdminServices = {
  postClasses,
  getAllClasses,
  getAllSubjects,
  getAllTeachers,
  getAllNotices,
  postSubject,
  postNewStudent,
  getAllStudents,
  getAllPayments,
  postNewPayment,
  postAnnouncement,
  getTeacherSubmissions,
  getStudentReport,
  getNoticesByTaget,
  downloadReports
};

export default AdminServices;
