/* eslint-disable no-alert */
/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';
import {
  Box, Container, Grid,
  Card,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar,
  Tooltip,
  Fade
} from '@material-ui/core';

import {

  Video as VideoIcon
} from 'react-feather';

import TeacherServices from 'src/services/teacher';
import { VideoCall } from '@material-ui/icons';

class TeacherVirtualClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      className: {},
      topicName: null,
      meetingDate: null
    };
  }

  componentDidMount() {
    this.getTeacherClasses();
  }

  handleChangeClass(selectedClass) {
    this.setState({ className: selectedClass });
  }

  handleChangetopic(event) {
    this.setState({ topicName: event.target.value });
  }

  handleChangeDate(event) {
    this.setState({ meetingDate: event.target.value });
  }

  handleScheduleVirtualClass() {
    const {
      className,
      meetingDate
    } = this.state;

    const a = Math.floor(10000000 + Math.random() * 90000000);
    const meetingId = `VCR${String(a).substring(0, 5)}`;

    const userId = sessionStorage.getItem('userId');
    const teacherName = sessionStorage.getItem('name');
    const subject = JSON.parse(localStorage.getItem('recordingSubject'));
    Cookies.set('meetingId', meetingId);

    const data = {
      classId: className.classId,
      className: className.className,
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      teacherId: userId,
      meetingDate,
      teacherName,
      meetingId,
      meetingLink: ''
    };

    TeacherServices.saveMeeting(data)
      .then((response) => {
        window.location.reload(false);
        console.log(response); // Add alert
      }).catch((error) => {
        console.log(error);
      });
  }

  async getTeacherClasses() {
    const userId = sessionStorage.getItem('userId');
    TeacherServices.getMeetings(userId)
      .then((response) => {
        this.setState({ meetings: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      meetings, className, topicName, meetingDate
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Classes | Vivid Learn</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Grid
              container
              spacing={3}
              sx={{ marginTop: '0.1%' }}
            >
              <Grid
                item
                lg={7}
                md={12}
                xl={9}
                xs={12}
              >
                <Grid
                  container
                  spacing={3}
                >
                  {meetings.map((resource) => (

                    <Grid
                      item
                      lg={3}
                      md={12}
                      xs={12}
                    >
                      <Card
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          borderRadius: '10px',
                          elevation: '10px'
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              pb: 1
                            }}
                          >
                            <Avatar>
                              <VideoIcon />
                            </Avatar>
                          </Box>
                          <Typography
                            align="center"
                            color="#997b2f"
                            gutterBottom
                            variant="h4"
                            fontSize={15}
                          >
                            {`${resource.subjectName} - ${resource.className}`}
                          </Typography>
                          <Typography
                            align="center"
                            color="textPrimary"
                            variant="body1"
                          >
                            {moment(resource.dueDate).format('DD/MM/YYYY')}
                          </Typography>
                        </CardContent>
                        <Box sx={{ flexGrow: 1 }} />
                        <Divider />
                        <Grid
                          container
                          spacing={2}
                          sx={{ justifyContent: 'space-between' }}
                        >
                          <Grid
                            item
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <Typography
                              color="secondaey"
                              display="inline"
                              sx={{ pl: 1 }}
                              variant="body2"
                            >
                              { ' '}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <a href="https://vividstream.netlify.app" _blank>
                              <Button
                                onClick={() => {
                                  localStorage.setItem('recordingSubject', JSON.stringify(resource));
                                }}
                              >
                                <Tooltip title={`Start ${resource.subjectName} virtual class`} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
                                  <VideoCall color="inherit" />
                                </Tooltip>

                              </Button>
                            </a>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>

                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                lg={5}
                md={12}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  <form
                    autoComplete="off"
                    noValidate
                  >
                    <Card>
                      <CardHeader
                        title="Schedule Video Class"
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
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Class - Subject</InputLabel>
                              <Select
                                value={className}
                                label="Subject"
                                onChange={() => this.handleChangeClass}
                                required
                                variant="outlined"
                              >
                                {meetings.map((classe) => (
                                  <MenuItem onClick={() => this.handleChangeClass(classe)} value={classe}>{`${classe.className} - ${classe.subjectName}` }</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
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
                              onChange={() => this.handleChangetopic}
                              required
                              value={topicName}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          spacing={3}
                          sx={{ pt: 3 }}
                        >
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              type="date"
                              name="meetingDate"
                              onChange={() => this.handleChangeDate}
                              required
                              value={meetingDate}
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
                          onClick={() => this.handleScheduleVirtualClass()}
                        >
                          Schedule Meeting
                        </Button>
                      </Box>
                    </Card>
                  </form>

                </Box>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </>
    );
  }
}

export default TeacherVirtualClass;
