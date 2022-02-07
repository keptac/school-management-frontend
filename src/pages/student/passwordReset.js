import { useAlert, positions } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import AuthService from 'src/services/authServices';

const PasswordReset = () => {
  const navigate = useNavigate();
  sessionStorage.clear();
  localStorage.clear();
  const alert = useAlert();

  return (
    <>
      <Helmet>
        <title>Student Password Reset | MTGS</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container
          sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            height: '10%',
            justifyContent: 'center',
            width: '6%'
          }}
        >
          {/* <Logo /> */}
        </Container>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              oldPassword: '',
              newPassword: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              oldPassword: Yup.string().max(255).required('Old Password is required'),
              newPassword: Yup.string().required('New password is required').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
              )
            })}
            onSubmit={(values) => {
              AuthService.studentPasswordReset(values)
                .then((response) => {
                  if (response.success) {
                    sessionStorage.setItem('loggedUserAvatar', '/static/images/resources/mtgs.jpeg');
                    sessionStorage.setItem('loggedUser', values.email);
                    sessionStorage.setItem('userId', response.user.studentId);
                    sessionStorage.setItem('name', response.user.name);
                    sessionStorage.setItem('classId', response.user.classId);
                    sessionStorage.setItem('loggedUserRole', response.user.userType);
                    sessionStorage.setItem('token', response.user.token);
                    Cookies.set('userId', response.user.studentId);
                    Cookies.set('name', response.user.name);
                    Cookies.set('classId', response.user.classId);

                    alert.show(response.message, { position: positions.MIDDLE }, {
                      timeout: 2000,
                      type: 'error',
                      onOpen: () => {
                        console.log(response.message);
                      },
                    });
                    navigate('/student/dashboard', { replace: true });
                  } else {
                    alert.error(response.message, { position: positions.MIDDLE }, {
                      timeout: 2000,
                      onOpen: () => {
                        console.log(response);
                      },
                    });
                    navigate('/student/password-reset', { replace: false });
                  }
                }).catch((error) => {
                  alert.show('Oops, an error occured. Try again in a moment.', { position: positions.MIDDLE }, {
                    timeout: 2000,
                    type: 'error',
                    onOpen: () => {
                      console.log(error);
                    },
                  });
                  navigate('/student/password-reset', { replace: true });
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Students Password Reset
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.oldPassword && errors.oldPassword)}
                  fullWidth
                  helperText={touched.oldPassword && errors.oldPassword}
                  label="Old Password"
                  margin="normal"
                  name="oldPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.oldPassword}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  fullWidth
                  helperText={touched.newPassword && errors.newPassword}
                  label="New Password"
                  margin="normal"
                  name="newPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.newPassword}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Typography color="textSecondary" variant="caption" display="block" gutterBottom>
            Version 0.2.17
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default PasswordReset;
