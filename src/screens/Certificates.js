import React, {Component} from "react";
import "../styles/Plyr.scss";
import {Sidebar, Topbar} from '../commons';
import {Link, Redirect} from "react-router-dom";
import courseImage from '../images/layer-3@2x.jpg';
import avatarTeacher from '../images/layer-4@2x.jpg';
import bg from "../images/mobile-bg-header2.jpg";
import NavArrow from "../images/navArrow.png";

class Certificates extends  Component {


    renderRedirect = (profile) => {

        if (profile.token.length === 0) {
            return <Redirect to='/' />
        }
    };


    render(){

        return(

            <div className="course w-100 d-flex">
                <div className="content my-courses w-100">
                
                    <div  className="course-header d-flex flex-column justify-content-end d-md-none">
                        <img className={"bg-a"} src={bg} alt=""/>
                        <Link to="/profile/myCourses"><img src={NavArrow} alt=""/> Назад</Link>
                        <h1>Мои сертификаты</h1>
                    </div>
                    <h1 className="d-md-block d-none">Мои сертификаты</h1>
                    <h4 className="no-certificate text-center align-self-center">К сожалению у вас еще нет сертификатов</h4>
                </div>
            </div>
        )
    }
}


export default Certificates;