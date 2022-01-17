import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';

const ReportBook = (props) => (
  <Card {...props}>
    <CardHeader
      title="Progress Report"
    />
    <Divider />
    <CardContent>
      End of Term reports have not yet been submitted
    </CardContent>

  </Card>
);

export default ReportBook;
