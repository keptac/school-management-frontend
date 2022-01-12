import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import TimeTable from 'src/components/student/dashboard/TimeTable';
import NoticeBoard from 'src/components/NoticeBoard';
import Subjectscard from 'src/components/student/dashboard/Subjectscard';
import React from 'react';

import StudentServices from '../../services/student';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: []
    };
  }

  // getAssignments = () => {
  //   StudentService.getAssignments(this.state.assignment.classId)
  //     .then((response) => {
  //       this.setState({ assignments: response }, () => {
  //         let pages = [];
  //         let perPage = 5;
  //         const totalPageCount = Math.ceil(
  //           this.state.assignments.length / perPage
  //         );

  //         for (var i = 1; i <= totalPageCount; i++) {
  //           pages.push(i);
  //         }

  //         const assignments_ = this.pageArraySplit(this.state.assignments, {
  //           currentPageNumber: this.state.currentPageNumber,
  //           perPage,
  //         });
  //         this.setState({ pages, assignments_ });
  //       });
  //     })
  //     .catch((error) => {
  //       M.toast({
  //         html: "Failed to find assignment folder",
  //         classes: "red accent-2",
  //       });
  //       console.log(error);
  //     });
  // };

  componentDidMount() {
    // this.getDashData();

    this.setState({
      subjectData: [
        { name: 'Shona', subjectCode: 'SUB123', color: '#ffc107' },
        { name: 'Maths', subjectCode: 'SUB241', color: '#c62828' },
        { name: 'General Paper', subjectCode: 'SUB251', color: '#00796b' },
        { name: 'English', subjectCode: 'SUB243', color: '#0288d1' }
      ]
    });
  }

  getDashData() {
    // const studentData = JSON.parse(localStorage.getItem('userAll'));
    // StudentServices.getStudentSubjects(studentData.studentId) // Get all courses by userid
    StudentServices.getStudentSubjects('STUD128') // Get all subjects for student
      .then((response) => {
        this.setState({ subjectData: response });
      });
  }

  render() {
    const { subjectData } = this.state;
    return (
      <>
        <Helmet>
          <title>Dashboard</title>
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
            >
              {subjectData.map((sub) => (
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <Subjectscard sx={{ height: '100%' }} subjectData={sub} />
                </Grid>
              ))}

            </Grid>
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
                <TimeTable />
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
export default Dashboard;
