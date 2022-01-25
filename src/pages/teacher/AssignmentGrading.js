/* eslint-disable no-nested-ternary */
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

} from '@material-ui/core';

import AssignmentMarksForm from 'src/components/teacher/assignmentGrading/AssignmentMarksForm';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import getInitials from 'src/utils/getInitials';
import TeacherServices from 'src/services/teacher';

class AssignmentGrading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStudent: '',
      limit: 10,
      page: 0,
      submissionRecord: {},
      reviewRecord: false,
      marksResults: [],
      students: [],
      recordingSubject: {},
      reportsSubmitted: false
    };
    this.setState({ recordingSubject: JSON.parse(localStorage.getItem('recordingSubject')) });
  }

  componentDidMount() {
    this.getStudentSubmissions();
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

  handlePageChange(event, newPage) {
    let s = new XMLSerializer();
    let str = s.serializeToString(event.target);
    if (str.includes('KeyboardArrowRightIcon')) {
      this.setState({ page: newPage + 1 });
    } else if (newPage !== 0) {
      this.setState({ page: newPage - 1 });
    }
  }

  handleMarkRecording(row) {
    this.setState({ submissionRecord: row });
    this.setState({ selectStudent: row.studentId });
    localStorage.setItem('submissionRecord', JSON.stringify(row));

    console.log(row);
  }

  // CLoses assignment status
  async handleReportSubmission() {
    const { assignmentId } = JSON.parse(localStorage.getItem('recordingAssignment'));
    const { students, marksResults } = this.state;

    if (students.length > 0 && marksResults.length > 0) {
      const data = {
        assignmentId,
        status: 'SUBMITTED',
      };

      TeacherServices.closeAssignment(data)
        .then((response) => {
          console.log(response);
          window.location.reload(false);
          this.setState({ reportsSubmitted: true });
        }).catch((error) => {
          console.log(error);
        });
    } else {
      alert('No results available for submission. Please add students results.');
    }
  }

  async getStudentSubmissions() {
    const { assignmentId } = JSON.parse(localStorage.getItem('recordingAssignment'));
    TeacherServices.getSubmittedAssignments(assignmentId)
      .then((response) => {
        this.setState({ marksResults: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async getTeacherSubmissionStatus() {
    const userId = sessionStorage.getItem('userId');
    const recordingAssignment = JSON.parse(localStorage.getItem('recordingAssignment'));
    TeacherServices.checkTeacherAssignmentStatus(userId, recordingAssignment.assignmentId)
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
      selectStudent, limit, page, submissionRecord, marksResults, students, recordingSubject, reportsSubmitted
    } = this.state;
    return (
      <>
        <Helmet>
          <title>Assignment Results | Vivid Learn</title>
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
              <Grid
                container
              >
                <Grid
                  lg={6}
                  md={12}
                  xl={9}
                  xs={12}
                />
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
                          Results issued to students
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
                        <Button
                          onClick={() => this.handleReportSubmission()}
                          color="primary"
                          variant="contained"
                        >
                          Submit Results
                        </Button>
                      </Box>
                    )}
                </Grid>
              </Grid>
            </Box>
            <Grid
              container
              spacing={3}
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
                            {marksResults.slice(page * limit, page * limit + limit).map((student) => (
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
                                      {getInitials(`${student.studentName}`)}
                                    </Avatar>
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {`${student.studentName}` }
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${student.mark} / ${student.total}`}
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
                      onPageChange={(e) => this.handlePageChange(e, page)}
                      onRowsPerPageChange={(e) => this.handleLimitChange(e)}
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
                  {submissionRecord.studentName === undefined ? (
                    <Card>
                      <CardHeader
                        title={reportsSubmitted ? 'Marks already Submitted for this subject' : (marksResults.length > 0 ? 'PLEASE CLICK ON STUDENT TO ADD MARKS' : 'NO STUDENT HAS SUBMITTED')}
                      />
                      <Divider />
                    </Card>
                  ) : (<AssignmentMarksForm studentName={`${submissionRecord.studentName}`} />) }
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default AssignmentGrading;
