import React from 'react';
import { loginUser} from "./actions";

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onLoginClick(e){
        e.preventDefault();
        if(loginUser(this.state)){
            this.props.history.push('/home');
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form className="well" onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" name="username" onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" name="password" onChange={this.onChange} />
                            </div>

                            <button className="btn btn-primary" onClick={this.onLoginClick}>
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