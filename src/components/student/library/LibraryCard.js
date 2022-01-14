import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Tooltip,
  Fade
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Visibility from '@material-ui/icons/Visibility';

const LibraryCard = ({ resource, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt={resource.resourceName}
          src={resource.resourcePath}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="#997b2f"
        gutterBottom
        variant="h4"
      >
        {resource.resourceName}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {resource.topicName}
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
          <AccessTimeIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Uploaded
            {resource.uploadedOn}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <a href="#">
            <Tooltip resourceName={`Open and read ${resource.resourceName}`} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
              <Visibility color="default" />
            </Tooltip>
            {/* <Typography
              color="#00796b"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              Read Now
            </Typography> */}
          </a>
        </Grid>

      </Grid>
    </Box>
  </Card>
);

LibraryCard.propTypes = {
  resource: PropTypes.object.isRequired
};

export default LibraryCard;
