import React from 'react';
import {loginUser} from "./actions";
import { Route, Redirect } from 'react-router';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            //username: '',
            //password: '',
            users: []
        };
        this.loginUser = this.loginUser.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    loginUser(e)
   {
       {
        if(this._username.value !== "" && this._password.value !== "")
           var User = {
               username: this._username.value,
               password: this._password.value
           };
           this.setState((prevState) => {
               return {
                   users: prevState.users.concat(User)
               };
           });
       }
       this._username.value = "";
       this._password.value = "";
      
       var myHeaders = new Headers();
       myHeaders.append('Content-Type', 'application/json');

       const options = {
           method: 'POST',
           headers: myHeaders,
           body: JSON.stringify(User)
       };
       var  myRequest = new Request('http://localhost:8080/login', options);
       fetch(myRequest)
        .then(res => {
            if(res){
                alert("Uspješno logovan user");
                this.props.history.push('/register');
            }
            else{
                alert("Pogresan username ili password!");
            }
            console.log(res);
        });
       
       //console.log(this.state.items);

       e.preventDefault();
   }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form className="well" onSubmit = {this.loginUser}>
                            <div className="form-group">
                                <label>Username</label>
                                <input ref = {(a) => this._username = a} className="form-control" name="username" placeholder="Username.."/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input ref = {(a) => this._password = a} className="form-control" name="password" placeholder="Password.."/>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;