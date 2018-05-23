import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            users: []
        };
        this.addUser = this.addUser.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addUser(e)
    {
       if(this._username.value !== "" && this._firstname.value !== "" && this._lastname.value !== "" && this._email.value !== "" && this._password.value !== "" && this._conpassword.value !== "")
       {
           //console.log("AAAA");
           var newUser = {
               username: this._username.value,
               firstname: this._firstname.value,
               lastname: this._lastname.value,
               email: this._email.value,
               password: this._password.value,
               conpassword: this._conpassword.value
           };
            this.setState((prevState) => {
               return {
                users: prevState.users.concat(newUser)
               };
           });
       }
       console.log("AAAA");
        this._username.value = "";
        this._firstname.value = "";
        this._lastname.value = "";
        this._email.value = "";
        this._password.value = "";
        this._conpassword.value = "";
      
       var myHeaders = new Headers();
       myHeaders.append('Content-Type', 'application/json');

       const options = {
           method: 'POST',
           headers: myHeaders,
           body: JSON.stringify(newUser)
       };
       var  myRequest = new Request('http://localhost:8080/register', options);
       //const response = fetch(myRequest);
       fetch(myRequest)
        .then(res => {
            console.log(res);
        });
       alert("Uspješno registrovan korisnik");
       console.log(this.state.users);

       e.preventDefault();
   }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form className="well" onSubmit = {this.addUser}>
                            <div className="form-group">
                                <label>Username</label>
                                <input ref = {(a) => this._username = a} className="form-control" name="username" placeholder="Username.."/>
                            </div>
                            <div className="form-group">
                                <label>Firstname</label>
                                <input ref = {(a) => this._firstname = a} className="form-control" name="firstname" placeholder="Firstname.."/>
                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input ref = {(a) => this._lastname = a} className="form-control" name="lastname" placeholder="Lastname.."/>
                            </div>
                            <div className="form-group">
                                <label>E-mail</label>
                                <input ref = {(a) => this._email = a} className="form-control" name="email" placeholder="Email.."/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input ref = {(a) => this._password = a} className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label>Confirm password</label>
                                <input ref = {(a) => this._conpassword = a} className="form-control" name="conpassword" placeholder="Confirm password.."/>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;