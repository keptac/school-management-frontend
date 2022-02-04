import { useAlert, positions } from 'react-alert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import AuthService from 'src/services/authServices';

const Login = () => {
  const navigate = useNavigate();
  sessionStorage.clear();
  localStorage.clear();
  const alert = useAlert();

  return (
    <>
      <Helmet>
        <title>Student Login | MTGS</title>
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
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              AuthService.studentLogin(values)
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

                    if (response.user.userType === 'STUDENT') {
                      navigate('/student/dashboard', { replace: true });
                    } else {
                      alert.error('Account not setup correctly. Please contact Admin', { position: positions.MIDDLE }, {
                        timeout: 2000,
                        onOpen: () => {
                          console.log('hey');
                        },
                      });
                      navigate('/login', { replace: false });
                    }
                  } else {
                    alert.error(response.message, { position: positions.MIDDLE }, {
                      timeout: 2000,
                      onOpen: () => {
                        console.log(response);
                      },
                    });
                    navigate('/login', { replace: false });
                  }
                }).catch((error) => {
                  alert.show('Oops, an error occured. Try again in a moment.', { position: positions.MIDDLE }, {
                    timeout: 2000,
                    type: 'error',
                    onOpen: () => {
                      console.log(error);
                    },
                    onClose: () => {
                      navigate('/', { replace: true });
                    }
                  });
                  navigate('/', { replace: true });
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
                    Students Portal
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in
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
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
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
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?
                  {' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Please visit the school adminstation
                  </Link>
                </Typography>
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

export default Login;
