import PropTypes from 'prop-types';
import React from 'react';

// Create Document Component
const StudentReport = ({ studentResults }) => (
  <div id="capture">
    <h4>
      {console.log(studentResults[0]) }
      {' '}
      Hello
      {' '}
    </h4>
  </div>
);

StudentReport.propTypes = {
  studentResults: PropTypes.object.isRequired
};

export default StudentReport;
