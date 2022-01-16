import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAlert, positions } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

import TeacherServices from 'src/services/teacher';

const AssignmentMarksForm = ({ studentName }, props) => {
  const alert = useAlert();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    mark: 0,
    comment: '',
  });

  const handleChange = (event) => {
    const recordingAssignment = JSON.parse(localStorage.getItem('recordingAssignment'));
    if (event.target.name === 'mark') {
      let comment = '';
      const percentage = (event.target.value / recordingAssignment.totalMarks) * 100;
      if (percentage < 30) {
        comment = 'Below average. Put more effort and work harder next time.';
      } else if (percentage >= 30 && percentage < 40) {
        comment = 'Put more effort and aim higher';
      } else if (percentage >= 40 && percentage < 50) {
        comment = 'Work hard for better results';
      } else if (percentage >= 50 && percentage < 60) {
        comment = 'You can do better with more focus and hard work';
      } else if (percentage >= 60 && percentage < 70) {
        comment = 'Good work, keep on pushing!';
      } else if (percentage >= 70 && percentage < 80) {
        comment = 'Good results. There is more for you to achieve.';
      } else {
        comment = 'Excellent work. Keep it up with consistency!';
      }
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        comment
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = () => {
    const recordingAssignment = JSON.parse(localStorage.getItem('recordingAssignment'));
    const submissionRecord = JSON.parse(localStorage.getItem('submissionRecord'));
    const subjectRecord = JSON.parse(localStorage.getItem('recordingSubject'));
    const percentage = (values.mark / recordingAssignment.totalMarks) * 100;

    let grade = '';
    if (subjectRecord.level === 'GCSE') {
      if (percentage < 20) {
        grade = 'U';
      } else if (percentage >= 20 && percentage < 30) {
        grade = 'G';
      } else if (percentage >= 30 && percentage < 40) {
        grade = 'F';
      } else if (percentage >= 40 && percentage < 50) {
        grade = 'E';
      } else if (percentage >= 50 && percentage < 60) {
        grade = 'D';
      } else if (percentage >= 60 && percentage < 70) {
        grade = 'C';
      } else if (percentage >= 70 && percentage < 80) {
        grade = 'B';
      } else if (percentage >= 80 && percentage < 90) {
        grade = 'A';
      } else {
        grade = 'A*';
      }
    } else if (subjectRecord.level === 'A Level') {
      if (percentage < 30) {
        grade = 'F';
      } else if (percentage >= 30 && percentage < 40) {
        grade = 'O';
      } else if (percentage >= 40 && percentage < 50) {
        grade = 'E';
      } else if (percentage >= 50 && percentage < 60) {
        grade = 'D';
      } else if (percentage >= 60 && percentage < 70) {
        grade = 'C';
      } else if (percentage >= 70 && percentage < 80) {
        grade = 'B';
      } else if (percentage >= 80 && percentage < 90) {
        grade = 'A';
      } else {
        grade = 'A*';
      }
    } else if (subjectRecord.level === 'AS Level') {
      if (percentage < 35) {
        grade = 'F';
      } else if (percentage >= 30 && percentage < 45) {
        grade = 'O';
      } else if (percentage >= 40 && percentage < 55) {
        grade = 'E';
      } else if (percentage >= 50 && percentage < 65) {
        grade = 'D';
      } else if (percentage >= 60 && percentage < 75) {
        grade = 'C';
      } else if (percentage >= 70 && percentage < 85) {
        grade = 'B';
      } else if (percentage >= 80 && percentage < 95) {
        grade = 'A';
      } else {
        grade = 'A*';
      }
    }

    const data = {
      submissionId: submissionRecord.submissionCode,
      mark: values.mark,
      grade,
      comment: values.comment
      // firstName: submissionRecord.firstName,
      // surname: submissionRecord.surname,
      // studentId: submissionRecord.studentId,
      // subjectCode: subjectRecord.subjectCode,
      // subject: subjectRecord.subjectName,
      // classId: submissionRecord.classId,
      // totalMarks: recordingAssignment.totalMarks,
    };

    // Pass to api
    TeacherServices.gradeAssignment(data)
      .then((response) => {
        console.log(response);
        alert.info(response.message, { position: positions.MIDDLE }, {
          timeout: 2000,
          onOpen: () => {
            console.log(response);
            setValues({
              ...values,
              mark: 0,
              comment: ''
            });
          },
          onClose: () => {
            localStorage.removeItem(submissionRecord);
            navigate('/teacher/student-submissions', { replace: true });
          }
        });
      }).catch((error) => {
        alert.info('Snap, an error occured. Please try again later.', { position: positions.MIDDLE }, {
          timeout: 2000,
          onOpen: () => {
            console.log(error);
          },
          onClose: () => {
            navigate('/teacher/student-submissions', { replace: true });
          }
        });
      });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          title={`Upload assessment marks for ${studentName}`}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Subject Mark"
                name="mark"
                onChange={handleChange}
                type="number"
                value={values.mark}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Teacher's Comment"
                name="comment"
                onChange={handleChange}
                required
                value={values.comment}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Save Marks
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AssignmentMarksForm.propTypes = {
  studentName: PropTypes.any.isRequired
};

export default AssignmentMarksForm;
