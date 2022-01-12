/* eslint-disable no-alert */
/* eslint-disable prefer-const */

import { Helmet } from 'react-helmet';
// import { useState } from 'react';
import React from 'react';

import {
  Box, Container, Grid, Avatar,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardHeader,
  Divider,
  Button,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import MarksForm from 'src/components/teacher/progressReport/MarksForm';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import getInitials from 'src/utils/getInitials';
import TeacherServices from 'src/services/teacher';

// const { classId } = JSON.parse(localStorage.getItem('recordingSubject'));

// const ProgressReport = () => {
class ProgressReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStudent: '',
      limit: 10,
      page: 0,
      studentRecord: {},
      reviewRecord: false,
      marksResults: [],
      students: [],
      recordingSubject: {},
      reportsSubmitted: false
      // classId: ''
    };
    this.setState({ recordingSubject: JSON.parse(localStorage.getItem('recordingSubject')) });
    // this.setState({ classId: this.recordingSubject.classId });
  }

  componentDidMount() {
    this.getStudentReports();
    this.getStudentsInClass();
    this.getTeacherSubmissionStatus();
  }

  handleReviewRecordChange() {
    const { reviewRecord } = this.state;
    if (reviewRecord) {
      this.setState({ reviewRecord: false });
    } else {
      this.setState({ reviewRecord: true });
    }
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  handleMarkRecording(row) {
    this.setState({ studentRecord: row });
    this.setState({ selectStudent: row.studentId });
    localStorage.setItem('studentRecord', JSON.stringify(row));
  }

  async handleReportSubmission() {
    const classData = JSON.parse(localStorage.getItem('recordingSubject'));
    const { students, marksResults } = this.state;
    const userId = sessionStorage.getItem('userId');
    const teacherName = sessionStorage.getItem('name');

    if (students.length > 0 && marksResults.length > 0) {
      const data = {
        className: classData.className,
        subject: classData.subjectCode,
        classId: classData.className,
        status: 'SUBMITTED',
        teacherName,
        teacherId: userId
      };

      TeacherServices.submitReports(data)
        .then((response) => {
          console.log(response);
          alert('Results successfully submitted for reporting');
          this.setState({ reportsSubmitted: true });
        }).catch((error) => {
          console.log(error);
        });
    } else {
      alert('No results available for submission. Please add students results.');
    }
  }

  async getStudentReports() {
    const { classId } = JSON.parse(localStorage.getItem('recordingSubject'));
    TeacherServices.getStudentMarksPerClass(classId)
      .then((response) => {
        this.setState({ marksResults: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async getStudentsInClass() {
    const { classId } = JSON.parse(localStorage.getItem('recordingSubject'));
    TeacherServices.getStudentsPerClass(classId)
      .then((response) => {
        this.setState({ students: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async getTeacherSubmissionStatus() {
    const userId = sessionStorage.getItem('userId');
    const classData = JSON.parse(localStorage.getItem('recordingSubject'));
    TeacherServices.checkTeacherSubmissionStatus(userId, classData.subjectCode)
      .then((response) => {
        if (response.submitted) {
          this.setState({ reportsSubmitted: response.submitted, reviewRecord: true });
        } else {
          this.setState({ reportsSubmitted: response.submitted });
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      selectStudent, limit, page, studentRecord, reviewRecord, marksResults, students, recordingSubject, reportsSubmitted
    } = this.state;
    return (
      <>
        <Helmet>
          <title>Progress Report | Vivid Learn</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Box>
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                    >
                      <Grid
                        lg={6}
                        md={12}
                        xl={9}
                        xs={12}
                      >
                        <Box sx={{ maxWidth: 500 }}>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon
                                    fontSize="small"
                                    color="action"
                                  >
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              )
                            }}
                            placeholder="Search student"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                      <Grid
                        lg={6}
                        md={12}
                        xl={9}
                        xs={12}
                      >
                        {reportsSubmitted
                          ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                              }}
                            >
                              <Button
                                color="primary"
                                variant="contained"
                              >
                                Reports Submitted For Processing
                              </Button>
                            </Box>
                          )
                          : (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                              }}
                            >
                              <Button sx={{ mx: 1 }} onClick={() => this.handleReviewRecordChange()}>
                                {reviewRecord ? 'View Students List' : 'Review Records'}
                              </Button>
                              <Button
                                onClick={() => this.handleReportSubmission()}
                                color="primary"
                                variant="contained"
                              >
                                Submit Reports
                              </Button>
                            </Box>
                          )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Grid
              container
              spacing={3}
              sx={{ marginTop: '0.1%' }}
            >

              {reviewRecord ? (
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <Box sx={{ pt: 3 }}>
                    <Card>
                      {recordingSubject.className}
                      <PerfectScrollbar>
                        <Box sx={{ minWidth: 950 }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Student Name
                                </TableCell>
                                <TableCell>
                                  Mark
                                </TableCell>
                                <TableCell>
                                  Grade
                                </TableCell>
                                <TableCell>
                                  Comment
                                </TableCell>
                                <TableCell>
                                  Date
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {marksResults.slice(0, limit).map((student) => (
                                <TableRow
                                  hover
                                  key={student.studentId}
                                  selected={selectStudent === student.studentId}
                                >
                                  <TableCell>
                                    <Box
                                      sx={{
                                        alignItems: 'center',
                                        display: 'flex'
                                      }}
                                    >
                                      <Avatar
                                        src={student.avatarUrl}
                                        sx={{ mr: 2 }}
                                      >
                                        {getInitials(`${student.firstName} ${student.surname}`)}
                                      </Avatar>
                                      <Typography
                                        color="textPrimary"
                                        variant="body1"
                                      >
                                        {`${student.firstName} ${student.surname}` }
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {`${student.mark}`}
                                  </TableCell>
                                  <TableCell>
                                    {student.grade}
                                  </TableCell>
                                  <TableCell>
                                    {student.comment}
                                  </TableCell>
                                  <TableCell>
                                    {moment(student.dateJoined).format('DD MMM YYYY')}
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

              ) : (
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
                        <Box sx={{ minWidth: 950 }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Student Name
                                </TableCell>
                                <TableCell>
                                  Class
                                </TableCell>
                                <TableCell>
                                  Email Address
                                </TableCell>
                                <TableCell>
                                  Date Joined
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {students.slice(0, limit).map((student) => (
                                <TableRow
                                  hover
                                  key={student.studentId}
                                  selected={selectStudent === student.studentId}
                                  onClick={() => this.handleMarkRecording(student)}
                                >
                                  <TableCell>
                                    <Box
                                      sx={{
                                        alignItems: 'center',
                                        display: 'flex'
                                      }}
                                    >
                                      <Avatar
                                        src={student.avatarUrl}
                                        sx={{ mr: 2 }}
                                      >
                                        {getInitials(`${student.name} ${student.surname}`)}
                                      </Avatar>
                                      <Typography
                                        color="textPrimary"
                                        variant="body1"
                                      >
                                        {`${student.name} ${student.surname}` }
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {student.classId}
                                  </TableCell>
                                  <TableCell>
                                    {student.emailAddress}
                                  </TableCell>
                                  <TableCell>
                                    {moment(student.dateJoined).format('DD MMM YYYY')}
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
                        onPageChange={this.handlePageChange}
                        onRowsPerPageChange={this.handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                      />
                    </Card>

                  </Box>
                </Grid>
              )}

              <Grid
                item
                lg={4}
                md={12}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  {studentRecord.name === undefined ? (
                    <Card>
                      <CardHeader
                        title={reportsSubmitted ? 'Marks already Submitted for this subject' : 'PLEASE CLICK ON STUDENT TO ADD MARKS'}
                      />
                      <Divider />
                    </Card>
                  ) : (<MarksForm studentName={`${studentRecord.name} ${studentRecord.surname}`} />) }

                </Box>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </>
    );
  }
}

export default ProgressReport;
