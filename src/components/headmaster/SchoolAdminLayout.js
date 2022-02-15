import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from '../DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const SchoolAdminDashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const SchoolAdminDashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const SchoolAdminDashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const SchoolAdminDashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const SchoolAdminDashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <SchoolAdminDashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <SchoolAdminDashboardLayoutWrapper>
        <SchoolAdminDashboardLayoutContainer>
          <SchoolAdminDashboardLayoutContent>
            <Outlet />
          </SchoolAdminDashboardLayoutContent>
        </SchoolAdminDashboardLayoutContainer>
      </SchoolAdminDashboardLayoutWrapper>
    </SchoolAdminDashboardLayoutRoot>
  );
};

export default SchoolAdminDashboardLayout;
