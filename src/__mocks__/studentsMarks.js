/* eslint-disable import/no-mutable-exports */
import TeacherServices from 'src/services/teacher';

export default TeacherServices.getStudentMarksPerClass('CLC001') // Get all subjects for student
  .then((response) => response);

// export default marks;

// export default [
//   {
//     name: 'Kelvin',
//     surname: 'Chelenje',
//     studentId: 'STUD001',
//     classId: 'CLC120',
//     dob: '03/01/2015',
//     phoneNumber: '0785302628',
//     emailAddress: 'keptac.dev@gmail.com'
//   }
// ];

// export default [
//   {
//     studentId: 'STUD123',
//     subject: 'SUB120',
//     classId: 'CLC120',
//     mark: 95,
//     createdAt: 1555016400000,
//     firstName: 'Kelvin',
//     surname: 'Chelenje',
//     grade: 'A',
//     comment: 'the quick brown fox jumped',
//     avatarUrl: '/static/images/avatars/avatar_3.png',
//   }
// ];
