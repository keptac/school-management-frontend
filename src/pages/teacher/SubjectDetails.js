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
  // CardHeader,
  // Divider,
} from '@material-ui/core';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import getInitials from 'src/utils/getInitials';
import TeacherServices from 'src/services/teacher';
import TeacherMenuBoard from 'src/components/teacher/TeacherMenuBoard';

// const { classId } = JSON.parse(localStorage.getItem('recordingSubject'));

class TeacherSubjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStudent: '',
      limit: 10,
      page: 0,
      reviewRecord: false,
      marksResults: [],
      students: [],
      recordingSubject: {},
      // classId: ''
    };
    this.setState({ recordingSubject: JSON.parse(localStorage.getItem('recordingSubject')) });
    // this.setState({ classId: this.recordingSubject.classId });
  }

  componentDidMount() {
    this.getStudentReports();
    this.getStudentsInClass();
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
        console.log(response);
        this.setState({ students: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      selectStudent, limit, page, students, recordingSubject
    } = this.state;

    const classData = JSON.parse(localStorage.getItem('recordingSubject'));
    return (
      <>
        <Helmet>
          <title>
            {' '}
            {classData.subjectName}
            {' '}
            | Vivid Learn
          </title>
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
                lg={2}
                md={4}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  <TeacherMenuBoard />
                </Box>
              </Grid>

              <Grid
                item
                lg={10}
                md={8}
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
                                Student
                              </TableCell>
                              <TableCell>
                                Student ID
                              </TableCell>
                              <TableCell>
                                Full Name
                              </TableCell>
                              <TableCell>
                                DOB
                              </TableCell>
                              <TableCell>
                                Guardian Phone
                              </TableCell>
                              <TableCell>
                                Address
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {students.slice(0, limit).map((student) => (
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
                                      {getInitials(`${student.name} ${student.surname}`)}
                                    </Avatar>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${student.studentId}`}
                                </TableCell>
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
                                      {`${student.name} ${student.surname}` }
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {moment(student.dob).format('DD MMM YYYY')}
                                </TableCell>
                                <TableCell>
                                  {`${student.phoneNumber}`}
                                </TableCell>
                                <TableCell>
                                  {`${student.address}`}
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
                      onRowsPerPageChange={(event) => this.handleLimitChange(event)}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25]}
                    />
                  </Card>

                </Box>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default TeacherSubjectDetails;
