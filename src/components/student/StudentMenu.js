import { v4 as uuid } from 'uuid';

import {
  Card,
  CardHeader,
  Divider,

  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

const menuItems = [
  {
    id: uuid(),
    name: 'Resources',
    imageUrl: '/static/images/resources/mtgs.png',
  },
  {
    id: uuid(),
    name: 'Homeworks',
    imageUrl: '/static/images/resources/mtgs.png',
  },
  {
    id: uuid(),
    name: 'Tests',
    imageUrl: '/static/images/resources/mtgs.png',
  }
];

const MenuBoard = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${menuItems.length} in total`}
      title="Class Menu"
    />
    <Divider />
    <List>
      {menuItems.map((item, i) => (
        <ListItem
          divider={i < menuItems.length - 1}
          key={item.id}
        >
          <ListItemAvatar>
            <img
              alt={item.name}
              src={item.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
          />
        </ListItem>
      ))}
    </List>
    <Divider />
  </Card>
);

export default MenuBoard;
