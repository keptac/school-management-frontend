import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import NoticeBoard from 'src/components/NoticeBoard';
import SubjectCard from 'src/components/teacher/subject/SubjectCard';
import React from 'react';

import TeacherServices from '../../services/teacher';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: []
    };
  }

  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    const userId = sessionStorage.getItem('userId');
    TeacherServices.getTeacherClasses(userId) // Get all subjects for student
      .then((response) => {
        this.setState({ subjectData: response });
      });
  }

  render() {
    const { subjectData } = this.state;
    return (
      <>
        <Helmet>
          <title>TeacherDashboard</title>
        </Helmet>
        <Box
          sx={{
            // backgroundColor: 'background.default',
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
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >

                <Grid
                  container
                  spacing={3}
                >
                  {subjectData.map((resource) => (
                    <Grid
                      item
                      key={resource.subjectCode}
                      lg={6}
                      md={6}
                      xs={12}
                    >
                      <SubjectCard resource={resource} />
                    </Grid>

                  ))}
                </Grid>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <NoticeBoard sx={{ height: '100%' }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}
export default TeacherDashboard;
