import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Avatar,
  Grid,
  Tooltip,
  Fade,
  Button
} from '@material-ui/core';
import { UploadFile } from '@material-ui/icons';
import Visibility from '@material-ui/icons/Visibility';

const AssignmentsFolderCard = ({ resource, ...rest }) => {
  const navigate = useNavigate();

  return (
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
            pb: 1
          }}
        >
          <Avatar>
            <UploadFile />
          </Avatar>
        </Box>
        <Typography
          align="center"
          color="#997b2f"
          gutterBottom
          variant="h4"
          fontSize={15}
        >
          {resource.assignmentTitle}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Due on
          {' '}
          {moment(resource.dueDatet).format('DD/MM/YYYY')}

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
          >
            <Tooltip title="View Question Paper" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
              <Visibility color="default" />
            </Tooltip>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Button
              onClick={() => {
                localStorage.setItem('recordingAssignment', JSON.stringify(resource));
                navigate('/teacher/student-submissions', { replace: true });
              }}
            >
              <Tooltip title="SUBMIT YOUR WORK" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
                <UploadFile color="default" />
              </Tooltip>
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Card>
  );
};

AssignmentsFolderCard.propTypes = {
  resource: PropTypes.object.isRequired
};

export default AssignmentsFolderCard;
