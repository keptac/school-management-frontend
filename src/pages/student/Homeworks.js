import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

// import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import FileViewer from 'react-file-viewer';
import MenuBoard from 'src/components/student/StudentMenu';
import LibraryCard from 'src/components/student/library/LibraryCard';
import React from 'react';
import resources from 'src/__mocks__/subjectResources';

const subject = 'Shona';
const siteName = ' | Vivid Learn ';

class SubjectContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName: '',
      viewDoc: false,
      docs: [],
      type: ''
    };
  }

  componentDidMount() {
    this.setState({
      subjectName: subject + siteName
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
      subjectName, viewDoc, docs, type
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

                  <FileViewer
                    fileType={type}
                    filePath={docs}
                  />
                  {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} /> */}
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
                        <div onClick={() => this.readDocument(resource.resourcePath, resource.ext)} aria-hidden="true">
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
