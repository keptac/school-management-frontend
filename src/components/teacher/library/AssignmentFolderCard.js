import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
// import Visibility from '@material-ui/icons/Visibility';

const AssignmentsFolderCard = ({ resource, ...rest }) => (
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
        {resource.assignmentTitle}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {moment(resource.dueDatet).format('DD/MM/YYYY')}

      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
  </Card>
);

AssignmentsFolderCard.propTypes = {
  resource: PropTypes.object.isRequired
};

export default AssignmentsFolderCard;
