import { Helmet } from 'react-helmet';
// import { useLocation } from 'react-router-dom';

import {
  Box,
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';

// import DocViewer from 'react-doc-viewer';
import FileViewer from 'react-file-viewer';
import MenuBoard from 'src/components/student/StudentMenu';
import LibraryCard from 'src/components/student/library/LibraryCard';
import React from 'react';
import TeacherServices from 'src/services/teacher';

class SubjectContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName: '',
      viewDoc: false,
      docs: [],
      resources: [],
      type: '',
    };
  }

  componentDidMount() {
    const subjectData = JSON.parse(localStorage.getItem('subjectData'));
    this.setState({
      subjectName: subjectData.subjectName
    });
    this.getAllSubjectResources();
  }

  onError(e) {
    this.setState({ download: true });
    console.log(e, 'error in file-viewer');
  }

  async getAllSubjectResources() {
    const subjectData = JSON.parse(localStorage.getItem('subjectData'));
    TeacherServices.getResourcesBySubjectCode(subjectData.subjectCode)
      .then((response) => {
        this.setState({ resources: response });
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

  render() {
    const {
      subjectName, viewDoc, docs, resources, type, download
    } = this.state;
    return (
      <>
        <Helmet>
          <title>
            {subjectName}
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
                <Box>
                  <Typography
                    align="center"
                    color="#997b2f"
                    gutterBottom
                    variant="h3"
                  >
                    {`${subjectName} Resource Library`}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginTop: '0.1%' }}
                  >
                    <Grid
                      item
                      container
                      spacing={2}
                  // sx={{ marginTop: '0.1%' }}
                      lg={9}
                      md={9}
                      xl={9}
                      xs={12}
                    >

                      {resources.map((resource) => (
                        <Grid
                          item
                          key={resource.id}
                          lg={3}
                          md={6}
                          xl={9}
                          xs={12}
                        >
                          <div onClick={() => this.readDocument(resource.resourcePath, resource.ext)} aria-hidden="true">
                            <LibraryCard resource={resource} />
                          </div>
                        </Grid>
                      ))}
                    </Grid>

                    <Grid
                      item
                      lg={3}
                      md={3}
                      xl={3}
                      xs={12}
                    >
                      <MenuBoard sx={{ height: '100%' }} />

                    </Grid>

                  </Grid>
                </Box>
              )}
          </Container>
        </Box>
      </>
    );
  }
}
export default SubjectContent;
