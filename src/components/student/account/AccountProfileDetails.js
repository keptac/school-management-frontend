/* eslint-disable no-alert */
/* eslint-disable prefer-const */
import React from 'react';
import {
  Box, Grid,
  Card,

  CardContent,
  CardHeader,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';

import Moment from 'moment';

import StudentServices from 'src/services/student';

class AccountProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      surname: null,
      dob: null,
      phoneNumber: null,
      emailAddress: null,
      idNumber: null,
      studentId: null,

      address: null,
      gender: null,
      guardianName: null,
      relationshipToGuardian: null,
      disability: null
    };
  }

  componentDidMount() {
    this.getPersonalRecord();
  }

  handleUpdate() {
    const {
      studentId,
      phoneNumber,
      emailAddress,
      address,
      gender,
      guardianName,
      relationshipToGuardian,
      disability
    } = this.state;

    const data = {
      studentId,
      phoneNumber,
      emailAddress,
      address,
      gender,
      guardianName,
      relationshipToGuardian,
      disability
    };

    StudentServices.updateStudentRecord(data)
      .then((response) => {
        alert(response.message);
        window.location.reload(false);
      }).catch((error) => {
        console.log(error);
        alert('An error occured');
        window.location.reload(false);
      });
  }

  async getPersonalRecord() {
    const userId = sessionStorage.getItem('userId');
    StudentServices.getStudentRecord(userId)
      .then((response) => {
        this.setState({
          studentId: response[0].studentId,
          name: response[0].name,
          surname: response[0].surname,
          dob: response[0].dob,
          phoneNumber: response[0].phoneNumber,
          emailAddress: response[0].emailAddress,
          idNumber: response[0].idNumber,
          address: response[0].address,
          gender: response[0].gender,
          guardianName: response[0].guardianName,
          relationshipToGuardian: response[0].relationshipToGuardian,
          disability: response[0].disability
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      name, surname, dob, phoneNumber, emailAddress, idNumber, studentId, address,
      gender,
      guardianName,
      relationshipToGuardian,
      disability
    } = this.state;

    return (
      <form
        autoComplete="on"
        noValidate
      >
        <Card>
          <CardHeader
            title="Edit Student Details"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  name="studentId"
                  value={studentId}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  name="name"
                  value={name}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  name="surname"
                  value={surname}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  name="idNumber"
                  value={idNumber}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  // label="ID Number"
                  name="dob"
                  value={`Date of Birth: ${Moment(dob).format('DD/MM/YYYY')}`}
                  variant="outlined"
                  disabled
                />
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  onChange={(e) => this.setState({ gender: e.target.value })}
                  required
                  value={gender}
                  variant="outlined"
                />
              </Grid>

            </Grid>

            <Grid
              container
              spacing={1}
              pt={3}
            >
              <CardHeader
                title="Contact Details"
              />
            </Grid>
            <Grid
              container
              spacing={1}
              pt={1}
            >
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  value={phoneNumber}
                  variant="outlined"
                  autofocus="true"
                />
              </Grid>
              <Grid
                item
                md={5}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="emailAddress"
                  type="email"
                  onChange={(e) => this.setState({ emailAddress: e.target.value })}
                  value={emailAddress}
                  variant="outlined"
                  // autofocus="true"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Physical Address"
                  name="address"
                  onChange={(e) => this.setState({ address: e.target.value })}
                  required
                  value={address}
                  variant="outlined"
                />
              </Grid>

            </Grid>
            <Grid
              container
              spacing={1}
              pt={3}
            >
              <CardHeader
                title="Guardian Information"
              />
            </Grid>
            <Grid
              container
              spacing={1}
              pt={1}
            >
              <Grid
                item
                md={5}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Name of Gurdian/Parent"
                  name="guardianName"
                  onChange={(e) => this.setState({ guardianName: e.target.value })}
                  required
                  value={guardianName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={5}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Relationship to Gurdian"
                  name="relationshipToGuardian"
                  onChange={(e) => this.setState({ relationshipToGuardian: e.target.value })}
                  required
                  value={relationshipToGuardian}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              pt={3}
            >
              <CardHeader
                title="Other Information"
              />
            </Grid>
            <Grid
              container
              spacing={1}
              pt={1}
            >
              <Grid
                item
                md={5}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Disability/Special Needs"
                  name="disability"
                  onChange={(e) => this.setState({ disability: e.target.value })}
                  value={disability}
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
            <Box sx={{ p: 1 }} />
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.handleUpdate()}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </form>
    );
  }
}

export default AccountProfileDetails;
