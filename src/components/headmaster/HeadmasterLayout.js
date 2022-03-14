import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from '../DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const HeadmasterDashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const HeadmasterDashboardLayoutWrapper = experimentalStyled('div')(
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

const HeadmasterDashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const HeadmasterDashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const HeadmasterDashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <HeadmasterDashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <HeadmasterDashboardLayoutWrapper>
        <HeadmasterDashboardLayoutContainer>
          <HeadmasterDashboardLayoutContent>
            <Outlet />
          </HeadmasterDashboardLayoutContent>
        </HeadmasterDashboardLayoutContainer>
      </HeadmasterDashboardLayoutWrapper>
    </HeadmasterDashboardLayoutRoot>
  );
};

export default HeadmasterDashboardLayout;
