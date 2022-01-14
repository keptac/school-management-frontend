/* eslint-disable no-alert */
/* eslint-disable prefer-const */

import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Card,
  Button
} from '@material-ui/core';

import LibraryCard from 'src/components/teacher/library/LibraryCard';

import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

import TeacherServices from 'src/services/teacher';
import TeacherMenuBoard from 'src/components/teacher/TeacherMenuBoard';
import UploadLearningResourcesForm from 'src/components/teacher/UploadLearningResourcesForm';

class TeachingResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      learningResources: [],
      viewDoc: false,
      uploadDoc: false,
      docs: []
    };
  }

  componentDidMount() {
    this.getAllSubjectResources();
    this.setState({
      viewDoc: false,
    });
  }

  async getAllSubjectResources() {
    const recordingSubject = JSON.parse(localStorage.getItem('recordingSubject'));
    TeacherServices.getResourcesBySubjectCode(recordingSubject.subjectCode)
      .then((response) => {
        this.setState({ learningResources: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  readDocument(path) {
    this.setState({
      viewDoc: true,
      docs: [{ uri: path }]
    });
  }

  uploadDocument(newState) {
    this.setState({
      uploadDoc: newState,
    });
  }

  render() {
    const {
      viewDoc, docs, uploadDoc, learningResources
    } = this.state;

    console.log(learningResources);
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
                      {uploadDoc ? ('View Materials') : ('Upload Study Materials')}
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      pt: 2
                    }}
                  />
                  {uploadDoc ? (<UploadLearningResourcesForm />) : (
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
                              <Box sx={{ pt: 3 }}>
                                <Grid
                                  container
                                  spacing={3}
                                >
                                  {learningResources.map((resource) => (
                                    <Grid
                                      item
                                      key={resource.id}
                                      lg={3}
                                      md={6}
                                      xs={12}
                                    >
                                      <div onClick={() => this.readDocument(resource.resourcePath)} aria-hidden="true">
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

export default TeachingResources;
