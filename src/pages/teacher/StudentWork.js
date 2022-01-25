/* eslint-disable no-alert */
/* eslint-disable prefer-const */

import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  Button
} from '@material-ui/core';

import AssignmentsFolderCard from 'src/components/teacher/library/AssignmentFolderCard';

// import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import FileViewer from 'react-file-viewer';
import TeacherServices from 'src/services/teacher';
import TeacherMenuBoard from 'src/components/teacher/TeacherMenuBoard';
import IssueAssignment from 'src/components/teacher/IssueAssignment';

class StudentWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentWork: [],
      viewDoc: false,
      uploadDoc: false,
      docs: [],
      type: ''
    };
  }

  componentDidMount() {
    this.getAllSubjectResources();
    this.setState({
      viewDoc: false,
    });
  }

  onError(e) {
    this.setState({ download: true });
    console.log(e, 'error in file-viewer');
  }

  async getAllSubjectResources() {
    const recordingSubject = JSON.parse(localStorage.getItem('recordingSubject'));
    TeacherServices.getSubjectAssignments(recordingSubject.subjectCode)
      .then((response) => {
        this.setState({ studentWork: response });
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

  uploadDocument(newState) {
    this.setState({
      uploadDoc: newState,
    });
  }

  render() {
    const {
      viewDoc, docs, uploadDoc, studentWork, type, download
    } = this.state;

    console.log(studentWork);
    const subjectData = JSON.parse(localStorage.getItem('recordingSubject'));
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
                lg={2}
                md={5}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  <TeacherMenuBoard />
                </Box>
              </Grid>

              <Grid
                item
                lg={10}
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
                      onClick={() => this.uploadDocument(!uploadDoc)}
                    >
                      {uploadDoc ? ('View Assignments') : ('Issue New Class Work')}
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      pt: 2
                    }}
                  />
                  {uploadDoc ? (<IssueAssignment />) : (
                    <Card>
                      <Container maxWidth={false}>
                        {viewDoc
                          ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                pt: 3
                              }}
                            >
                              {
                                download ? (<Button>Download</Button>) : (
                                  <FileViewer
                                    fileType={type}
                                    filePath={docs}
                                    onError={(e) => this.onError(e)}
                                  />
                                  // {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} /> */}
                                )
                              }
                            </Box>
                          )
                          : (
                            <>
                              <Box sx={{ pt: 3 }}>
                                <Grid
                                  container
                                  spacing={3}
                                >
                                  {studentWork.map((resource) => (
                                    <Grid
                                      item
                                      key={resource.id}
                                      lg={3}
                                      md={6}
                                      xs={12}
                                    >
                                      <div onClick={() => this.readDocument(resource.resourcePath, resource.ext)} aria-hidden="true">
                                        <AssignmentsFolderCard resource={resource} />
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

            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default StudentWork;
