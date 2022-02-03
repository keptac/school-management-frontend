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

import Moment from 'moment';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AdminServices from 'src/services/schoolAdmin';
import AuthService from 'src/services/authServices';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};
class AddStudents extends React.Component {
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
      idNumber: null,
      classId: null,
      modalIsOpen: false,
      closeModal: false
    };
  }

  componentDidMount() {
    this.getAllClasses();
    this.getAllStudents();
  }

  handleChangeClass(selectedClass) {
    this.setState({ className: selectedClass, classId: selectedClass.classId });
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  handlePageChange(event, newPage) {
    let s = new XMLSerializer();
    let str = s.serializeToString(event.target);
    if (str.includes('KeyboardArrowRightIcon')) {
      this.setState({ page: newPage + 1 });
    } else if (newPage !== 0) {
      this.setState({ page: newPage - 1 });
    }
  }

  handleChangeAdd() {
    this.setState({ addStudentForm: true });
  }

  handleUpdate() {
    const {
      name,
      surname,
      dob,
      phoneNumber,
      emailAddress,
      idNumber,
      classId
    } = this.state;

    let date1 = Moment(dob);
    let date2 = Moment(Date.now());

    let differenceInMs = date2.diff(date1);
    let duration = Moment.duration(differenceInMs);
    let differenceInYears = duration.asYears();
    if (differenceInYears > 4.5) {
      const data = {
        name,
        surname,
        classId,
        dob,
        phoneNumber,
        emailAddress,
        idNumber,
      };

      AdminServices.updateStudentRecord(data)
        .then((response) => {
          alert(response.message);
        }).catch((error) => {
          console.log(error);
        });
    } else {
      alert('Ineligible age. Pupils should be older than 4 years');
    }
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

    let date1 = Moment(dob);
    let date2 = Moment(Date.now());

    let differenceInMs = date2.diff(date1);
    let duration = Moment.duration(differenceInMs);
    let differenceInYears = duration.asYears();
    if (differenceInYears > 4.5) {
      const a = Math.floor(100000 + Math.random() * 900000);
      const studentIdRef = `STUD${String(a).substring(0, 5)}`;

      const data = {
        name,
        surname,
        studentId: studentIdRef,
        classId: className.classId,
        dob,
        phoneNumber,
        emailAddress,
        idNumber,
        guardianName: '',
        relationshipToGuardian: '',
        gender: '',
        address: ''
      };

      const dataReg = {
        studentId: studentIdRef,
        firstName: name,
        surname,
        classId: className.classId,
        email: emailAddress,
        password: 'pass@123'
      };

      AdminServices.postNewStudent(data)
        .then((response) => {
          if (response.success) {
            AuthService.studentAuthRegister(dataReg)
              .then((res) => {
                console.log(res);
                window.location.reload(false);
              });
          } else {
            alert(response.message);
            window.location.reload(false);
          }
        }).catch((error) => {
          console.log(error);
        });
    } else {
      alert('Ineligible age. Pupils should be older than 4 years');
    }
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

  updateStudentModal(studentData) {
    this.setState({ modalIsOpen: true });
    this.setState({
      name: studentData.name,
      surname: studentData.surname,
      classId: studentData.classId,
      dob: studentData.dob,
      phoneNumber: studentData.phoneNumber,
      emailAddress: studentData.emailAddress,
      idNumber: studentData.idNumber
    });
  }

  async deleteStudent(studentId) {
    AdminServices.deleteStudent(studentId)
      .then((response) => {
        console.log(response);
        this.setState({ page: 0 });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      students, limit, page, classes, className, addStudentForm, name, surname, dob, phoneNumber, emailAddress, idNumber, modalIsOpen, closeModal
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
                              <TableCell>
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {students.slice(page * limit, page * limit + limit).map((student) => (
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
                                  {Moment(`${student.dob}`).format('YYYY-MM-DD')}
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
                                <TableCell>
                                  <Button
                                    size="small"
                                    color="error"
                                    variant="contained"
                                    onClick={() => this.deleteStudent(student.studentId)}
                                  >
                                    Delete
                                  </Button>
                                  <Box sx={{ pt: 1 }} />
                                  <Button
                                    size="small"
                                    color="inherit"
                                    variant="contained"
                                    onClick={() => this.updateStudentModal(student)}
                                  >
                                    Edit
                                  </Button>
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
                      onPageChange={(e) => this.handlePageChange(e, page)}
                      onRowsPerPageChange={(e) => this.handleLimitChange(e)}
                      page={page}
                      rowsPerPage={limit}
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

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <form
              autoComplete="on"
              noValidate
            >
              <Card>
                <CardHeader
                  title="Edit Student Details"
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
                    onClick={() => this.handleUpdate()}
                  >
                    Submit
                  </Button>
                </Box>
              </Card>
            </form>

          </Modal>

        </Box>
      </>
    );
  }
}

export default AddStudents;
