/* eslint-disable no-alert */
/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box, Container, Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import TeacherServices from 'src/services/teacher';
import AdminServices from 'src/services/schoolAdmin';

class AddTeacherClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 0,
      classes: [],
      subjects: [],
      teacherClasses: [],
      className: {},
      subject: {}
    };
  }

  componentDidMount() {
    this.getAllClasses();
    this.getAllSubjects();
    this.getTeacherClasses();
  }

  handleChangeSubject(selectedSubject) {
    this.setState({ subject: selectedSubject });
  }

  handleChangeClass(selectedClass) {
    this.setState({ className: selectedClass });
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  handleAddTeacherClass() {
    const {
      subject, className, teacherClasses
    } = this.state;
    const userId = sessionStorage.getItem('userId');
    const teacherName = sessionStorage.getItem('name');

    const data = {
      classId: className.classId,
      className: className.className,
      subjectCode: subject.subjectCode,
      level: subject.level,
      subjectName: subject.subjectName,
      teacherId: userId,
      teacherName
    };

    teacherClasses.push(data);

    TeacherServices.addTeacherClass(data)
      .then((response) => {
        console.log(response); // Add alert
        alert('Success. Refresh your the page to load classes.');
      }).catch((error) => {
        console.log(error);
      });
  }

  async getAllClasses() {
    AdminServices.getAllClasses()
      .then((response) => {
        this.setState({ classes: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async getAllSubjects() {
    AdminServices.getAllSubjects()
      .then((response) => {
        this.setState({ subjects: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async getTeacherClasses() {
    const userId = sessionStorage.getItem('userId');
    TeacherServices.getTeacherClasses(userId)
      .then((response) => {
        this.setState({ teacherClasses: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      teacherClasses, limit, page, classes, subjects, subject, className
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
                <Box sx={{ pt: 3 }}>
                  <Card>
                    <PerfectScrollbar>
                      <Box sx={{ minWidth: 600 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Class ID
                              </TableCell>
                              <TableCell>
                                Class Name
                              </TableCell>
                              <TableCell>
                                Subject
                              </TableCell>
                              <TableCell>
                                Level
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {teacherClasses.slice(0, limit).map((classe) => (
                              <TableRow
                                hover
                                key={classe.classId}
                              >
                                <TableCell>
                                  <Box
                                    sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                    }}
                                  >
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {`${classe.classId}` }
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${classe.className}`}
                                </TableCell>
                                <TableCell>
                                  {`${classe.subjectName}`}
                                </TableCell>
                                <TableCell>
                                  {classe.level}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={teacherClasses.length}
                      onPageChange={() => this.handlePageChange}
                      onRowsPerPageChange={() => this.handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25]}
                    />
                  </Card>

                </Box>
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
                        title="Add New Class"
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
                              <InputLabel id="demo-simple-select-label">Class</InputLabel>
                              <Select
                                value={className}
                                label="Subject"
                                // onChange={() => this.handleChangeClass}
                                required
                                variant="outlined"
                              >
                                {classes.map((classe) => (
                                  <MenuItem onClick={() => this.handleChangeClass(classe)} value={classe}>{classe.className}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                              <Select
                                value={subject}
                                label="Subject"
                                required
                                variant="outlined"
                              >
                                {subjects.map((sub) => (
                                  <MenuItem onClick={() => this.handleChangeSubject(sub)} value={sub}>{`${sub.subjectName} (${sub.level})`}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
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
                          onClick={() => this.handleAddTeacherClass()}
                        >
                          Save Classes
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

export default AddTeacherClass;
