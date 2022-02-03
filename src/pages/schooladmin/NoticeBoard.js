/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import React from 'react';
import Modal from 'react-modal';

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
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AddNoticeForm from 'src/components/schoolAdmin/NoticeBoardForm';
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
      notices: [],
      noticeBody: null,
      noticeTitle: null,
      modalIsOpen: false,
      target: '',
      noticeId: null
    };
  }

  componentDidMount() {
    this.getNotices();
  }

  handleChangeTarget(event) {
    this.setState({ target: event.target.value });
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  handlePageChange(event) {
    this.setState({ page: event.target.value });
  }

  async getNotices() {
    SchoolAdminServices.getAllNotices()
      .then((response) => {
        this.setState({ notices: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async deleteNotice(noticeId) {
    SchoolAdminServices.deleteAnnouncement(noticeId)
      .then((response) => {
        console.log(response);
        this.setState({ page: 0 });
        window.location.reload(false);
      }).catch((error) => {
        console.log(error);
      });
  }

  async submitEdit() {
    const {
      noticeTitle, noticeBody, target, noticeId
    } = this.state;

    const data = {
      noticeTitle,
      noticeBody,
      target,
      noticeId
    };

    SchoolAdminServices.updateAnnouncement(data)
      .then((response) => {
        alert(response.message);
        window.location.reload(false);
      }).catch((error) => {
        console.log(error);
        alert('Snap, an error occured. Please try again later.');
      });
  }

  updateNoticeModal(noticeData) {
    this.setState({ modalIsOpen: true });
    this.setState({
      noticeId: noticeData._id,
      noticeBody: noticeData.noticeBody,
      noticeTitle: noticeData.noticeTitle,
      target: noticeData.target
    });
  }

  render() {
    const {
      limit, page, notices, modalIsOpen, noticeTitle, target, noticeBody
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
                                Notice Title
                              </TableCell>
                              <TableCell>
                                Notice Message
                              </TableCell>
                              <TableCell>
                                Notice Date
                              </TableCell>
                              <TableCell>
                                Target
                              </TableCell>
                              <TableCell>
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {notices.slice(page * limit, page * limit + limit).map((notice) => (
                              <TableRow
                                hover
                                key={notice.id}
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
                                      {`${notice.noticeTitle}` }
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${notice.noticeBody}`}
                                </TableCell>
                                <TableCell>
                                  {`${notice.updatedAt}`}
                                </TableCell>
                                <TableCell>
                                  {`${notice.target}`}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="small"
                                    color="error"
                                    variant="contained"
                                    onClick={() => this.deleteNotice(notice._id)}
                                  >
                                    Delete
                                  </Button>
                                  <Box sx={{ pt: 1 }} />
                                  <Button
                                    size="small"
                                    color="inherit"
                                    variant="contained"
                                    onClick={() => this.updateNoticeModal(notice)}
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
                      count={notices.length}
                      onPageChange={(e) => this.handlePageChange(e)}
                      onRowsPerPageChange={(e) => this.handleLimitChange(e)}
                      page={page}
                      rowsPerPage={limit}
                    />
                  </Card>

                </Box>
              </Grid>

              <AddNoticeForm />

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
                    title="Add New Notice"
                  />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={8}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Notice Title"
                          name="noticeTitle"
                          onChange={(e) => this.setState({ noticeTitle: e.target.value })}
                          required
                          value={noticeTitle}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Target</InputLabel>
                          <Select
                            value={target}
                            label="Target"
                            onChange={(e) => this.handleChangeTarget(e)}
                            required
                            variant="outlined"
                          >
                            <MenuItem value="ALL">ALL</MenuItem>
                            <MenuItem value="STAFF">STAFF</MenuItem>
                            <MenuItem value="STUDENTS">STUDENTS</MenuItem>
                            <MenuItem value="JUNIOR">JUNIOR SCHOOL</MenuItem>
                            <MenuItem value="SENIOR">SENIOR SCHOOL</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Message"
                          name="noticeBody"
                          onChange={(e) => this.setState({ noticeBody: e.target.value })}
                          multiline="true"
                          required
                          value={noticeBody}
                          variant="outlined"
                        />
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
