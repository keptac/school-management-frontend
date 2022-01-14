/* eslint-disable prefer-const */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert, positions } from 'react-alert';

import {
  Box, Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
  // Input
} from '@material-ui/core';

import UploadService from '../../services/upload';

const IssueAssignment = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [vividlearn, setSelectedFile] = useState(null);
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState({
    assignmentTitle: null,
    totalMarks: null,
    dueDate: null
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    const subjectData = JSON.parse(localStorage.getItem('recordingSubject'));
    const data = {
      assignmentTitle: values.assignmentTitle,
      subjectCode: subjectData.subjectCode,
      assignmentPath: '',
      vividlearn,
      category,
      dueDate: values.dueDate,
      totalMarks: values.totalMarks,
    };

    UploadService.issueAssignment(data)
      .then((response) => {
        navigate('/teacher/subject-student-records', { replace: true });
        navigate('/teacher/student-work', { replace: true });
        alert.info(response.message, { position: positions.MIDDLE }, {
          timeout: 2000,
        });
      }).catch((error) => {
        console.log(error);
        alert.error('Snap, an error occured. Please try again later.', { position: positions.MIDDLE }, {
          timeout: 2000,
        });
      });
  };

  return (
    <Grid
      item
      lg={8}
      md={12}
      xs={12}
    >
      <Box>
        <form
          autoComplete="off"
          noValidate
        >
          <Card>
            <CardHeader
              title="Upload New Student Work"
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
                    label="Resource Name"
                    name="assignmentTitle"
                    onChange={handleChange}
                    required
                    value={values.assignmentTitle}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={3}
                  xs={12}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      value={category}
                      label="Subject"
                      required
                      variant="outlined"
                    >
                      <MenuItem onClick={() => setCategory('ASSIGNMENT')} value="ASSIGNMENT">Assignment</MenuItem>
                      <MenuItem onClick={() => setCategory('TEST')} value="TEST">Test</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={3}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Total Marks"
                    name="totalMarks"
                    onChange={handleChange}
                    required
                    value={values.topicName}
                    variant="outlined"
                    type="number"
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={5}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Due Date"
                      name="dueDate"
                      onChange={handleChange}
                      required
                      value={values.dueDate}
                      variant="outlined"
                      type="date"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      type="file"
                      fullWidth
                      name="vividlearn"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      required
                      value={values.vividlearn}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>
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
                Issue Assignment
              </Button>
            </Box>
          </Card>
        </form>

      </Box>
    </Grid>
  );
};

export default IssueAssignment;
