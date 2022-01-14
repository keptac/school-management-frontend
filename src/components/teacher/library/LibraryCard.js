import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Tooltip,
  Fade,
} from '@material-ui/core';
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
    <Box sx={{ p: 1 }}>
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
        />
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <a>
            <Tooltip title={`Open and read ${resource.resourceName}`} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
              <Visibility color="default" />
            </Tooltip>
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
