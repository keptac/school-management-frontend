/* eslint-disable no-alert */
/* eslint-disable prefer-const */

import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Card
} from '@material-ui/core';

import LibraryCard from 'src/components/student/library/LibraryCard';
import LibraryToolBar from 'src/components/student/library/LibraryToolbar';
import resources from 'src/__mocks__/resources';

import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

import TeacherServices from 'src/services/teacher';
import TeacherMenuBoard from 'src/components/teacher/TeacherMenuBoard';

// const { classId } = JSON.parse(localStorage.getItem('recordingSubject'));

class TeacherClassResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marksResults: [],
      students: [],
      viewDoc: false,
      docs: []
    };
  }

  componentDidMount() {
  }

  async handleUploadResource() {
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

  async getAllSubjectResources() {
    const { classId } = JSON.parse(localStorage.getItem('recordingSubject'));
    TeacherServices.getStudentMarksPerClass(classId)
      .then((response) => {
        this.setState({ marksResults: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  readDocument() {
    this.setState({
      viewDoc: true,
      docs: [{ uri: 'https://www.youtube.com/watch?v=WdFtSNO2bBg' }]
    });
  }

  render() {
    const {
      viewDoc, docs
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
                md={12}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  <TeacherMenuBoard />
                </Box>
              </Grid>

              <Grid
                item
                lg={9}
                md={12}
                xl={9}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
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

                            <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
                          </Box>
                        )
                        : (
                          <>
                            <LibraryToolBar />
                            <Box sx={{ pt: 3 }}>
                              <Grid
                                container
                                spacing={3}
                              >
                                {resources.map((resource) => (
                                  <Grid
                                    item
                                    key={resource.id}
                                    lg={4}
                                    md={6}
                                    xs={12}
                                  >
                                    <div onClick={() => this.readDocument()} aria-hidden="true">
                                      <LibraryCard resource={resource} />
                                    </div>
                                  </Grid>

                                ))}
                              </Grid>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                pt: 3
                              }}
                            >
                              <Pagination
                                color="primary"
                                count={3}
                                size="small"
                              />
                            </Box>
                          </>
                        )}
                    </Container>
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

export default TeacherClassResources;
