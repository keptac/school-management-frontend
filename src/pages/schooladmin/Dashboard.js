/* eslint-disable no-alert */
import { Helmet } from 'react-helmet';
import { jsPDF as JsPdf } from 'jspdf';
import * as html2canvas from 'html2canvas';

// import { withAlert, positions } from 'react-alert';

import {
  Box,
  Container,
  CardContent,
  Card,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Badge
} from '@material-ui/core';
import moment from 'moment';
import NoticeBoard from 'src/components/NoticeBoard';
import DashboardCard from 'src/components/schoolAdmin/DashboardCard';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

// import StudentReport from 'src/components/reportTemplate';
// import Logo from 'src/components/Logo';
import SchoolAdminServices from '../../services/schoolAdmin';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: [],
      reportData: [],
      downloaded: false,
      marksResults: [],
      students: []
    };
  }

  componentDidMount() {
    this.getDashData();
    this.getTeacherSubmissions();
    this.getStudents();
  }

  async getTeacherSubmissions() {
    SchoolAdminServices.getTeacherSubmissions()
      .then((response) => {
        this.setState({ marksResults: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  async getStudents() {
    SchoolAdminServices.getAllStudents()
      .then((response) => {
        this.setState({ students: response });
      }).catch((error) => {
        console.log(error);
      });
  }

  getDashData() {
    const { subjectData } = this.state;

    SchoolAdminServices.getAllClasses()
      .then((response) => {
        subjectData.push({ name: 'Classes', count: response.length });
        this.setState({ subjectData });
      });
    SchoolAdminServices.getAllSubjects()
      .then((response) => {
        subjectData.push({ name: 'Subjects', count: response.length });
        this.setState({ subjectData });
      });
    SchoolAdminServices.getAllTeachers()
      .then((response) => {
        subjectData.push({ name: 'Teachers', count: response.length });
        this.setState({ subjectData });
      });
  }

  downloadReports() {
    const { marksResults, students } = this.state;
    let count = 0;
    let failedCount = 0;
    if (marksResults.length > 0) {
      students.forEach((student) => {
        SchoolAdminServices.getStudentReport(student.studentId)
          .then((response) => {
            const htmlStringTop = `<style>
            .report-border {
                margin: 15px;
                width:1300px; 
                padding:20px; 
                text-align:center; 
                border: 3px solid #b9941bdc;
                border-radius: 5px;
                margin-right: 20px;
            }
            .site-header::after {
                content: "";
                display: table;
                clear: both;
            }
            
            .site-identity {
                float: left;
            }
            
            .site-identity h1 {
                font-size: 1.5em;
                margin: .9em 0 .3em 0;
                display: inline-block;
            }
            
            .site-identity img {
                max-width: 70px;
                float: left;
                margin: 0 10px 0 0;
            }
        
            .site-identity2 img{
                width: 100px;
            }
        
            .site-identity2 h1{
                margin-top: 10px;
                font-size: 1.5em;
            }
        
            #weekly-report{
                font-weight: bolder;
                font-size: 18px;
                margin-top: 15px;
                color: rgb(44, 44, 44);
            }
        
        
            @font-face {
            font-family: OpenSans-Regular;
            src: url('../fonts/OpenSans/OpenSans-Regular.ttf'); 
            }
        
            /*//////////////////////////////////////////////////////////////////
            [ RESTYLE TAG ]*/
            * {
                margin: 0px; 
                padding: 0px; 
                box-sizing: border-box;
            }
        
            .limiter {
            width: 100%;
            margin: 0 auto;
            }
        
            .container-table100 {
            width: 100%;
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            padding: 33px 10px;
            }
        
            .wrap-table100 {
            width: 1170px;
            }
        
            table {
            border-spacing: 1;
            border-collapse: collapse;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            width: 100%;
            margin: 0 auto;
            position: relative;
            }
            table * {
            position: relative;
            }
            table td, table th {
            padding-left: 8px;
            padding-right: 8px;
            }
            table thead tr {
            height: 60px;
            background: #0a246e;
            }
            table tbody tr {
            height: 60px;
            }
            table tbody tr:last-child {
            border: 0;
            }
            table td, table th {
            text-align: left;
            }
            table td.l, table th.l {
            text-align: right;
            }
            table td.c, table th.c {
            text-align: center;
            }
            table td.r, table th.r {
            text-align: center;
            }
        
            .table100-head th{
            font-family: OpenSans-Regular;
            font-size: 20px;
            color: #fff;
            line-height: 1.6;
            font-weight: unset;
            }
        
            tbody tr:nth-child(even) {
              background-color: #b8b7b7;
              }
          
            tbody tr {
            background-color: #d3d3d3;
            font-family: OpenSans-Regular;
            font-size: 18px;
            color: black;
            line-height: 1.4;
            font-weight: unset;
            }
        
            tbody tr:hover {
            color: black;
            background-color: #f5f5f5;
            cursor: pointer;
            }
        
            .column1 {
            width: 190px;
            padding-left: 40px;
            }
        
            .column2 {
            width: 80px;
            }
        
            .column3 {
            width: 80px;
            }
        
            .column4 {
            width: 370px;
            text-align: left;
            }
        
            .column5 {
            width: 170px;
            text-align: right;
            }
        
            .column6 {
            width: 222px;
            text-align: right;
            padding-right: 62px;
            }
      
            .student-table{
                align-items: left; 
                justify-content: left;
                width: 500px;
                margin-left:0px;
                margin-bottom: 2px;
                background-color: #b9941bdc;
            }
            .student-table td{
                color: #fff;
                padding-left:20px;
                font-size: 22px;
            }
        
            .student-table tr:hover{
                background-color: #b9941bdc;
            }
            .student-table tr{
              background-color: #b9941bdc;
          }
        </style>
        
       <card> <div class="report-border">
            <header>
                <!-- <div class="site-identity"> -->
                <div class="site-identity2">
                  <a href="#"><img src="/static/mtgs.jpeg" alt="Site Name" /></a>
                  <h1>MOTHER TOUCH SCHOOLS</h1>
                  <div id="weekly-report">
                    Weekly Report
                </div>
                </div>  
              </header>
                <div class="limiter">
                    <div class="container-table100">
                        <div class="wrap-table100">
                            <table class="student-table">
                                <tr>
                                  <td>${student.studentId}</td>
                                    <td>${student.surname} ${student.name}</td>
                                    <td>${student.classId}</td>
                                    <td></td>
                                </tr>
                            </table>
                            <div class="table100">
                                <table>
                                    <thead>
                                        <tr class="table100-head">
                                            <th class="column1">Subject</th>
                                            <th class="column2">Mark</th>
                                            <th class="column3">Grade</th>
                                            <th class="column4">Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
            const htmlStringBottom = '</tbody></table></div></div></div></div></div><card/>';
            let htmlStringMiddle = '';

            if (response.success) {
              response.marks.forEach((mark) => {
                htmlStringMiddle += `<tr>
                                        <td class="column1">${mark.subject}</td>
                                        <td class="column2">${mark.mark}</td>
                                        <td class="column3">${mark.grade}</td>
                                        <td class="column4">${mark.comment}</td>
                                      </tr>`;
              });
              const iframe = document.createElement('iframe');
              document.body.appendChild(iframe);
              const iframedoc = iframe.contentDocument || iframe.contentWindow.document;
              iframedoc.body.innerHTML = htmlStringTop + htmlStringMiddle + htmlStringBottom;
              html2canvas(iframedoc.body)
                .then((canvas) => {
                  const imgData = canvas.toDataURL('image/png');
                  const pdf = JsPdf('l');

                  const imgProps = pdf.getImageProperties(imgData);
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                  pdf.save(`${student.surname} ${student.name} ${student.studentId}.pdf`);
                  document.body.removeChild(iframe);
                });
            } else {
              failedCount++;
              console.log(`${response.error} --> ${student.firstName} ${student.surname} ${student.studentid}`);
              // Send back to backend to log failed records.
            }
            if (count + failedCount >= students.length) {
              console.log('Processed');
              this.setState({ downloaded: true });
              alert(`${count} Reports generated successfully. Kindly check your downloads folder. \n\n${failedCount} Failed`);
            }
          });
        count++;
      });
    } else {
      alert('No reports have been submitted for processing. Kindly request teachers to submit reports');
    }
  }

  render() {
    const {
      subjectData, reportData, downloaded
    } = this.state;
    return (
      <>
        <Helmet>
          <title>Admin Dashboard</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Grid
              container
              spacing={3}
              sx={{ marginTop: '0.1%' }}
            >
              <Grid
                item
                lg={8}
                md={8}
                xl={9}
                xs={12}
              >

                <Grid
                  container
                  spacing={3}
                >
                  {subjectData.map((resource) => (
                    <Grid
                      item
                      key={resource.id}
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      <DashboardCard resource={resource} />
                    </Grid>

                  ))}
                  <Grid
                    item
                    lg={12}
                    md={6}
                    xs={12}
                  >
                    <Card>
                      <CardContent>
                        <Grid
                          container
                        >
                          <Grid
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-start'
                              }}
                            >
                              <Button
                                sx={{ mx: 1 }}
                              >
                                End of term progress reports not yet ready
                              </Button>
                            </Box>
                          </Grid>
                          <Grid
                            lg={4}
                            md={12}
                            xl={9}
                            xs={12}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                              }}
                            >
                              {/* <StudentReport studentResults={students} /> */}
                              {downloaded
                                ? (
                                  <Button
                                    color="primary"
                                    variant="contained"
                                  >
                                    Download Successful Check Downloads
                                  </Button>
                                )
                                : (
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                      this.downloadReports();
                                    }}
                                  >
                                    Generate Reports
                                  </Button>
                                )}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                  >
                    <Card>
                      <CardContent>
                        <PerfectScrollbar>
                          <Box sx={{ minWidth: 600 }}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    Class
                                  </TableCell>
                                  <TableCell>
                                    Subject
                                  </TableCell>
                                  <TableCell>
                                    Teacher Name
                                  </TableCell>
                                  <TableCell>
                                    Weekending
                                  </TableCell>
                                  <TableCell>
                                    Report Status
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {reportData.map((reportRecord) => (
                                  <TableRow
                                    hover
                                    key={reportRecord.classId}
                                  >
                                    <TableCell>
                                      <Box
                                        sx={{
                                          alignItems: 'center',
                                          display: 'flex'
                                        }}
                                      >
                                        <Typography
                                          color="textPrimary"
                                          variant="body1"
                                        >
                                          {`${reportRecord.className}` }
                                        </Typography>
                                      </Box>
                                    </TableCell>
                                    <TableCell>
                                      {`${reportRecord.subject}`}
                                    </TableCell>
                                    <TableCell>
                                      {`${reportRecord.teacherName}`}
                                    </TableCell>

                                    <TableCell>
                                      {moment(reportRecord.createdAt).format('DD/MM/YYYY')}
                                    </TableCell>
                                    <TableCell
                                      align="enter"
                                    >
                                      stat
                                      <Badge badgeContent={reportRecord.status} color={reportRecord.status === 'Submitted' ? 'success' : 'warning'} />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </PerfectScrollbar>
                      </CardContent>
                    </Card>
                  </Grid>

                </Grid>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                xl={3}
                xs={12}
              >
                <NoticeBoard sx={{ height: '100%' }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}
export default AdminDashboard;
