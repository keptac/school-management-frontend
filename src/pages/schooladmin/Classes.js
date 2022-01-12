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
    this.setState({ limit: event });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  async getAllClasses() {
    SchoolAdminServices.getAllClasses()
      .then((response) => {
        this.setState({ classes: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
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
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {classes.slice(0, limit).map((classe) => (
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
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={classes.length}
                      onPageChange={() => this.handlePageChange(page)}
                      onRowsPerPageChange={() => this.handleLimitChange(limit)}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25]}
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
