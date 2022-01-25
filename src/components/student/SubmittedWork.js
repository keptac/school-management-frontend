import PropTypes from 'prop-types';
import {
  Box,

  Typography,
  TableRow,
  TableCell,
  Avatar
} from '@material-ui/core';

import moment from 'moment';
import getInitials from 'src/utils/getInitials';

const SubmittedWork = ({ student }) => (

  <TableRow
    hover
    key={student.studentId}
  >
    <TableCell>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Avatar
          src={student.avatarUrl}
          sx={{ mr: 2 }}
        >
          {getInitials(`${student.studentName}`)}
        </Avatar>

      </Box>
    </TableCell>
    <TableCell>
      <Typography
        color="textPrimary"
        variant="body1"
      >
        {`${student.assignmentTitle}` }
      </Typography>
    </TableCell>
    <TableCell>
      {`${student.mark} / ${student.total}`}
    </TableCell>
    <TableCell>
      {student.grade}
    </TableCell>
    <TableCell>
      {student.comment}
    </TableCell>
    <TableCell>
      {moment(student.dateJoined).format('DD MMM YYYY')}
    </TableCell>
  </TableRow>

);

SubmittedWork.propTypes = {
  student: PropTypes.object.isRequired
};

export default SubmittedWork;
