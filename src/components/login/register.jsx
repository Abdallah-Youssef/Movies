import React from "react";
import loginImg from "../../login.svg";
import { signup } from "../../services/api";
import { isRegexMatching } from "../../services/Helpers";

export class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            email: "",
            password: ""
        };

        this.onRegisterClicked = this.onRegisterClicked.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onRegisterClicked()
    {
        if (this.state.username === "")
        {
            alert("Please enter your username");
            return;
        }

        if (!isRegexMatching(this.state.email, /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
        {
            alert("Please enter a valid email");
            return;
        }

        if (this.state.password === "")
        {
            alert("Please enter your password");
            return;
        }
        
        signup(this.state.username, this.state.email, this.state.password).then(result => {
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        })
    }


    render(){
        return (
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Register</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.onTextChange}/>
                    </div>
                    <div className="form group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.onTextChange}/>
                    </div>
                    <div className="form group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onTextChange}/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={this.onRegisterClicked} type="button" className="btn">Register</button>
            </div>
        </div>
        )
    }
}
