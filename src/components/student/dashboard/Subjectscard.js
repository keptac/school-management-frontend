import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Tooltip,
  Fade,
  Button
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';

const Subjectscard = ({ subjectData, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '10px',
        elevation: '10px'
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
            alt={subjectData.subjectName}
            src="src/media.png"
            variant="round"
            sx={{ width: 66, height: 66 }}
          />
        </Box>
        <Typography
          align="center"
          // color="#997b2f"
          gutterBottom
          variant="h5"
        >
          {`${subjectData.subjectName} (${subjectData.subjectCode})`}
        </Typography>
        <Typography
          align="center"
          color="primary"
          variant="body1"
        >
          {`Form Class: ${subjectData.className}`}
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
            {/* <PeopleOutline color="action" /> */}
            <Typography
              color="secondaey"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              { `${subjectData.teacherName} `}
            </Typography>
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
                localStorage.setItem('subjectData', JSON.stringify(subjectData));
                navigate('/student/subject', { replace: true });
              }}
            >
              <Tooltip title={`View ${subjectData.subjectName}`} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} aria-label="add">
                <Visibility color="inherit" align="right" />
              </Tooltip>

            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

Subjectscard.propTypes = {
  subjectData: PropTypes.object.isRequired
};

export default Subjectscard;
