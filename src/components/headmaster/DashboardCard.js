import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  // Tooltip,
  // Fade
} from '@material-ui/core';
// import Visibility from '@material-ui/icons/Visibility';

const DashboardCard = ({ resource }) => {
  // const navigate = useNavigate();
  const value = '';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '10px',
        elevation: '10px'
      }}
      // {...rest}
    >
      <CardContent>
        <Typography
          align="center"
          color="#997b2f"
          gutterBottom
          variant="h4"
        >
          {resource.name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="h3"
        >
          {`${resource.count}`}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              { `${value}`}
            </Typography>
          </Grid>
          {/* <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <a
              href="#"
              onClick={() => {
                navigate(`/school-admin/${resource.route}`, { replace: true });
              }}
            >
              <Tooltip title={`View ${resource.name} Records`} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
                <Visibility color="default" />
              </Tooltip>
            </a>
          </Grid> */}

        </Grid>
      </Box>
    </Card>
  );
};

DashboardCard.propTypes = {
  resource: PropTypes.object.isRequired
};

export default DashboardCard;
