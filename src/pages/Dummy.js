import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  CardContent,
  Card,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import React from 'react';
import StudentServices from 'src/services/student';

class Dummy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyTestData: {},
      questionsList: [],
      questionIndex: 0,
      studentAnswer: '',
      finalSubmit: false
    };
  }

  componentDidMount() {
    this.getDashData();
  }

  handleChange(event) {
    this.setState({ studentAnswer: event.target.value });
  }

  handleSubmitNext() {
    const { questionIndex, questionsList } = this.state;
    if (questionIndex < questionsList.length) {
      this.setState({ questionIndex: questionIndex + 1 });
      if (questionIndex + 1 === questionsList.length - 1) {
        this.setState({ finalSubmit: true });
      }
    } else {
      this.setState({ finalSubmit: true });
    }
  }

  async getDashData() {
    await StudentServices.getAllDummyTests('SUB124', 'TEST1')
      .then(async (response) => {
        this.setState({ dummyTestData: response[0], questionsList: response[0].questionsList });
      });
  }

  render() {
    const {
      dummyTestData, questionsList, questionIndex, studentAnswer, finalSubmit
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Dummy</title>
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
            >
              <Grid
                item
                lg={8}
                md={6}
                xl={3}
                xs={12}
              >
                {' '}
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderRadius: '10px',
                    elevation: '10px'
                  }}
                >
                  <CardContent>
                    {`${dummyTestData.testTitle} ${dummyTestData.subjectCode}`}
                    <Grid
                      item
                      container
                      lg={12}
                      sm={12}
                      xl={12}
                      xs={12}
                    >
                      {
                        questionsList.length > 0 ? (
                          <>
                            <FormControl>
                              <FormLabel id="radio-buttons-group-label">{`Question ${questionIndex + 1}: ${questionsList[questionIndex].question}`}</FormLabel>
                              <RadioGroup
                                aria-labelledby="radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={studentAnswer}
                                onChange={(e) => this.handleChange(e)}
                              >
                                {questionsList[questionIndex].alternatives.map((answer) => (
                                  // eslint-disable-next-line no-underscore-dangle
                                  <FormControlLabel value={answer._id} control={<Radio />} label={answer.text} />
                                ))}
                              </RadioGroup>
                              {
                                finalSubmit ? (
                                  <Button onClick={() => this.handleFinalSubmit()}>
                                    Submit For Evaluation
                                  </Button>
                                ) : (
                                  <Button onClick={() => this.handleSubmitNext()}>
                                    Submit and Proceed
                                  </Button>
                                )
                              }

                            </FormControl>

                          </>
                        )
                          : <>No questions</>
                      }
                    </Grid>
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
export default Dummy;
