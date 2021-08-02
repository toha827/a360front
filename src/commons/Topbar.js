import React, {Component} from 'react'
import ReactSVG from 'react-svg';
import {EmailIconMobile, PhoneIcon} from '../images';
import SearchIcon from '../images/search@2x.png'
import BellIcon from '../images/bell@2x.png'
import MessageIcon from '../images/message@2x.png'
import AvatarIcon from '../images/avatar-1@2x.jpg'
import {Link} from 'react-router-dom'
import authService from "../services/authService";
import {Redirect} from "react-router-dom";
import { signOut } from "../actions/AuthActions";
import {connect} from "react-redux";
class Topbar extends Component {
    state = {
        width:0,
        name:"",
        divStyle: {
            color: '',
            transition: ".3s"
        },
        checked: false,
        isActive:false
    }
  
    checkCheckbox=()=>{
        if (this.state.checked) {
            this.setState({divStyle: {color: "#fff"}})
        }
        else {
            this.setState({divStyle: {color: "#242526"}})
        }
    };
    handleCheck = () => {
        this.setState({checked: !this.state.checked});
        this.checkCheckbox();
    };


    logout = () =>{
        console.log("sadsad")
        this.props.signOut();
    };



    render(){
        console.log(this.props.user)
        return(
            <div className="top-bar  d-flex align-md-items-center ">
                {
                    window.innerWidth < 769 ?

                        <nav role="navigation">
                            <div style={this.state.divStyle} className="logo d-flex align-items-center justify-content-center"><span><span><span
                                className="dot-inside"/>O</span>qu.today</span></div>
                            <div id="menuToggle" onClick={()=>this.handleCheck()}>
                                <input type="checkbox" onChange={()=>this.handleCheck()} checked={this.state.checked}/>
                                <span></span>
                                <span></span>
                                <span></span>
                                <div id="menu" className="d-flex flex-column align-items-center justify-content-between">
                                    <div className="main-sections d-flex flex-column align-items-center">
                                        <Link onClick={()=>this.handleCheck()} to="/profile/browseCourses">Обзор курсов</Link>
                                        <Link to="/profile/myCourses">Мои курсы</Link>
                                        <Link to="/profile/certificates">Сертификаты</Link>
                                    </div>
                                    <div className="person d-flex flex-column align-items-center">
                                        <h2>{this.state.name}</h2>
                                        <div onClick={() => this.logout()} href="">Выйти с аккаунта</div>
                                    </div>
                                    <div className="contact-us d-flex flex-column align-items-center">
                                        <a href="mailto:info@oqu.today"><ReactSVG src={EmailIconMobile}/>info@oqu.today</a>
                                        <a href="tel:+7 747 234 24 24"><ReactSVG src={PhoneIcon}/>+7 747 234 24 24</a>
                                    </div>
                                </div>
                            </div>
                        </nav>:
                        <div className={" d-flex  align-items-center  justify-content-between w-100"}>
                            <div className="search-input d-none d-md-flex align-items-center">
                                <img src={SearchIcon} alt=""/>
                                <input type="text" placeholder="Поиск..."/>
                            </div>

                            <div className="right-side d-flex align-items-center">
                                {/*<a href="#" className="notifications">*/}
                                {/*    <img src={BellIcon} alt=""/>*/}
                                {/*    <span className="dot-bell"/>*/}
                                {/*</a>*/}

                                {/*<a href="#"><img src={MessageIcon} alt=""/></a>*/}

                                <Link className="avatar-icon" to="/profile/settings"><img src={AvatarIcon} alt=""/>{this.props.user.name}</Link>
                            </div>
                        </div>

                }

            </div>
        )
    }
}
const mapStateToProps = state => ({
    isLoading: state.authReducer.isLoading,
    error: state.authReducer.error,
    user: state.authReducer.user
  });
  
  const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
    dispatch
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);