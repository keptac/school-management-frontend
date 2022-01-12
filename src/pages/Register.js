import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAlert, positions } from 'react-alert';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
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

const Register = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Register | Vivid Learn</title>
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
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              surname: '',
              password: '',
              idNumber: '',
              userType: 'TEACHER',
              staffId: `TCM${String(Math.floor(100000 + Math.random() * 900000)).substring(0, 3)}`
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                surname: Yup.string().max(255).required('Last name is required'),
                idNumber: Yup.string().max(255).required('ID Number is required'),
                password: Yup.string().max(255).required('password is required'),
              })
            }
            onSubmit={(values) => {
              AuthService.register(values)
                .then((response) => {
                  console.log(response);
                  if (response.success) {
                    alert.success(response.message, { position: positions.MIDDLE }, {
                      timeout: 2000,
                      onOpen: () => {
                        console.log(response);
                      },
                      onClose: () => {
                        navigate('/login', { replace: true });
                      }
                    });
                  } else {
                    alert.error(response.message, { position: positions.MIDDLE }, {
                      timeout: 2000,
                      onOpen: () => {
                        console.log(response.error);
                      },
                      onClose: () => {
                        navigate('/register', { replace: true });
                      }
                    });
                  }
                }).catch((error) => {
                  alert.error('An error occured. Please contact Admin', { position: positions.MIDDLE }, {
                    timeout: 2000,
                    onOpen: () => {
                      console.log(error);
                    },
                    onClose: () => {
                      navigate('/', { replace: true });
                    }
                  });
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
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.surname && errors.surname)}
                  fullWidth
                  helperText={touched.surname && errors.surname}
                  label="Last name"
                  margin="normal"
                  name="surname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.surname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.idNumber && errors.idNumber)}
                  fullWidth
                  helperText={touched.idNumber && errors.idNumber}
                  label="ID Number"
                  margin="normal"
                  name="idNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.idNumber}
                  variant="outlined"
                />
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
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
