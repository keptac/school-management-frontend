/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import React from 'react';

import {
  Box, Container, Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AddSubjectForm from 'src/components/schoolAdmin/AddSubjectForm';
import SchoolAdminServices from '../../services/schoolAdmin';

class AddClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 0,
      subjects: []
    };
  }

  componentDidMount() {
    this.getAllSubjects();
  }

  handleLimitChange(event) {
    this.setState({ limit: event });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  async getAllSubjects() {
    SchoolAdminServices.getAllSubjects()
      .then((response) => {
        this.setState({ subjects: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      limit, page, subjects,
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Subjects | Vivid Learn</title>
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
                lg={7}
                md={12}
                xl={9}
                xs={12}
              >
                <Box sx={{ pt: 3 }}>
                  <Card>
                    <PerfectScrollbar>
                      <Box sx={{ minWidth: 600 }}>

                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Subject Code
                              </TableCell>
                              <TableCell>
                                Subject Name
                              </TableCell>
                              <TableCell>
                                Level
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {subjects.slice(0, limit).map((subject) => (
                              <TableRow
                                hover
                                key={subject.subjectCode}
                              >
                                <TableCell>
                                  <Box
                                    sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                    }}
                                  >
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {`${subject.subjectCode}` }
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${subject.subjectName}`}
                                </TableCell>
                                <TableCell>
                                  {subject.level}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                      </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={subjects.length}
                      onPageChange={() => this.handlePageChange(page)}
                      onRowsPerPageChange={() => this.handleLimitChange(limit)}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25]}
                    />
                  </Card>

                </Box>
              </Grid>

              <AddSubjectForm />

            </Grid>

          </Container>
        </Box>
      </>
    );
  }
}

export default AddClass;
