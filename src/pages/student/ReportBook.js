import { Helmet } from 'react-helmet';
import { jsPDF as JsPdf } from 'jspdf';
import * as html2canvas from 'html2canvas';
import {
  Box,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@material-ui/core';

import React from 'react';
import StudentServices from 'src/services/student';
import SchoolAdminServices from 'src/services/schoolAdmin';

class StudentReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      marksResults: [],
      reportingMessage: 'Download End of Term Report',
      reportAvailable: true
    };
  }

  componentDidMount() {
    this.getEndOfTermSubmission();
  }

  async getEndOfTermSubmission() {
    SchoolAdminServices.getTeacherSubmissions()
      .then((response) => {
        this.setState({ marksResults: response });
        if (response.length === 0) {
          this.setState({ reportingMessage: 'End of Term reports have not yet been submitted' });
          this.setState({ reportAvailable: false });
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  downloadReports() {
    const { marksResults } = this.state;
    const userid = sessionStorage.getItem('userId');
    const studentName = sessionStorage.getItem('name');
    const classId = sessionStorage.getItem('classId');
    let count = 0;
    if (marksResults.length > 0) {
      StudentServices.getStudentReport(userid)
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
                    End Of Term Report
                </div>
                </div>  
              </header>
                <div class="limiter">
                    <div class="container-table100">
                        <div class="wrap-table100">
                            <table class="student-table">
                                <tr>
                                  <td>${userid}</td>
                                    <td>${studentName}</td>
                                    <td>${classId}</td>
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
                pdf.save(`${studentName} ${userid}.pdf`);
                document.body.removeChild(iframe);
              });
            count++;
          } else {
            console.log(`${response.error} --> ${studentName} ${userid}`);
            // Send back to backend to log failed records.
          }
          if (count === 1) {
            console.log('Processed');
          } else {
            console.log('Report Failed to generate');
          }
        });
    } else {
      this.setState({ reportingMessage: 'No reports have been submitted for processing' });
    }
  }

  render() {
    const { reportingMessage, reportAvailable } = this.state;
    return (
      <>
        <Helmet>
          <title>StudentReport</title>
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
                md={12}
                xl={9}
                xs={12}
              >
                <Card>
                  <CardHeader
                    title="Progress Report"
                  />
                  <Divider />
                  <CardContent>

                    {!reportAvailable ? reportingMessage : (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          this.downloadReports();
                        }}
                      >
                        {reportingMessage}
                      </Button>
                    )}
                  </CardContent>

                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}
export default StudentReport;
