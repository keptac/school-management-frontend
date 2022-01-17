/* eslint-disable no-alert */
/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import React from 'react';
import moment from 'moment';
import {
  Box, Container, Grid,
  Card,
  Typography,
  CardContent,
  Divider,
  Button,
  Avatar,
  Tooltip,
  Fade,
  CardHeader
} from '@material-ui/core';

import {

  Video as VideoIcon
} from 'react-feather';

import { VideoCall } from '@material-ui/icons';
import StudentServices from 'src/services/student';

class VlirtualClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      virtualClasses: [],
    };
  }

  componentDidMount() {
    this.getScheduledVirtualClasses();
  }

  async getScheduledVirtualClasses() {
    const classid = sessionStorage.getItem('classId');

    StudentServices.getStudentSubjects(classid)
      .then((response) => {
        this.setState({ virtualClasses: response });
      });
  }

  render() {
    const {
      virtualClasses
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
          <Container>
            <Card>
              <CardHeader
                title="Scheduled Live Video Classes"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                  sx={{ marginTop: '0.1%' }}
                >
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xl={9}
                    xs={12}
                  >
                    <Grid
                      container
                      spacing={3}
                    >
                      {virtualClasses.map((resource) => (

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
                              elevation: '50px',
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
                                <Button
                                  onClick={() => {
                                    localStorage.setItem('recordingSubject', JSON.stringify(resource));
                                  }}
                                >
                                  <Tooltip title={`Enter into ${resource.subjectName} virtual class`} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
                                    <VideoCall color="inherit" />
                                  </Tooltip>

                                </Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>

                      ))}
                    </Grid>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Container>

        </Box>
      </>
    );
  }
}

export default VlirtualClass;
