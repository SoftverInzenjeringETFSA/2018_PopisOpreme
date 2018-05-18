import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

class Akcije extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button className="btn btn-sm btn-warning" style={{marginRight:4}}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => this.props.onClick(this.props.id)}>Obrisi</button>
            </div>
        );
    }
}

class Korisnik extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const users = this.props.users;

        return users.map((item, index) => {
            return <tr key={index}>
                <td className="text-center">{item.firstname}</td>
                <td className="text-center">{item.lastname}</td>
                <td className="text-center">{item.username}</td>
                <td className="text-center">{item.email}</td>
                <td className="text-center">{item.role}</td>
                <td className="text-center"><Akcije id={item._id} onClick={this.props.onClick}/></td>
            </tr>
        })
    }
}

class PregledKorisnika extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUsers();
    }
    getUsers() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
    
        const options = {
            method: 'GET',
            headers: myHeaders
        }
    
        var request = new Request('http://localhost:8080/users', options);
    
        fetch(request).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then((res) => {
            this.setState({
                users: res
            });
        });
    }
    deleteUser(id) {
        var self = this;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
    
        const options = {
            method: 'DELETE',
            headers: myHeaders
        }
    
        var request = new Request('http://localhost:8080/users/' + id, options);
    
        fetch(request)
        .then(res => {
            alert('Korisnik uspjesno obrisan');
            this.getUsers();
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 vcenter">
                        <h1>Korisnici</h1>
                    </div>

                    <div className="col-md-8 vcenter">
                        <div className="input-group">

                        <input type="text" className="form-control" placeholder="Trazi..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button">Pretrazi!</button>
                        </span>

                    </div>
                </div>
                </div>
                <br/>
  
                <table className="table table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th className="text-center">Ime</th>
                            <th className="text-center">Prezime</th>
                            <th className="text-center">Username</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Rola</th>
                            <th className="text-center">Akcije</th>
                        </tr>
                    </thead>

                    <tbody>
                        <Korisnik users={this.state.users} onClick={this.deleteUser}/>
                    </tbody>
                </table>
            </div>


        )
    }

}

export default PregledKorisnika;