import React from 'react';
import {loginUser} from "./actions";

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
    /*addItem(e)
   {
       {
           var newItem = {
               naziv: this._naziv.value,
               kolicina: this._kolicina.value,
               kategorija: this._kategorija.value,
               ispravnost: this._ispravnost.value,
               prisutnost: this._prisutnost.value,
               idBroj: parseInt(dan.toString() + mjesec.toString() + godina.toString() + this._kategorija.value.toString() + rand.toString()),
               key: Date.now()
           };
           this.setState((prevState) => {
               return {
                   items: prevState.items.concat(newItem)
               };
           });
       }
       this._naziv.value = "";
       this._kolicina.value = "";
       this._kategorija.value = "";
       this._ispravnost.value = "";
       this._prisutnost.value = "";
       this._datum.value = "";
      
       var myHeaders = new Headers();
       myHeaders.append('Content-Type', 'application/json');

       const options = {
           method: 'POST',
           headers: myHeaders,
           body: JSON.stringify(newItem)
       };
       var  myRequest = new Request('http://localhost:8080/dodajstavku', options);
       const response = fetch(myRequest);

       alert("Uspješno unesena stavka");
       console.log(this.state.items);

       e.preventDefault();
   }*/
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form className="well" onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" name="username" onChange={this.onChange}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" name="password" onChange={this.onChange}/>
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