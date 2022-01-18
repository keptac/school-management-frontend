/* eslint-disable prefer-const */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert, positions } from 'react-alert';

import {
  Box, Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Button,
  InputLabel,
  Select,
  FormControl,
  MenuItem
} from '@material-ui/core';

import SchoolAdminServices from '../../services/schoolAdmin';

const AddClassForm = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    className: null,
  });

  const [station, setStation] = useState('');

  const handleChangeStation = (event) => {
    setStation(event.target.value);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    let a = Math.floor(100000 + Math.random() * 900000);
    const classIdRef = `CLC${String(a).substring(0, 3)}`;
    const data = {
      className: values.className,
      classId: classIdRef,
      station
    };

    SchoolAdminServices.postClasses(data)
      .then((response) => {
        navigate('/school-admin/dashboard', { replace: true });
        navigate('/school-admin/classes', { replace: true });
        alert.info(response.message, { position: positions.MIDDLE }, {
          timeout: 2000,
        });
      }).catch((error) => {
        alert.error('Snap, an error occured. Please try again later.', { position: positions.MIDDLE }, {
          timeout: 2000,
          onOpen: () => {
            console.log(error);
          },

        });
      });
  };

  return (
    <Grid
      item
      lg={5}
      md={12}
      xs={12}
    >
      <Box sx={{ pt: 3 }}>
        <form
          autoComplete="off"
          noValidate
        >
          <Card>
            <CardHeader
              title="Add New Class"
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
                    onChange={handleChange}
                    required
                    value={values.className}
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
                      onChange={handleChangeStation}
                      required
                      variant="outlined"
                    >
                      <MenuItem value="PRIMARY">JUNIOR SCHOOL</MenuItem>
                      <MenuItem value="SENIOR">SENIOR SCHOOL</MenuItem>
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
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add Class
              </Button>
            </Box>
          </Card>
        </form>

      </Box>
    </Grid>
  );
};

export default AddClassForm;
