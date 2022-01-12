/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';

class Subjectscard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // browseTo: {}
    };
  }

  componentDidMount() {
    // const { _subjectData } = this.props;
    this.setState({
      // browseTo: {
      //   pathname: '/teacher/subject',
      //   subjectDetails: _subjectData
      // }
    });
  }

  render() {
    const { subjectData } = this.props;
    return (
      <Card
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                {subjectData.subjectCode}
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {subjectData.name}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: subjectData.color,
                  height: 56,
                  width: 56
                }}
              >
                <Link
                  to={{
                    pathname: '/teacher/subject',
                    state: subjectData
                  }}
                >
                  <LaunchIcon />
                </Link>
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default Subjectscard;
