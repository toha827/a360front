import React, { Component } from "react";
import "../styles/Plyr.scss";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import bg from "../images/mobile-bg-header2.jpg";
import { Field, reduxForm } from "redux-form";
import NavArrow from "../images/navArrow.png";
import authService from "../services/authService";
import { PlayButton } from "../images";
import AvatarIcon from "../images/avatar-1@2x.jpg";
import PhoneInput, {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import ru from "react-phone-number-input/locale/ru";
import { getMyCourses } from "../actions/LessonActions";
import { connect } from "react-redux";
import Calendar from "./widgets/Calendar";
import { userCourseStatus } from "../actions/AuthActions";
import moment from "moment";
import { endpoint } from "../api";

class Settings extends Component {
  state = {
    width: 0,
    name: "",
    dateReg: "",
    isActive: false,
    user: {},
  };

  componentDidMount() {
    console.log(this.props);
    const name = authService.getName();
    this.setState({
      name,
    });
    axios
      .get(endpoint + `/Profile/read?id=${this.props.user.user_id}`)
      .then((data) => {
        this.setState({
          user: data.data,
        });
      });
    this.props.getUserCourseStatus(this.props.user.user_id);
  }

  switchToggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.simple);
    const data = {
      ...this.props.simple.values,
    };
    data.id = this.props.user.user_id;
    axios.post(endpoint + "/Profile/edit", data).then(() => {
      alert("Данные изменены");
    });
    this.switchToggle();
  };

  enumerateDaysBetweenDates = function (startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf("day");
    var lastDate = moment(endDate).startOf("day");

    while (currDate.add(1, "days").diff(lastDate) < 0) {
      dates.push(currDate.clone().toDate());
    }

    return dates;
  };

  render() {
    const { user } = this.state;
    const { name, email, phone, bday } = user;

    return (
      <div className="course w-100 d-flex">
        <div className="content my-courses w-100">
          <div className="course-header d-flex flex-column justify-content-end d-md-none">
            <img className={"bg-a"} src={bg} alt="" />
            <Link to="/profile/myCourses">
              <img src={NavArrow} alt="" /> Назад
            </Link>
            <h1>Мои настройки</h1>
          </div>
          {!this.state.isActive ? (
            <div className="personal-profile">
              <div className="col-md-12 d-flex">
                <div className="col-md-4 d-flex flex-column">
                  <div className="avatar-name d-flex flex-column align-items-center">
                    <img src={AvatarIcon} alt="" />
                    <h2>{user.name}</h2>
                    <h3>ученик</h3>
                    <button onClick={() => this.switchToggle()}>
                      Изменить
                    </button>
                  </div>
                </div>

                <div className="col-md-8 d-flex flex-column">
                  <div className="information d-flex flex-column">
                    <h2>Персональная информация</h2>
                    <div className="d-flex mb-4">
                      <div className="d-flex w-50">
                        <h3>Номер тел.:</h3>
                        <p>{user.phone}</p>
                      </div>
                      <div className="d-flex w-50">
                        <h3>Дата рождения:</h3>
                        <p>{user.bday}</p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="d-flex w-50">
                        <h3>Пол:</h3>
                        {user.gender == "male" ? (
                          <p>Мужской</p>
                        ) : (
                          <p>Женский</p>
                        )}
                      </div>
                      <div className="d-flex w-50">
                        <h3>E-mail:</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="information d-flex space-between"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="flex-column">
                      <p>Уроков пройдено</p>
                      <p>
                        {this.props.courseStatus &&
                          this.props.courseStatus.progressList.length}
                      </p>
                    </div>
                    <div className="flex-column">
                      <p>Тестов пройдено</p>
                      <p>
                        {this.props.courseStatus &&
                          this.props.courseStatus.quizResultsList.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 d-flex flex-column">
                <Calendar
                  tasks={
                    this.props.courseStatus != null
                      ? [
                          ...this.props.courseStatus.data.reduce(
                            (acc, course) => {
                              return [
                                ...acc,
                                ...this.enumerateDaysBetweenDates(
                                  moment(course.purchaisedDate),
                                  moment(course.validDate)
                                ),
                              ];
                            },
                            []
                          ),
                        ]
                      : []
                  }
                />
              </div>
            </div>
          ) : (
            <div className="edit-profile d-flex">
              <div className="col-md-4">
                <div className="upload-avatar d-flex flex-column align-items-center justify-content-center">
                  <img src={AvatarIcon} alt="" />
                  <label htmlFor="imageUpload">Изменить аватарку</label>
                  <input type="file" id="imageUpload" autoComplete="off" />
                </div>
              </div>
              <div className="col-md-8">
                <div className="personal-info-edit d-flex flex-column">
                  <h2>Персональная информация</h2>
                  <form onSubmit={this.handleSubmit}>
                    <div className="d-flex align-items-center mb-4">
                      <label className="blue-text" htmlFor="name">
                        Имя:
                      </label>
                      <Field
                        value={name}
                        defaultValue={name}
                        name="name"
                        component="input"
                        type="text"
                        placeholder={name ? name : "First Name"}
                      />
                    </div>
                    <div
                      id="radioGroup"
                      className="d-flex align-items-center mb-4"
                    >
                      <h3 className="blue-text">Пол:</h3>
                      <label>
                        <Field
                          name="gender"
                          component="input"
                          type="radio"
                          value="male"
                        />{" "}
                        Мужской
                      </label>
                      <label>
                        <Field
                          name="gender"
                          component="input"
                          type="radio"
                          value="female"
                        />{" "}
                        Женский
                      </label>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <label className="blue-text" htmlFor="bday">
                        Дата рождения:
                      </label>
                      <Field
                        defaultValue={bday}
                        name="bday"
                        component="input"
                        type="date"
                        required={true}
                        placeholder={bday ? bday : "ДД.ММ.ГГГГ"}
                      />
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <label className="blue-text" htmlFor="email">
                        E-mail:
                      </label>
                      <Field
                        defaultValue={email}
                        name="email"
                        component="input"
                        type="text"
                        required={true}
                        placeholder={email ? email : "example@mail.ru"}
                      />
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <label className="blue-text" htmlFor="password">
                        Ваш пароль:
                      </label>
                      <Field
                        name="password"
                        component="input"
                        type="password"
                        autoComplete="off"
                        required={true}
                        placeholder="*********"
                      />
                    </div>
                    <div className="d-flex phone-num align-items-center mb-4">
                      <label className="blue-text" htmlFor="phoneNum">
                        Номер телефона:
                      </label>
                      <Field
                        name="phone"
                        component="input"
                        type="phone"
                        autoComplete="off"
                        placeholder={phone ? phone : "+7 XXX XX XX"}
                        required={true}
                      />
                    </div>
                    <button>Сохранить</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  error: state.authReducer.error,
  user: state.authReducer.user,
  myLessons: state.LessonsReducer.myLessons,
  authReducer: state.authReducer,
  simple: state.form.simple,
  courseStatus: state.authReducer.userCourseStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getMyCourses: () => dispatch(getMyCourses()),
  getUserCourseStatus: (id) => dispatch(userCourseStatus(id)),
  dispatch,
});

Settings = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default reduxForm({
  form: "simple", // a unique identifier for this form
})(Settings);
