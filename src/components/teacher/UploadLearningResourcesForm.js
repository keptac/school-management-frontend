/* eslint-disable prefer-const */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert, positions } from 'react-alert';
import { BallTriangle } from 'react-loader-spinner';

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

const UploadLearningResourcesForm = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [vividlearn, setSelectedFile] = useState(null);
  const [values, setValues] = useState({
    resourceName: null,
    topicName: null,
    loadingLoader: true
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    setValues({ loadingLoader: true });
    const subjectData = JSON.parse(localStorage.getItem('recordingSubject'));
    const a = Math.floor(1000000 + Math.random() * 9000000);
    const resourceId = `RSC${String(a).substring(0, 5)}`;
    const data = {
      resourceName: values.resourceName,
      subjectCode: subjectData.subjectCode,
      topicName: values.topicName,
      resourcePath: '',
      teacherId: subjectData.teacherId,
      type: 'RESOURCE',
      vividlearn,
      resourceId
    };

    // UploadService.postMaterial(data)
    try {
      UploadService.postMaterialIpfs(data)
        .then((response) => {
          setValues({ loadingLoader: false });
          navigate('/teacher/subject-student-records', { replace: true });
          navigate('/teacher/teaching-resources', { replace: true });
          alert.info(response.message, { position: positions.MIDDLE }, {
            timeout: 2000,
          });
        }).catch((error) => {
          console.log(error);
          setValues({ loadingLoader: false });
          alert.error('Snap, an error occured. Please try again later.', { position: positions.MIDDLE }, {
            timeout: 2000,
          });
          navigate('/teacher/subject-student-records', { replace: true });
          navigate('/teacher/teaching-resources', { replace: true });
        });
    } catch (error) {
      console.log(error);
      setValues({ loadingLoader: false });
      navigate('/teacher/subject-student-records', { replace: true });
      navigate('/teacher/teaching-resources', { replace: true });
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ marginTop: '0.1%' }}
    >
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
                title="Upload Learning Material"
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
                      name="resourceName"
                      onChange={handleChange}
                      required
                      value={values.resourceName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Topic Name"
                      name="topicName"
                      onChange={handleChange}
                      required
                      value={values.topicName}
                      variant="outlined"
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
                  Upload Resource
                </Button>
              </Box>
            </Card>
          </form>

        </Box>
      </Grid>
      {
      values.loadingLoader ? (
        <Grid
          item
          lg={4}
          md={12}
          xs={12}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <BallTriangle
              height={70}
              width={70}
              color="#D4AF37"
              ariaLabel="loading"
            />
          </Box>

        </Grid>
      ) : <></>
    }

    </Grid>
  );
};

export default UploadLearningResourcesForm;
