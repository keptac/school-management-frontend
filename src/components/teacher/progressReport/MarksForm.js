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

const MarksForm = ({ studentName }, props) => {
  const alert = useAlert();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    mark: 0,
    comment: '',
  });

  const handleChange = (event) => {
    if (event.target.name === 'mark') {
      let comment = '';
      if (event.target.value < 30) {
        comment = 'Below average. Put more effort and work harder next time.';
      } else if (event.target.value >= 30 && event.target.value < 40) {
        comment = 'Put more effort and aim higher';
      } else if (event.target.value >= 40 && event.target.value < 50) {
        comment = 'Work hard for better results';
      } else if (event.target.value >= 50 && event.target.value < 60) {
        comment = 'You can do better with more focus and hard work';
      } else if (event.target.value >= 60 && event.target.value < 70) {
        comment = 'Good work, keep on pushing!';
      } else if (event.target.value >= 70 && event.target.value < 80) {
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
    const studentRecord = JSON.parse(localStorage.getItem('studentRecord'));
    const subjectRecord = JSON.parse(localStorage.getItem('recordingSubject'));
    let grade = '';
    if (subjectRecord.level === 'GCSE') {
      if (values.mark < 20) {
        grade = 'U';
      } else if (values.mark >= 20 && values.mark < 30) {
        grade = 'G';
      } else if (values.mark >= 30 && values.mark < 40) {
        grade = 'F';
      } else if (values.mark >= 40 && values.mark < 50) {
        grade = 'E';
      } else if (values.mark >= 50 && values.mark < 60) {
        grade = 'D';
      } else if (values.mark >= 60 && values.mark < 70) {
        grade = 'C';
      } else if (values.mark >= 70 && values.mark < 80) {
        grade = 'B';
      } else if (values.mark >= 80 && values.mark < 90) {
        grade = 'A';
      } else {
        grade = 'A*';
      }
    } else if (subjectRecord.level === 'A Level') {
      if (values.mark < 30) {
        grade = 'F';
      } else if (values.mark >= 30 && values.mark < 40) {
        grade = 'O';
      } else if (values.mark >= 40 && values.mark < 50) {
        grade = 'E';
      } else if (values.mark >= 50 && values.mark < 60) {
        grade = 'D';
      } else if (values.mark >= 60 && values.mark < 70) {
        grade = 'C';
      } else if (values.mark >= 70 && values.mark < 80) {
        grade = 'B';
      } else if (values.mark >= 80 && values.mark < 90) {
        grade = 'A';
      } else {
        grade = 'A*';
      }
    } else if (subjectRecord.level === 'AS Level') {
      if (values.mark < 35) {
        grade = 'F';
      } else if (values.mark >= 30 && values.mark < 45) {
        grade = 'O';
      } else if (values.mark >= 40 && values.mark < 55) {
        grade = 'E';
      } else if (values.mark >= 50 && values.mark < 65) {
        grade = 'D';
      } else if (values.mark >= 60 && values.mark < 75) {
        grade = 'C';
      } else if (values.mark >= 70 && values.mark < 85) {
        grade = 'B';
      } else if (values.mark >= 80 && values.mark < 95) {
        grade = 'A';
      } else {
        grade = 'A*';
      }
    }

    const data = {
      firstName: studentRecord.name,
      surname: studentRecord.surname,
      studentId: studentRecord.studentId,
      subjectCode: subjectRecord.subjectCode,
      subject: subjectRecord.subjectName,
      classId: studentRecord.classId,
      mark: values.mark,
      grade,
      comment: values.comment
    };
    // Pass to api
    TeacherServices.postStudentMarks(data)
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
            localStorage.removeItem(studentRecord);
            navigate('/teacher/report/', { replace: true });
          }
        });
      }).catch((error) => {
        alert.info('Snap, an error occured. Please try again later.', { position: positions.MIDDLE }, {
          timeout: 2000,
          onOpen: () => {
            console.log(error);
          },
          onClose: () => {
            navigate('/teacher/report/', { replace: true });
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

MarksForm.propTypes = {
  studentName: PropTypes.any.isRequired
};

export default MarksForm;
