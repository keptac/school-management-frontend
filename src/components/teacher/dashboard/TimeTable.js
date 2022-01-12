import * as React from 'react';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Paper,

} from '@material-ui/core';
import {
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  TodayButton,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';

import { withStyles } from '@material-ui/styles';

const appointments = [
  {
    id: 1,
    title: 'Maths',
    startDate: new Date(2021, 4, 1, 8, 0),
    endDate: new Date(2021, 4, 1, 10, 0),
    rRule: 'FREQ=WEEKLY;BYDAY=TU;UNTIL=20211231',
    // exDate: '20210713T100000Z,20210727T100000Z',
  }
];

const styles = () => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 10,
  },
});

const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

class TimeTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data } = this.state;
    const { d } = Date();

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          {/* Available only for school admins */}
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <ViewState
            defaultCurrentDate={d}
          />
          <WeekView
            startDayHour={7}
            endDayHour={15}
          />
          <DayView
            startDayHour={7.5}
            endDayHour={17.5}
          />
          <MonthView />
          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          {/* Available only for school admins */}
          <EditRecurrenceMenu />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
          />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
export default TimeTable;
