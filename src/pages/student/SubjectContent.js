import { Helmet } from 'react-helmet';
// import { useLocation } from 'react-router-dom';

import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

import MenuBoard from 'src/components/student/StudentMenu';
import LibraryCard from 'src/components/student/library/LibraryCard';
import React from 'react';
import TeacherServices from 'src/services/teacher';

const subject = 'Shona';
const siteName = ' | Vivid Learn ';

class SubjectContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName: '',
      viewDoc: false,
      docs: [],
      resources: []
    };
  }

  componentDidMount() {
    this.setState({
      subjectName: subject + siteName
    });
    this.getAllSubjectResources();
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

  readDocument(path) {
    this.setState({
      viewDoc: true,
      docs: [{ uri: path }]
    });
  }

  render() {
    // const location = useLocation();
    // const subjectDetails = location.state;

    // if (this.state.redirect === true) {
    //   return <Redirect to="/class-coursework" />;
    // }

    const {
      subjectName, viewDoc, docs, resources
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

                  <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
                </Box>
              )
              : (
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
                    lg={10}
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
                        <div onClick={() => this.readDocument(resource.resourcePath)} aria-hidden="true">
                          <LibraryCard resource={resource} />
                        </div>
                      </Grid>
                    ))}
                  </Grid>

                  <Grid
                    item
                    lg={2}
                    md={3}
                    xl={3}
                    xs={12}
                  >
                    <MenuBoard sx={{ height: '100%' }} />

                  </Grid>

                </Grid>
              )}
          </Container>
        </Box>
      </>
    );
  }
}
export default SubjectContent;
