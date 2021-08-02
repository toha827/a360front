import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMyCourses, getMyCoursesProgress } from "../actions/LessonActions";
import bg from "../images/mobile-bg-header2.jpg";
import NavArrow from "../images/navArrow.png";
import { MathWrap } from "../images";
import { Progress } from "antd";

function MyProgresses(props) {
  const [progresses, setProgresses] = useState([]);
  const [total, setTotal] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  useEffect(() => {
    props.getMyCourses(props.authReducer.user.user_id);
  }, []);

  useEffect(() => {
    if (props.myLessons && props.myLessons.data) {
      const list = props.myLessons.data;
      const re2 = list
        .filter((item) => item != null)
        .map((item) => {
          return {
            ...item,
            lessons:
              item.lessons != null
                ? item.lessons.reduce((acc, value) => {
                    if (value.chapter == null) {
                      return acc;
                    }
                    if (!acc[value.chapter.name]) {
                      acc[value.chapter.name] = [];
                    }
                    acc[value.chapter.name].push(value);

                    return acc;
                  }, {})
                : [],
          };
        });
      setProgresses(re2);
      console.log(re2);
      re2.map((item, index) => {
        var _temp = total;
        var count = 0;
        _temp[total.length] = Object.keys(item.lessons).reduce((acc, key) => {
          count += item.lessons[key].length;
          return (
            acc +
            item.lessons[key].reduce((acc, value) => {
              console.log(props.myLessons);
              var _list = props.myLessons.progressList;
              var _item = _list.filter((el) => {
                return el.lesson.chapter.id == value.chapter.id;
              });

              return acc + _item.length > 0
                ? _item.reduce((_sum, curr) => _sum + curr.progress, 0)
                : 0;
            }, 0)
          );
        }, 0);
        setTotal(_temp);
        console.log(_temp);
        console.log(count);
        setTotalCount([...totalCount, ...[count]]);
      });
    }
  }, [props.myLessons]);

  return (
    <div className="course w-100 d-flex">
      <div className="content my-courses w-100">
        <div className="course-header d-flex flex-column justify-content-end d-md-none">
          <img className={"bg-a"} src={bg} alt="" />
          <Link to="/profile/myCourses">
            <img src={NavArrow} alt="" /> Назад
          </Link>
          <h1>Мой прогресс</h1>
        </div>
        <h1 className="d-md-block d-none">Мой прогресс</h1>
        <div className="row">
          {progresses.map((item, index) => {
            return (
              <Link
                to={"/profile/lesson/" + item.id}
                className="col-md-12 d-flex flex-column"
              >
                <div className="row">{item.name}</div>
                <div className="row">
                  <div className="col-md-10">
                    <div className="row">
                      {Object.keys(item.lessons).map(function (key, index) {
                        const sum = item.lessons[key].reduce((acc, value) => {
                          var _list = props.myLessons.progressList;
                          var _item = _list.filter((el) => {
                            return el.lesson.chapter.id == value.chapter.id;
                          });
                          console.log(_item);
                          return acc + _item.length > 0
                            ? _item.reduce(
                                (_sum, curr) => _sum + curr.progress,
                                0
                              )
                            : 0;
                        }, 0);

                        console.log(sum);
                        console.log(item.lessons[key].length);
                        return (
                          <div
                            className="col-md-3"
                            style={{ marginBottom: "10px" }}
                          >
                            <Progress
                              type="circle"
                              trailColor="white"
                              format={(percent) => `${key} ${percent}%`}
                              percent={(sum / item.lessons[key].length).toFixed(
                                1
                              )}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <p>Общий прогресс</p>
                    <Progress
                      type="circle"
                      trailColor="white"
                      format={(percent) => `${percent}%`}
                      percent={(total[index] / totalCount[index]).toFixed(1)}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  error: state.authReducer.error,
  user: state.authReducer.user,
  myLessons: state.LessonsReducer.myCoursesProgress,
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getMyCourses: (id) => dispatch(getMyCoursesProgress(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProgresses);
