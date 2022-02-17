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
  Typography,
  Button,
  ListItem
} from '@material-ui/core';
import {
  Home as HomeIcon,
  // BarChart as BarChartIcon,
  Lock as LockIcon,
  Edit as EditIcon,
  Users as PeopleIcon,
  DollarSign as DollarSignIcon,
  // BarChart2 as ResultsIcon,
  Link as LinkIcon,
  BookOpen as BookOpenIcon,
  Clipboard as NoticeBoardIcon
} from 'react-feather';

import NavItem from '../NavItem';

const user = {
  avatar: sessionStorage.getItem('loggedUserAvatar'),
  jobTitle: sessionStorage.getItem('loggedUserRole'),
  name: sessionStorage.getItem('name')
};

const items = [
  {
    href: '/headmaster/dashboard',
    icon: HomeIcon,
    title: 'Home'
  },
  // {
  //   href: '/headmaster/dashboard',
  //   icon: BarChartIcon,
  //   title: 'Reports'
  // },
  {
    href: '/headmaster/subjects',
    icon: EditIcon,
    title: 'Subjects'
  },
  {
    href: '/headmaster/classes',
    icon: BookOpenIcon,
    title: 'Classes'
  },
  {
    href: '/headmaster/students',
    icon: PeopleIcon,
    title: 'Students'
  },
  {
    href: '/headmaster/tuition',
    icon: DollarSignIcon,
    title: 'Fees Payments'
  },
  {
    href: '/headmaster/notices',
    icon: NoticeBoardIcon,
    title: 'Notices'
  }
  // {
  //   href: '/headmaster/dashboard',
  //   icon: ResultsIcon,
  //   title: 'Configured Grades'
  // }
];

const login = {
  href: '/staff',
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
          to="/headmaster/dashboard"
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
          <a href="http://mtgs.techvividholdings.com/" target="blank">
            <ListItem
              disableGutters
              sx={{
                display: 'flex',
                py: 0
              }}
            >
              <Button
                sx={{
                  color: 'text.secondary',
                  fontWeight: 'medium',
                  justifyContent: 'flex-start',
                  letterSpacing: 0,
                  py: 1.25,
                  textTransform: 'none',
                  width: '100%',
                  '& svg': {
                    mr: 1
                  }
                }}
              >
                {LinkIcon && (
                  <LinkIcon size="20" />
                )}
                <span>
                  HR Functions
                </span>
              </Button>
            </ListItem>
          </a>
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
