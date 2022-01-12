/* eslint-disable import/no-mutable-exports */
import TeacherServices from 'src/services/teacher';

let students = [];

TeacherServices.getStudentsPerClass('CLC001')
  .then((response) => {
    students = response;
  });

export default students;
