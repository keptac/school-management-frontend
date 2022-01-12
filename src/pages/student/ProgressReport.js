import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/student/progressReport/CustomerListResults';
import CustomerListToolbar from 'src/components/student/progressReport/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const ProgressReport = () => (
  <>
    <Helmet>
      <title>Customers | Vivid Learn</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProgressReport;
