/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

class TotalProfit extends React.Component {
  render() {
    return (
      <Card>
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
                TOTAL PROFIT
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                $23,200
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: blue[900],
                  height: 56,
                  width: 56
                }}
              >
                <AttachMoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default TotalProfit;
