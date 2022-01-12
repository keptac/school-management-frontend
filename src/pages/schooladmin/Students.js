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
  TextField,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AdminServices from 'src/services/schoolAdmin';

class AddTeacherClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 0,
      classes: [],
      students: [],
      className: {},
      addStudentForm: false,
      name: null,
      surname: null,
      dob: null,
      phoneNumber: null,
      emailAddress: null,
      idNumber: null
    };
  }

  componentDidMount() {
    this.getAllClasses();
    this.getAllStudents();
  }

  // handleChange(event) {
  //   this.setState({event.target.name: event.target.value})
  // }

  handleChangeClass(selectedClass) {
    this.setState({ className: selectedClass });
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  handleChangeAdd() {
    this.setState({ addStudentForm: true });
  }

  handleSubmit() {
    const {
      name,
      surname,
      dob,
      phoneNumber,
      emailAddress,
      idNumber,
      className
    } = this.state;

    const a = Math.floor(100000 + Math.random() * 900000);
    const studentIdRef = `STUD${String(a).substring(0, 4)}`;

    const data = {
      name,
      surname,
      studentId: studentIdRef,
      classId: className.classId,
      dob,
      phoneNumber,
      emailAddress,
      idNumber
    };

    console.log(`Saving data ${data}`);

    AdminServices.postNewStudent(data)
      .then((response) => {
        console.log(response); // Add alert
        alert('Success. Refresh your the page to update students.');
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

  async getAllStudents() {
    AdminServices.getAllStudents()
      .then((response) => {
        this.setState({ students: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      students, limit, page, classes, className, addStudentForm, name, surname, dob, phoneNumber, emailAddress, idNumber
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
                lg={8}
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
                                Student ID
                              </TableCell>
                              <TableCell>
                                Student Name
                              </TableCell>
                              <TableCell>
                                DOB
                              </TableCell>
                              <TableCell>
                                Phone Number
                              </TableCell>
                              <TableCell>
                                Email
                              </TableCell>
                              <TableCell>
                                Class
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {students.slice(0, limit).map((student) => (
                              <TableRow
                                hover
                                key={student.studentId}
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
                                      {student.studentId}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${student.surname} ${student.name}` }
                                </TableCell>
                                <TableCell>
                                  {`${student.dob}`}
                                </TableCell>
                                <TableCell>
                                  {student.phoneNumber}
                                </TableCell>
                                <TableCell>
                                  {student.emailAddress}
                                </TableCell>
                                <TableCell>
                                  {student.classId}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>

                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={students.length}
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
                lg={4}
                md={12}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  {addStudentForm ? (
                    <form
                      autoComplete="off"
                      noValidate
                    >
                      <Card>
                        <CardHeader
                          title="Add New New Student"
                        />
                        <Divider />
                        <CardContent>
                          <Grid
                            container
                            spacing={1}
                          >
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                                fullWidth
                                label="Student Name"
                                name="name"
                                onChange={(e) => this.setState({ name: e.target.value })}
                                // onChange={e => this.handleChange(name, )}
                                required
                                value={name}
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
                                label="Surname"
                                name="surname"
                                onChange={(e) => this.setState({ surname: e.target.value })}
                                required
                                value={surname}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={4}
                              xs={12}
                            >
                              <TextField
                                fullWidth
                                label="ID Number"
                                name="idNumber"
                                onChange={(e) => this.setState({ idNumber: e.target.value })}
                                required
                                value={idNumber}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={8}
                              xs={12}
                            >
                              <TextField
                                fullWidth
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                onChange={(e) => this.setState({ dob: e.target.value })}
                                required
                                value={dob}
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
                                label="Phone Number"
                                name="phoneNumber"
                                type="number"
                                onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                required
                                value={phoneNumber}
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
                                label="Email Address"
                                name="emailAddress"
                                type="email"
                                onChange={(e) => this.setState({ emailAddress: e.target.value })}
                                required
                                value={emailAddress}
                                variant="outlined"
                              />
                            </Grid>

                            <Grid
                              item
                              md={5}
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
                            onClick={() => this.handleSubmit()}
                          >
                            Add Student
                          </Button>
                        </Box>
                      </Card>
                    </form>
                  )
                    : (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.handleChangeAdd()}
                      >
                        Add New Student
                      </Button>
                    )}
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
