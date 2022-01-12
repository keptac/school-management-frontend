/* eslint-disable no-alert */
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
  CardContent,
  CardHeader,
  TextField,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AdminServices from 'src/services/schoolAdmin';

class PaymentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      limit: 10,
      page: 0,
      term: 1,
      amount: null,
      narration: null,
      studentId: null
    };
  }

  componentDidMount() {
    this.getAllPayments();
  }

  handleChangeTerm(selectedClass) {
    this.setState({ term: selectedClass });
  }

  handleLimitChange(event) {
    this.setState({ limit: event.target.value });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  handleChangeAdd() {
    this.setState({ addPaymentForm: true });
  }

  handleSubmit() {
    const {
      term,
      amount,
      narration,
      studentId,
    } = this.state;

    const a = Math.floor(10000000 + Math.random() * 90000000);
    const paymentReference = `PAY${String(a).substring(0, 7)}`;

    const data = {
      term,
      amount,
      narration,
      studentId,
      reference: paymentReference,
    };

    AdminServices.postNewPayment(data)
      .then((response) => {
        alert(response.message);
      }).catch((error) => {
        console.log(error);
      });
  }

  async getAllPayments() {
    AdminServices.getAllPayments()
      .then((response) => {
        this.setState({ payments: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      payments, limit, page, term, addPaymentForm, amount, narration, studentId
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Classes | Vivid Learn</title>
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
                                Student ID
                              </TableCell>
                              <TableCell>
                                Student Name
                              </TableCell>
                              <TableCell>
                                Class
                              </TableCell>
                              <TableCell>
                                Amount
                              </TableCell>
                              <TableCell>
                                Narration
                              </TableCell>
                              <TableCell>
                                Term
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {payments.slice(0, limit).map((payment) => (
                              <TableRow
                                hover
                                key={payment.studentId}
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
                                      {payment.studentId}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {`${payment.surname} ${payment.name}` }
                                </TableCell>
                                <TableCell>
                                  {payment.classId}
                                </TableCell>
                                <TableCell>
                                  {payment.amount}
                                </TableCell>
                                <TableCell>
                                  {payment.narration}
                                </TableCell>
                                <TableCell>
                                  {payment.term}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>

                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={payments.length}
                      onPageChange={() => this.handlePageChange}
                      onRowsPerPageChange={() => this.handleLimitChange}
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
                  {addPaymentForm ? (
                    <form
                      autoComplete="off"
                      noValidate
                    >
                      <Card>
                        <CardHeader
                          title="Add New Payment"
                        />
                        <Divider />
                        <CardContent>
                          <Grid
                            container
                            spacing={1}
                          >
                            <Grid
                              item
                              md={8}
                              xs={12}
                            >
                              <TextField
                                fullWidth
                                label="Student ID Number"
                                name="studentId"
                                onChange={(e) => this.setState({ studentId: e.target.value })}
                                required
                                value={studentId}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={4}
                              xs={12}
                            >
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Term</InputLabel>
                                <Select
                                  value={term}
                                  label="term"
                                  onChange={() => this.handleChangeTerm}
                                  required
                                  variant="outlined"
                                >
                                  <MenuItem value="1">Term 1</MenuItem>
                                  <MenuItem value="2">Term 2</MenuItem>
                                  <MenuItem value="3">Term 3</MenuItem>
                                  <MenuItem value="4">Vacation</MenuItem>
                                </Select>
                              </FormControl>

                            </Grid>

                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <TextField
                                fullWidth
                                label="Amount"
                                name="amount"
                                type="number"
                                onChange={(e) => this.setState({ amount: e.target.value })}
                                required
                                value={amount}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <TextField
                                fullWidth
                                label="Narration"
                                name="narration"
                                type="email"
                                onChange={(e) => this.setState({ narration: e.target.value })}
                                required
                                value={narration}
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
                            color="primary"
                            variant="contained"
                            onClick={() => this.handleSubmit()}
                          >
                            Add New Payment
                          </Button>
                        </Box>
                      </Card>
                    </form>
                  )
                    : (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.handleChangeAdd()}
                      >
                        Add Payment
                      </Button>
                    )}
                </Box>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </>
    );
  }
}

export default PaymentClass;
