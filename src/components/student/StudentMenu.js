import { v4 as uuid } from 'uuid';

import {
  Card,
  CardHeader,
  Divider,

  List,
  // ListItem,
  // ListItemAvatar,
  // ListItemText
} from '@material-ui/core';

import {
  BookOpen as ResourcesIcon
} from 'react-feather';

import NavItem from '../NavItem';

const menuItems = [
  {
    id: uuid(),
    name: 'Learning Materials',
    page: '/student/subject',
    imageUrl: ResourcesIcon,
  },
  {
    id: uuid(),
    name: 'Class Work',
    page: '/student/class-work',
    imageUrl: ResourcesIcon,
  }
];

const MenuBoard = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${menuItems.length} in total`}
      title="Subject Menu"
    />
    <Divider />
    <List>
      {menuItems.map((item) => (
        <NavItem
          href={item.page}
          key={item.name}
          title={item.name}
          icon={item.imageUrl}
        />
        // <ListItem
        //   divider={i < menuItems.length - 1}
        //   key={item.id}
        // >
        //   <ListItemAvatar>
        //     <img
        //       alt={item.name}
        //       src={item.imageUrl}
        //       style={{
        //         height: 48,
        //         width: 48
        //       }}
        //     />
        //   </ListItemAvatar>
        //   <ListItemText
        //     primary={item.name}
        //   />
        // </ListItem>
      ))}
    </List>
    <Divider />
  </Card>
);

export default MenuBoard;
