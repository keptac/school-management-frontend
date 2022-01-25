/* eslint-disable no-alert */
/* eslint-disable prefer-const */

import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

// import DocViewer from 'react-doc-viewer';
import FileViewer from 'react-file-viewer';
import TeacherServices from 'src/services/teacher';
import MenuBoard from 'src/components/student/StudentMenu';
import SubmittedWork from 'src/components/student/SubmittedWork';
import StudentServices from 'src/services/student';
import StudentsAssignmentsFolderCard from 'src/components/student/library/StudentAssignmentFolderCard';

class ClassWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classWork: [],
      viewDoc: false,
      viewSubmissions: false,
      docs: [],
      type: '',
      limit: 10,
      page: 0,
      marksResults: [],
      students: [],
      recordingSubject: {},
      download: false
    };
  }

  componentDidMount() {
    this.getAllSubjectResources();
    this.getStudentSubmissions();
    this.setState({
      viewDoc: false,
    });
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

  onError(e) {
    this.setState({ download: true });
    console.log(e, 'error in file-viewer');
  }

  async getStudentSubmissions() {
    const subjectData = JSON.parse(localStorage.getItem('subjectData'));
    const userId = sessionStorage.getItem('userId');

    StudentServices.getStudentSubmissions(subjectData.subjectCode, userId)
      .then((response) => {
        this.setState({ marksResults: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async getAllSubjectResources() {
    const subjectData = JSON.parse(localStorage.getItem('subjectData'));
    TeacherServices.getSubjectAssignments(subjectData.subjectCode)
      .then((response) => {
        this.setState({ classWork: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  readDocument(path, ext) {
    this.setState({
      viewDoc: true,
      docs: path,
      type: ext.replace('.', '')
    });
  }

  viewSubmissionsAction(newState) {
    this.setState({
      viewSubmissions: newState,
    });
  }

  render() {
    const {
      viewDoc, docs, viewSubmissions, classWork, marksResults, limit, page, students, recordingSubject, type, download
    } = this.state;

    console.log(classWork);
    const subjectData = JSON.parse(localStorage.getItem('subjectData'));
    return (
      <>
        <Helmet>
          <title>
            {' '}
            {subjectData.subjectName}
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
                lg={9}
                md={7}
                xl={9}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.viewSubmissionsAction(!viewSubmissions)}
                    >
                      {viewSubmissions ? ('View Assignments') : ('View Marked Work')}
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      pt: 1
                    }}
                  />
                  {viewSubmissions ? (
                    <Box sx={{ pt: 1 }}>
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
                                  <SubmittedWork student={student} />
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
                  ) : (
                    <Card>
                      <Container maxWidth={false}>
                        {viewDoc
                          ? (
                            <Card style={{
                              height: '800px',
                              width: '70%',
                              marginLeft: '100px',
                              paddingLeft: '10px'
                            }}
                            >
                              {
                                        download ? (<Button>Download</Button>) : (
                                          <FileViewer
                                            fileType={type}
                                            filePath={docs}
                                            onError={() => this.setState({ download: true })}
                                          />
                                        )
                                      }
                            </Card>
                          )
                          : (
                            <>
                              <Box sx={{ pt: 3 }}>
                                <Grid
                                  container
                                  spacing={3}
                                >
                                  {classWork.map((resource) => (
                                    <Grid
                                      item
                                      key={resource.id}
                                      lg={3}
                                      md={6}
                                      xs={12}
                                    >
                                      <div onClick={() => this.readDocument(resource.resourcePath, resource.ext)} aria-hidden="true">
                                        <StudentsAssignmentsFolderCard resource={resource} />
                                      </div>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>
                            </>
                          )}
                      </Container>

                      <Box
                        sx={{
                          pt: 2
                        }}
                      />
                    </Card>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                lg={3}
                md={5}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  <MenuBoard />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default ClassWork;
