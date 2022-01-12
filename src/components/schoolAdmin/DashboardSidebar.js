import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  Home as HomeIcon,
  // BarChart as BarChartIcon,
  Lock as LockIcon,
  Edit as EditIcon,
  Users as PeopleIcon,
  // BarChart2 as ResultsIcon,
  BookOpen as BookOpenIcon,
  Clipboard as NoticeBoardIcon
} from 'react-feather';

import NavItem from '../NavItem';

const user = {
  avatar: sessionStorage.getItem('loggedUserAvatar'),
  jobTitle: sessionStorage.getItem('loggedUserRole'),
  name: sessionStorage.getItem('loggedUser')
};

const items = [
  {
    href: '/school-admin/dashboard',
    icon: HomeIcon,
    title: 'Home'
  },
  // {
  //   href: '/school-admin/dashboard',
  //   icon: BarChartIcon,
  //   title: 'Reports'
  // },
  {
    href: '/school-admin/subjects',
    icon: EditIcon,
    title: 'Subjects'
  },
  {
    href: '/school-admin/classes',
    icon: BookOpenIcon,
    title: 'Classes'
  },
  {
    href: '/school-admin/students',
    icon: PeopleIcon,
    title: 'Students'
  },
  {
    href: '/school-admin/notices',
    icon: NoticeBoardIcon,
    title: 'Notices'
  },
  // {
  //   href: '/school-admin/dashboard',
  //   icon: ResultsIcon,
  //   title: 'Configured Grades'
  // }
];

const login = {
  href: '/login',
  icon: LockIcon,
  title: 'Logout'
};

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/school-admin/dashboard"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <br />
          <hr />
          <br />
          <h4>
            Quick Access
          </h4>
          <br />
          <NavItem
            href={login.href}
            key={login.title}
            title={login.title}
            icon={login.icon}
          />
        </List>
      </Box>

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
