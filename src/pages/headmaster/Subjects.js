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
  Button,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';
import Modal from 'react-modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SchoolAdminServices from '../../services/schoolAdmin';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

class AddClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 0,
      subjects: [],
      modalIsOpen: false,
      subjectCode: null,
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

  updateSubjectModal(subject) {
    this.setState({ modalIsOpen: true });
    this.setState({
      subjectCode: subject.subjectCode
    });
  }

  render() {
    const {
      limit, page, subjects, modalIsOpen, subjectCode
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
                lg={8}
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
            </Grid>
          </Container>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
          >
            <Box sx={{ pt: 3 }}>
              <form
                autoComplete="off"
                noValidate
              >
                <Card>
                  <CardHeader
                    title="Edit Class"
                  />
                  <Divider />
                  <CardContent>
                    Subject:
                    {' '}
                    {subjectCode}
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2
                    }}
                  >
                    <Button
                      color="inherit"
                      variant="contained"
                      onClick={() => this.setState({ modalIsOpen: false })}
                    >
                      Close
                    </Button>
                    <Box sx={{ p: 1 }} />
                  </Box>
                </Card>
              </form>

            </Box>
          </Modal>
        </Box>
      </>
    );
  }
}

export default AddClass;
