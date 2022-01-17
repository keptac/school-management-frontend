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
  // Input
} from '@material-ui/core';

import UploadService from '../../services/upload';

const IssueAssignment = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [vividlearn, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    const subjectData = JSON.parse(localStorage.getItem('subjectData'));
    const userId = sessionStorage.getItem('userId');
    const studentName = sessionStorage.getItem('name');
    const recordingAssignment = JSON.parse(localStorage.getItem('recordingAssignment'));

    const a = Math.floor(10000000 + Math.random() * 90000000);
    const assId = `SUB${String(a).substring(0, 5)}`;

    const data = {
      submissionId: assId,
      subjectName: subjectData.subjectName,
      subjectCode: subjectData.subjectCode,
      studentName,
      studentId: userId,
      assignmentId: recordingAssignment.assignmentId,
      submissionPath: '',
      graded: false,
      grade: '',
      mark: 0,
      vividlearn
    };

    UploadService.submitAssignment(data)
      .then((response) => {
        navigate('/student/subject', { replace: true });
        navigate('/student/class-work', { replace: true });
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
                      // value={vividlearn}
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
