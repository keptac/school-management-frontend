/* eslint-disable no-alert */
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
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem
} from '@material-ui/core';
import Modal from 'react-modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddClassForm from 'src/components/schoolAdmin/AddClassForms';
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
      classes: [],
      modalIsOpen: false,
      className: null,
      station: null,
      classId: null
    };
  }

  componentDidMount() {
    this.getAllClasses();
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  handleChangeStation(event) {
    this.setState({ station: event.target.value });
  }

  handlePageChange(event, newPage) {
    const s = new XMLSerializer();
    const str = s.serializeToString(event.target);
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

  updateClassModal(classData) {
    this.setState({ modalIsOpen: true });
    this.setState({
      className: classData.className,
      classId: classData.classId,
      station: classData.station
    });
  }

  submitEdit() {
    const {
      className, station, classId
    } = this.state;

    const data = {
      className,
      classId,
      station
    };

    SchoolAdminServices.updateClasses(data)
      .then((response) => {
        alert(response.message);
        window.location.reload(false);
      }).catch((error) => {
        console.log(error);
        alert('Snap, an error occured. Please try again later.');
      });
  }

  async deleteClass(classId) {
    SchoolAdminServices.deleteClass(classId)
      .then((response) => {
        console.log(response);
        this.setState({ page: 0 });
        window.location.reload(false);
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      limit, page, classes, modalIsOpen, className, station
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
                                    sx={{ margin: 0.5 }}
                                    color="inherit"
                                    variant="contained"
                                    onClick={() => this.updateClassModal(classe)}
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
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={7}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Class Name"
                          name="className"
                          onChange={(e) => this.setState({ className: e.target.value })}
                          required
                          value={className}
                          variant="outlined"
                        />

                      </Grid>
                      <Grid
                        item
                        md={5}
                        xs={12}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Station</InputLabel>
                          <Select
                            value={station}
                            label="Station"
                            onChange={(e) => this.handleChangeStation(e)}
                            required
                            variant="outlined"
                          >
                            <MenuItem value="MARIMBA ECD">Marimba ECD</MenuItem>
                            <MenuItem value="JUNIOR">Tynwald ECD and Junior School </MenuItem>
                            <MenuItem value="VICFALLS">Victorial Falls ECD and Junior School</MenuItem>
                            <MenuItem value="SENIOR">Tynwald Senior School </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
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
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.submitEdit()}
                    >
                      Submit
                    </Button>
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
