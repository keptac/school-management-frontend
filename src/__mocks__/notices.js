import { v4 as uuid } from 'uuid';
import moment from 'moment';

export default [
  {
    id: uuid(),
    noticeTitle: 'General',
    imageUrl: '/static/images/resources/mtgs.jpeg',
    updatedAt: moment().toString('dd-MM-YYYY'),
    noticeBody: 'Schools will be open during th metioned times'
  }
];
