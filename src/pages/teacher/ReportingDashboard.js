import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import SubjectReportingCard from 'src/components/teacher/subject/SubjectReportingCard';
import React from 'react';

import TeacherServices from '../../services/teacher';

class ReportingDashboard extends React.Component {
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
          <title>ReportingDashboard</title>
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
                lg={12}
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
                      <SubjectReportingCard resource={resource} />
                    </Grid>

                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}
export default ReportingDashboard;
