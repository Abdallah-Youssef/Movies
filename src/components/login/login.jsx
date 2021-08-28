
import React from "react";
import loginImg from "../../login.svg";
import { login } from "../../services/api";

export class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onLoginClicked()
    {
        if (this.state.username === "")
        {
            alert("Please enter your username");
            return;
        }

        if (this.state.password === "")
        {
            alert("Please enter your password");
            return;
        }

        // alert("Try loggin in" + this.state.username + this.state.password);
        login(this.state.username, this.state.password).then(result => {
            window.location.href = "/movies";
        })
        .catch(error => {
            alert(error);
        })
    }

    render(){
        return (
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.onTextChange} />
                    </div>
                    <div className="form group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onTextChange} />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={this.onLoginClicked} type="button" className="btn">Login</button>
            </div>
        </div>
        )
    }
}
