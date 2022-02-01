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
  Button
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AddClassForm from 'src/components/schoolAdmin/AddClassForms';
import SchoolAdminServices from '../../services/schoolAdmin';

class AddClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 0,
      classes: []
    };
  }

  componentDidMount() {
    this.getAllClasses();
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

  async getAllClasses() {
    SchoolAdminServices.getAllClasses()
      .then((response) => {
        this.setState({ classes: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async deleteClass(classId) {
    SchoolAdminServices.deleteClass(classId)
      .then((response) => {
        console.log(response);
        this.setState({ page: 0 });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    let {
      limit, page, classes,
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
                                Class Code
                              </TableCell>
                              <TableCell>
                                Class Name
                              </TableCell>
                              <TableCell>
                                Station
                              </TableCell>
                              <TableCell>
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {classes.slice(page * limit, page * limit + limit).map((classe) => (
                              <TableRow
                                hover
                                key={classe.className}
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
                                      {`${classe.classId}` }
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${classe.className}`}
                                </TableCell>
                                <TableCell>
                                  {`${classe.station}`}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="small"
                                    color="error"
                                    variant="contained"
                                    onClick={() => this.deleteClass(classe.classId)}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    size="small"
                                    color="inherit"
                                    variant="contained"
                                    onClick={() => this.deleteClass(classe.classId)}
                                  >
                                    Edit
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
                      count={classes.length}
                      onPageChange={(e) => this.handlePageChange(e, page)}
                      onRowsPerPageChange={(e) => this.handleLimitChange(e)}
                      page={page}
                      rowsPerPage={limit}
                      // rowsPerPageOptions={[5, 10, 25]}
                    />
                  </Card>

                </Box>
              </Grid>

              <AddClassForm />

            </Grid>

          </Container>
        </Box>
      </>
    );
  }
}

export default AddClass;
