import React, { Component, useEffect, useState } from "react";
import "../styles/Plyr.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import courseImage from "../images/layer-3@2x.jpg";
import avatarTeacher from "../images/layer-4@2x.jpg";
import bg from "../images/mobile-bg-header2.jpg";
import NavArrow from "../images/navArrow.png";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import {
  ChemAvatar,
  ChemWrap,
  KazAvatar,
  KazWrap,
  MathAvatar,
  MathWrap,
  PhysAvatar,
  PhysWrap,
} from "../images/index";
import { getMyCourses } from "../actions/LessonActions";
import authService from "../services/authService";
import { Button } from "antd";
import { submitQuiz } from "../api";

function MyTesting(props) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log("USER_ID", props.authReducer.user.user_id);
    props.getMyCourses(props.authReducer.user.user_id);
  }, []);

  useEffect(() => {
    console.log(props.myLessons);
  }, []);

  const handleSubmit = async () => {
    await submitQuiz({
      user: {
        id: props.authReducer.user.user_id,
      },
      quiz: selectedQuiz,
      answered_options: selectedOptions.map((option) => {
        return {
          id: option,
        };
      }),
    }).then((response) => {
      console.log(response);
      setResult(response.data);
    });
  };

  return (
    <div className="course w-100 d-flex">
      {result == null ? (
        selectedCourse == null ? (
          <div className="content my-courses w-100">
            <div className="course-header d-flex flex-column justify-content-end d-md-none">
              <img className={"bg-a"} src={bg} alt="" />
              <Link to="/profile/MyTesting">
                <img src={NavArrow} alt="" /> Назад
              </Link>
              <h1>Мои курсы</h1>
            </div>
            <h1 className="d-md-block d-none">Мои курсы</h1>
            <div className="row">
              {props.myLessons != null &&
                props.myLessons.map((item, index) => {
                  return (
                    <div
                      style={{ marginRight: "16px" }}
                      onClick={() => {
                        setSelectedCourse(item);
                      }}
                    >
                      <div
                        className="about-course d-flex flex-column"
                        onClick={() => {
                          setSelectedCourse(item);
                          console.log(item);
                        }}
                      >
                        <img src={item.image} alt="" />
                        <h2>{item.name} </h2>
                        <p>{item.description}</p>
                        <hr />
                        <div className="teacher-info d-flex align-items-center">
                          {/* <img src={MathAvatar} alt=""/> */}
                          <div className="d-flex flex-column">
                            {/* <h3>Рустем Аманжолов</h3> */}
                            {/* <h4>Учитель математики</h4> */}
                          </div>
                        </div>
                      </div>

                      <div className="progress-course d-flex align-items-center justify-content-between">
                        <div
                          className="progress w-75"
                          style={{ height: 2 + "px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: 0 + "%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                        <span>{item.progress}%</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : selectedQuiz == null ? (
          <div className="content my-courses w-100">
            <div className="course-header d-flex flex-column justify-content-end d-md-none">
              <img className={"bg-a"} src={bg} alt="" />
              <Link to="/profile/MyTesting">
                <img src={NavArrow} alt="" /> Назад
              </Link>
              <h1>Мои Тесты</h1>
            </div>
            <h1 className="d-md-block d-none">Мои Тесты</h1>
            <div className="row">
              {selectedCourse.quizes.map((item, index) => {
                return (
                  <div
                    style={{ marginRight: "16px" }}
                    onClick={() => {
                      setSelectedQuiz(item);
                    }}
                  >
                    <div className="about-course d-flex flex-column">
                      <h2>{item.name} </h2>
                      <p>{item.description}</p>
                      <hr />
                      <div className="teacher-info d-flex align-items-center">
                        {/* <img src={MathAvatar} alt=""/> */}
                        <div className="d-flex flex-column">
                          {/* <h3>Рустем Аманжолов</h3> */}
                          {/* <h4>Учитель математики</h4> */}
                        </div>
                      </div>
                    </div>

                    <div className="progress-course d-flex align-items-center justify-content-between">
                      <div
                        className="progress w-75"
                        style={{ height: 2 + "px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: 0 + "%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                      <span>{item.progress}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="content my-courses w-100">
            <div className="course-header d-flex flex-column justify-content-end d-md-none">
              <img className={"bg-a"} src={bg} alt="" />
              <Link to="/profile/MyTesting">
                <img src={NavArrow} alt="" /> Назад
              </Link>
              <h1>{selectedQuiz.name}</h1>
            </div>
            <h1 className="d-md-block d-none">{selectedQuiz.name}</h1>
            <div className="">
              <Stepper activeStep={activeStep}>
                {selectedQuiz.questions.map((item, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={index} {...stepProps}>
                      <StepLabel {...labelProps}>{index}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep < selectedQuiz.questions.length ? (
                <div className="quiestion_card">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <h1>{selectedQuiz.questions[activeStep].content}</h1>
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={`${selectedOptions[activeStep]}`}
                      onChange={(event) => {
                        var _temp = selectedOptions;

                        _temp[activeStep] = parseInt(event.target.value);
                        setSelectedOptions(_temp);
                        console.log(selectedOptions);
                        setActiveStep(activeStep + 1);
                      }}
                    >
                      {selectedQuiz.questions[activeStep].options.map(
                        (option) => {
                          return (
                            <FormControlLabel
                              value={parseInt(option.id)}
                              onClick={() => {
                                console.log(
                                  selectedOptions[activeStep] != null &&
                                    parseInt(selectedOptions[activeStep]) ===
                                      option.id
                                );
                              }}
                              checked={
                                selectedOptions[activeStep] != null &&
                                parseInt(selectedOptions[activeStep]) ===
                                  option.id
                              }
                              control={<Radio />}
                              label={option.content}
                            />
                          );
                        }
                      )}
                    </RadioGroup>
                  </FormControl>
                </div>
              ) : (
                <div className="submit_quiz">
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit Quiz
                  </Button>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="content my-courses w-100">
          <div className="course-header d-flex flex-column justify-content-end d-md-none">
            <img className={"bg-a"} src={bg} alt="" />
            <Link to="/profile/MyTesting">
              <img src={NavArrow} alt="" /> Назад
            </Link>
            <h1>Мои Результат</h1>
          </div>
          <h1 className="d-md-block d-none">Мои Результат</h1>
          <div className="row">
            <div className="result">
              <h1>
                Correct Answers : {result.correct} of {result.totalOptions}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  error: state.authReducer.error,
  user: state.authReducer.user,
  myLessons: state.LessonsReducer.myLessons,
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getMyCourses: (id) => dispatch(getMyCourses(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTesting);
