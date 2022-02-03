/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AddSubjectForm from 'src/components/schoolAdmin/AddSubjectForm';
import SchoolAdminServices from '../../services/schoolAdmin';

const navigate = useNavigate();

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
    this.setState({ limit: event.target.value });
  }

  handlePageChange(event, newPage) {
    let s = new XMLSerializer();
    let str = s.serializeToString(event.target);
    if (str.includes('KeyboardArrowRightIcon')) {
      this.setState({ page: newPage + 1 });
    } else if (newPage !== 0) {
      this.setState({ page: newPage - 1 });
    }
  }

  async getAllSubjects() {
    SchoolAdminServices.getAllSubjects()
      .then((response) => {
        this.setState({ subjects: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async deleteSubject(subjectCode) {
    SchoolAdminServices.deleteSubject(subjectCode)
      .then((response) => {
        this.setState({ page: 0 });
        console.log(response);
        navigate('/api/esm/subjects', { replace: true });
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
                              <TableCell>
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {subjects.slice(page * limit, page * limit + limit).map((subject) => (
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
                                <TableCell>
                                  <Button
                                    size="small"
                                    color="error"
                                    variant="contained"
                                    // eslint-disable-next-line no-underscore-dangle
                                    onClick={() => this.deleteSubject(subject._id)}
                                  >
                                    Delete
                                  </Button>
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
                      onPageChange={(e) => this.handlePageChange(e, page)}
                      onRowsPerPageChange={(e) => this.handleLimitChange(e)}
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
