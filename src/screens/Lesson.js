import React, { Component } from "react";
import "../styles/Plyr.scss";
import { Link, Redirect } from "react-router-dom";
import NavArrow from "../images/navArrow.png";
import bg from "../images/mobile-bg-header2.jpg";
import authServices from "../services/authService";
import { connect } from "react-redux";
// import Vimeo from "react-vimeo";
import Vimeo from "@u-wave/react-vimeo";
import { getLessonsByCourse, getLessonById } from "../actions/LessonActions";
class Lesson extends Component {
  state = {
    lesson: {
      title: "",
      description: "",
      teacher: {
        name: "",
        position: "",
        awards: [],
        learnings: [],
        needed: [],
      },
      video: "348113755",
      photo: "",
    },
    video: "348113755",
  };

  componentDidMount() {
    const type = this.props.location.substring(16);
    this.props.getLessonsByCourse(type, this.props.authReducer.user.user_id);
    // this.props.lessonsStore.getLessonsOfCourse(type);
    // this.props.lessonsStore.getMyCources();

    // switch (type) {
    //     case "chem": {
    //         this.setState({
    //             lesson: this.state.chemLesson
    //         });
    //         break;
    //     }
    //     case "math": {
    //         this.setState({
    //             lesson: this.state.mathLesson
    //         });
    //         break;
    //     }
    //     case "kaz": {
    //         this.setState({
    //             lesson: this.state.kazLesson
    //         });
    //         break;
    //     }
    //     case "phys": {
    //         this.setState({
    //             lesson: this.state.physLesson
    //         });
    //         break;
    //     }
    //     default : {
    //         break;

    //     }
    // }
  }

  changeVideo = (item) => {
    this.setState({
      video: "347867004",
    });
    console.log(this.props);
    this.props.getLessonById(item.id, this.props.authReducer.user.user_id);
  };

  renderBtn = () => {
    const item = this.props.myLessons.find(
      (item) => item.id === this.props.lesson.course.course_id
    );
    const index = this.props.myCources.indexOf(item);
    console.log("index", index);
    if (index < 0) {
      return (
        <a
          target="_blank"
          href={
            "https://payment.oqu.today/?id=" +
            this.props.lesson.lesson.id +
            "&user_id=" +
            authServices.getId() +
            "&course_id=" +
            this.props.lesson.course.course_id
          }
          className="buy-button d-none d-md-flex justify-content-center align-items-center float-right align-self-end"
        >
          КУПИТЬ КУРС
        </a>
      );
    }
  };

  renderLessons = () => {
    console.log(this.props);
    if (this.props.lesson.course) {
      console.log("lessons", this.props.lesson.lessons);
      const item = this.props.lesson.lessons.find(
        (item) => item.id === this.props.lesson.id
      );
      const index = this.props.lesson.lessons.indexOf(item);
      console.log("index", index);
      if (index > -1) {
        return this.props.lesson.lessons.map((item) => {
          return (
            <span
              className="video-anchor"
              onClick={() => this.changeVideo(item)}
            >
              {item.number}. {item.title}
              <br />
            </span>
          );
        });
      }
    }
  };

  renderVideo = () => {
    if (this.props.lesson) {
      console.log(this.props.lesson.video);

      return (
        <Vimeo
          // width={"100%"}
          // height={300}
          className="vimeo"
          video={this.props.lesson.video}
          //   sources={[
          //       {
          //           src: 'vimeo',
          //           type: this.props.lessonsStore.lesson.lesson.video,
          //       },

          //   ]}
          //    playsinline={true}
          //    hideControls={true}
        />
      );
    } else {
      return;
    }
  };

  render() {
    console.log(this.props.lesson);
    return (
      <div className="course w-100 d-flex">
        <div className="content w-100">
          <div className="course-header d-flex flex-column justify-content-end d-md-none">
            <img className={"bg-a"} src={bg} alt="" />
            <Link to="/profile/myCourses">
              <img src={NavArrow} alt="" /> Назад
            </Link>
            {/* <h1>{lesson.title && lesson.title}</h1> */}
          </div>
          <div className="course-main d-flex flex-column flex-md-row justify-content-between">
            <div className="video-side d-flex flex-column">
              {console.log("lesson", this.props.lesson)}
              {this.renderVideo()}

              {this.props.lesson.lesson && (
                <h1 className="d-md-block d-none">
                  {this.props.lesson.lesson.title}
                </h1>
              )}
              <h2 className="mt-md-0 mt-5">О курсе</h2>
              {this.props.lesson.lesson && (
                <p>
                  {this.props.lesson.lesson.description &&
                    this.props.lesson.lesson.description}
                </p>
              )}
              {this.props.lesson.lesson && this.renderBtn()}
            </div>

            <div className="right-side mt-5 mt-md-0 d-flex flex-column-reverse flex-md-column">
              <div className="author d-flex align-items-center justify-content-between justify-content-md-start">
                <div className="d-flex align-items-center pr-md-0 pr-4">
                  {/* <img src={lesson.photo && lesson.photo} alt=""/> */}
                  <div className="d-flex flex-column">
                    {this.props.lesson.lesson && (
                      <h1>
                        {this.props.lesson.teacher &&
                          this.props.lesson.teacher.t_name}
                      </h1>
                    )}
                    {this.props.lesson.lesson && (
                      <p>
                        {this.props.lesson.teacher &&
                          this.props.lesson.teacher.t_pos}
                      </p>
                    )}
                  </div>
                </div>
                {/* <a target="_blank"  href={"https://payment.oqu.today/?id=" + lesson.id} className="buy-button pl-md-0 pl-4 d-md-none d-flex justify-content-center align-items-center float-right align-self-md-end">КУПИТЬ КУРС</a> */}
              </div>
              {this.props.lesson && (
                <p className="d-none d-md-block">
                  {this.props.lesson.teacher &&
                    this.props.lesson.teacher.t_awards}
                </p>
              )}

              <div className="d-flex flex-md-column">
                <div className="d-flex flex-column pr-4 pr-md-0">
                  <h3>Вы изучите:</h3>
                  <p>базовый материал для сдачи ЕНТ по изучаемому предмету</p>
                  <p>{this.renderLessons()}</p>
                </div>

                <div className="d-flex flex-column pl-4 pl-md-0">
                  <h3>Вы должны иметь:</h3>
                  <p>поверхностные школьные знания по изучаемому предмету</p>
                  {/* <p>{
                                        lesson.teacher && lesson.teacher.needed.map(item => {
                                            return(
                                                <span>
                                        - {item}
                                                    <br/>
                                        </span>
                                            )
                                        })
                                    }</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lesson: state.LessonsReducer.lesson,
  myCources: state.LessonsReducer.myLessons,
  authReducer: state.authReducer,
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  getLessonsByCourse: (id, userId) => dispatch(getLessonsByCourse(id, userId)),
  getLessonById: (id, userId) => dispatch(getLessonById(id, userId)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
