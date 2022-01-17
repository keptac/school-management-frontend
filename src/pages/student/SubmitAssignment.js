/* eslint-disable no-alert */
/* eslint-disable prefer-const */

import { Helmet } from 'react-helmet';
import React from 'react';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';

import SubmitAssignmentForm from 'src/components/student/SubmitAssignmentForm';
import MenuBoard from 'src/components/student/StudentMenu';

class SubmitAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
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
                      pt: 2
                    }}
                  />
                  <SubmitAssignmentForm />
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

export default SubmitAssignment;
