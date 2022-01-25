/* eslint-disable no-unused-vars */
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

import FileViewer from 'react-file-viewer';

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
      docs: '',
      type: '',
      download: false
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
    TeacherServices.getResourcesBySubjectCode(recordingSubject.subjectCode)
      .then((response) => {
        this.setState({ learningResources: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  readDocument(path, ext) {
    this.setState({
      docs: path,
      type: ext.replace('.', ''),
      viewDoc: true,
    });
  }

  uploadDocument(newState) {
    this.setState({
      uploadDoc: newState,
    });
  }

  render() {
    const {
      viewDoc, docs, uploadDoc, learningResources, type, download
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
                    <>
                      {/* <Container maxWidth> */}
                      {viewDoc
                        ? (
                          <Box sx={{ pt: 3, justifyContent: 'center', display: 'flex' }}>
                            <Card style={{ height: '780px', width: '70%', justifyContent: 'center', }}>
                              {
                                  download ? (<Button>Download</Button>) : (

                                    <FileViewer
                                      fileType={type}
                                      filePath={docs}
                                      allowFullScreen
                                      onError={() => this.setState({ download: true })}
                                    />

                                  )
                                }
                            </Card>
                          </Box>
                        )
                        : (
                          <Card>
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
                                    <div onClick={() => this.readDocument(resource.resourcePath, resource.ext)} aria-hidden="true">
                                      <LibraryCard resource={resource} />
                                    </div>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>

                            <Box
                              sx={{
                                pt: 2
                              }}
                            />

                          </Card>
                        )}

                      {/* </Container> */}
                    </>
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
