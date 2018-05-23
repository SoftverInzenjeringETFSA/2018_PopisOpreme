import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class NovaInventura extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Name: '',
            rooms: [],
            LocationID: '',
            audits: [],
            chosenAudit: ''
        };
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.otvoriInventuru = this.otvoriInventuru.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.getRooms();
        this.getAudits = this.getAudits.bind(this);
        this.getAudits();
    }	
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    updateLocationID(newValue) {
        this.setState({
            LocationID : newValue
        });
    }
    updateChosenAudit(newValue) {
        this.setState({
            chosenAudit : newValue
        });
    }
    otvoriInventuru() {
        this.props.history.push({pathname: '/inventura', state: {name: this.state.chosenAudit.value}});
    }
    handleClick () {
        var data = {
            Name: this.state.Name,
            LocationID: this.state.LocationID.value,
        };
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        };
        var myRequest = new Request('http://localhost:8080/novaInventura', options);
        const response = fetch(myRequest);
    }	
    getRooms() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = {
            method: 'GET',
            headers: myHeaders
        }
        var request = new Request('http://localhost:8080/getRoom', options);
        fetch(request).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then((res) => {
            this.setState({
                rooms: res
            });
        });
    }
    createRoom(){
        var roomList = [];
        if(this.state.rooms) {
            this.state.rooms.forEach(room => {
                var x=room.roomName;
                roomList.push({value: x, label: x});
            });
        }
        return roomList;
    }
    createAudit() {
        var auditList = [];
        if(this.state.audits) {
            this.state.audits.forEach(audit => {
                var x=audit.AuditName;
                auditList.push({value: x, label: x});
            });
        }
        return auditList;
    }
    getAudits() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = {
            method: 'GET',
            headers: myHeaders
        }
        var request = new Request('http://localhost:8080/getAudits', options);
        fetch(request).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then((res) => {
            this.setState({
                audits: res
            });
        });
    }
    componentDidUpdate() {
        this.getRooms();
        this.getAudits();
    }
    render() {
        let roomList = this.createRoom();
        let auditList = this.createAudit();
    return (
        <div className="container">
            <div className="page-header text-left">
                <h3>Nova inventura</h3>
            </div>
            <div className="col-lg-offset-2 col-lg-8 centered">
                <form className="well well-lg">
                <div className="col-md-12 centered">
                    <label className="col-md-5">Naziv inventure: </label>
                    <input className="col-md-6" name="Name" onChange={this.onChange} type="text"/>
                    <label> *</label>
                </div>
                <br/><br/>
                <div className="col-lg-12 centered">
                    <label className="col-md-5">Prostorija za koju se vrši inventura: </label>
                    <Select
                        name="LocationID"
                        options={roomList}
                        className="col-lg-6"
                        value={this.state.LocationID}
                        style={{color: 'red'}}
                        ref={(ref) => { this.select = ref; }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        autoFocus
                        onChange={this.updateLocationID.bind(this)}
                        placeholder=""
                    /> 
                </div>
                <br/><br/><br/>
                <div className="col-lg-12 centered">
                    <div className="col-md-9"></div>
                    <button type = "submit" className="btn btn-primary col-md-2" onClick={this.handleClick}>Kreiraj</button>
                </div>
                <br/><br/>
                </form>
            </div>
            <div className="col-md-10 text-left" style={{paddingLeft : 0}}>
                <label >Polja označena sa * su obavezna!</label>
            </div>
            <br/><br/>
            <div className="col-lg-offset-2 col-lg-8 centered">
                <div className="well well-lg" style={{paddingtop : 5}}>
                    <label className="col-md-5" >Postojeće inventure: </label>
                    <Select
                        name="chosenAudit"
                        options={auditList}
                        value={this.state.chosenAudit}
                        className="col-md-6"
                        ref={(ref) => { this.select = ref; }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        onChange={this.updateChosenAudit.bind(this)}
                        autoFocus
                        placeholder=""
                    /> 
                    <br/> <br/> <br/>
                    <div className="col-lg-12 centered">
                        <div className="col-md-9"></div>
                        <button type='submit' className="btn btn-primary col-md-2" onClick={this.otvoriInventuru}> Odaberi
                        </button>
                    </div>
                    <br/><br/> 
                    </div>
            </div> 
        </div>
    );
  }
}

export default NovaInventura;