import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

import React from 'react';
import AdminServices from '../services/schoolAdmin';

class NoticeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: []
    };
  }

  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    // const { classId } = JSON.parse(sessionStorage.getItem('classId'));
    // const { userType } = JSON.parse(sessionStorage.getItem('loggedUserRole'));
    // const { notices } = this.state;

    AdminServices.getAllNotices()
      .then((response) => {
        this.setState({ notices: response });
      });

    // AdminServices.getNoticesByTaget(classId)
    //   .then((response) => {
    //     this.setState({ notices: response });
    //   });

    // AdminServices.getNoticesByTaget(userType)
    //   .then((response) => {
    //     this.setState({ notices: notices.concat(response) });
    //   });
  }

  render() {
    const { notices } = this.state;
    return (
      <Card>
        <CardHeader
          subtitle={`${notices.length} in total`}
          title="Notice Board"
        />
        <Divider />
        <List>
          {notices.map((announcement, i) => (
            <ListItem
              divider={i < notices.length - 1}
              key={announcement.id}
            >
              <ListItemAvatar>
                <img
                  alt={announcement.noticeTitle}
                  src={announcement.imageUrl}
                  style={{
                    height: 48,
                    width: 48
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={announcement.noticeTitle}
                secondary={`Updated ${announcement.noticeBody}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Card>
    );
  }
}

export default NoticeBoard;
