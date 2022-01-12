/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet';
import { useState } from 'react';

import {
  Box, Container, Grid, Avatar,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardHeader,
  Divider,
  Button,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
// import StudentResults from 'src/components/teacher/progressReport/StudentResults';
import MarksForm from 'src/components/teacher/progressReport/MarksForm';
import students from 'src/__mocks__/studentsMarks';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import getInitials from 'src/utils/getInitials';

const ProgressReport = () => {
  const [selectStudent, setSelectedStudent] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [studentRecord, setStudentRecord] = useState({});

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleMarkRecording = (row) => {
    setStudentRecord(row);
    setSelectedStudent(row.studentId);
    localStorage.setItem('studentRecord', JSON.stringify(row));
  };

  return (
    <>
      <Helmet>
        <title>Students | Vivid Learn</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button>
                Import
              </Button>
              <Button sx={{ mx: 1 }}>
                Export
              </Button>
              <Button
                color="primary"
                variant="contained"
              >
                Add student
              </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Search student"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
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
                    <Box sx={{ minWidth: 950 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Student Name
                            </TableCell>
                            <TableCell>
                              Mark
                            </TableCell>
                            <TableCell>
                              Grade
                            </TableCell>
                            <TableCell>
                              Comment
                            </TableCell>
                            <TableCell>
                              Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {students.slice(0, limit).map((student) => (
                            <TableRow
                              hover
                              key={student.studentId}
                              selected={selectStudent === student.studentId}
                              onClick={() => handleMarkRecording(student)}
                            >
                              <TableCell>
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Avatar
                                    src={student.avatarUrl}
                                    sx={{ mr: 2 }}
                                  >
                                    {getInitials(`${student.firstName} ${student.surname}`)}
                                  </Avatar>
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {`${student.firstName} ${student.surname}` }
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                {`${student.mark}`}
                              </TableCell>
                              <TableCell>
                                {student.grade}
                              </TableCell>
                              <TableCell>
                                {student.comment}
                              </TableCell>
                              <TableCell>
                                {moment(student.createdAt).format('DD/MM/YYYY')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </PerfectScrollbar>
                  <TablePagination
                    component="div"
                    count={students.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                  />
                </Card>

              </Box>
            </Grid>
            <Grid
              item
              lg={4}
              md={12}
              xs={12}
            >
              <Box sx={{ pt: 3 }}>
                {studentRecord.firstName === undefined ? (
                  <Card>
                    <CardHeader
                      title="PLEASE CLICK ON STUDENT TO ADD MARKS"
                    />
                    <Divider />
                  </Card>
                ) : (<MarksForm studentName={`${studentRecord.firstName} ${studentRecord.surname}`} />) }

              </Box>
            </Grid>
          </Grid>

        </Container>
      </Box>
    </>
  );
};

export default ProgressReport;
