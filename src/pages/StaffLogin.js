import { useAlert, positions } from 'react-alert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import AuthService from 'src/services/authServices';
// import Logo from '../components/Logo';

const StaffLogin = () => {
  const navigate = useNavigate();
  sessionStorage.clear();
  localStorage.clear();
  const alert = useAlert();

  return (
    <>
      <Helmet>
        <title>Staff Login | MTGS</title>
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
              AuthService.login(values)
                .then((response) => {
                  if (response.success) {
                    sessionStorage.setItem('loggedUserAvatar', '/static/images/resources/mtgs.jpeg');
                    sessionStorage.setItem('loggedUser', values.email);
                    sessionStorage.setItem('userId', response.user.staffId);
                    sessionStorage.setItem('name', response.user.name);
                    sessionStorage.setItem('loggedUserRole', response.user.userType);
                    sessionStorage.setItem('token', response.user.token);
                    sessionStorage.setItem('station', response.user.station);
                    Cookies.set('userId', response.user.studentId);
                    Cookies.set('name', response.user.name);

                    if (response.user.userType === 'TEACHER') {
                      navigate('/teacher/dashboard', { replace: true });
                    } else if (response.user.userType === 'ADMIN') {
                      navigate('/school-admin/dashboard', { replace: true });
                    } else if (response.user.userType === 'HEAD') {
                      navigate('/headmaster/dashboard', { replace: true });
                    } else {
                      alert.error('Account not setup correctly. Please contact Admin', { position: positions.MIDDLE }, {
                        timeout: 2000,
                        onOpen: () => {
                          console.log('hey');
                        },
                        onClose: () => {
                          navigate('/', { replace: true });
                        }
                      });
                    }
                  } else {
                    alert.error(response.message, { position: positions.MIDDLE }, {
                      timeout: 2000,
                      onOpen: () => {
                        console.log(response);
                      },
                      onClose: () => {
                        navigate('/', { replace: true });
                      }
                    });
                    navigate('/', { replace: true });
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
                    Mother Touch Group of Schools
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
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
          <Typography color="textSecondary" variant="caption" display="block" gutterBottom>
            version 0.2.20
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default StaffLogin;
