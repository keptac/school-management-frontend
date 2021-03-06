/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import React from 'react';
import moment from 'moment';

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
import ClassNoticeForm from 'src/components/teacher/NoticeBoardForm';
import SchoolAdminServices from '../../services/schoolAdmin';

class ClassNoticeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 0,
      notices: []
    };
  }

  componentDidMount() {
    this.getNotices();
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

  async getNotices() {
    const { classId } = JSON.parse(localStorage.getItem('recordingSubject'));

    SchoolAdminServices.getNoticesByTaget(classId)
      .then((response) => {
        this.setState({ notices: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      limit, page, notices,
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Announcements | Vivid Learn</title>
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
                                Sent to
                              </TableCell>
                              <TableCell>
                                Notice Date
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
                                  {`${notice.target}`}
                                </TableCell>
                                <TableCell>
                                  {moment(notice.updatedAt).format('DD/MM/YYYY')}
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
                      onPageChange={(e) => this.handlePageChange(e, page)}
                      onRowsPerPageChange={(e) => this.handleLimitChange(e)}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25]}
                    />
                  </Card>

                </Box>
              </Grid>

              <ClassNoticeForm />

            </Grid>

          </Container>
        </Box>
      </>
    );
  }
}

export default ClassNoticeBoard;
