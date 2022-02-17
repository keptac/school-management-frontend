import { useState } from 'react';
import PropTypes from 'prop-types';
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

// const autoGeneratedComments = [
//   {
//     coment: 'Alabama',
//     mark: 20,
//   }
// ];

const MarksForm = ({ studentName }, props) => {
  const [values, setValues] = useState({
    mark: null,
    comment: '',
  });

  const handleChange = (event) => {
    if (event.target.name === 'mark' && event.target.value < 20) {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        comment: 'put nmore'
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSubmit = () => {
    const studentRecord = JSON.parse(localStorage.getItem('studentRecord'));
    console.log(studentRecord);
    console.log(studentRecord.studentId);
    // console.log(studentRecord.fullName);
    console.log(values.mark);
    console.log(values.comment);

    // Pass to api
    localStorage.removeItem(studentRecord);
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