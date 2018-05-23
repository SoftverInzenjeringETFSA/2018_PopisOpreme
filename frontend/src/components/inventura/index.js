import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-select/dist/react-select.css';

class Stavke extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const stavke = this.props.stavke;

        return stavke.map((item, sifra) => {
            return <tr key={sifra}>
                <td className="text-center">{item.sifra}</td>
                <td className="text-center">{item.naziv}</td>
                <td className="text-center">{item.jmj}</td>
                <td className="text-center">Prisutno:  {item.prisutnost}</td>
                <td className="text-center">{item.status}</td>
                <td className="text-center">Napomena: {item.napomena}</td>
            </tr>
        })
    }
}
class Inventura extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            datum: new Date(),
            lokacija:'',
            sobe:[],
            odabraneStavke: [],
            sredstva: [],
            nazivSredstva: '',
            postojeceStavke: [],
            nazivInventure: '',
            jmj: '',
            sifra: '',
            prisutno: 'DA',
            potvrdjenInventurniBroj: 'DA',
            status: 'Ispravno',
            napomena: '',
            zakljucena: false
        };
        this.dodajStavku = this.dodajStavku.bind(this);
        this.zavrsiInventuru = this.zavrsiInventuru.bind(this);
        this.getItems= this.getItems.bind(this);
        this.getItems();
        this.getRooms= this.getRooms.bind(this);
        this.getRooms();
        this.state.nazivInventure = this.props.location.state.name;
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
                sobe: res
            });
        });
    }
    createRoom(){
        var roomList = [];
        if(this.state.sobe) {
            this.state.sobe.forEach(room => {
                var x=room.roomName;
                roomList.push({value: x, label: x});
            });
        }
        return roomList;
    }
    updateJmj (newValue) {
        this.setState({
			jmj: newValue,
		});
    }
    updateStatus (newValue) {
        this.setState({
			status: newValue,
		});
    }
    updateInvBroj (newValue) {
        this.setState({
			potvrdjenInventurniBroj: newValue,
		});
    }
    updatePrisutnost (newValue) {
        this.setState({
			prisutno: newValue,
		});
    }
    updateNaziv (newValue) {
        this.setState({
			nazivSredstva: newValue,
		});
    }
    updateLokacija (newValue) {
        this.setState({
		    lokacija : newValue,
		});
    }
    dodajStavku() {
        var data = {
            AuditName: this.state.nazivInventure,
            sifra: this.state.sifra.value,
            naziv: this.state.nazivSredstva.value,
            jmj: this.state.jmj.value,
            prisutnost: this.state.prisutno.value,
            potvrdjenInventurniBroj: this.state.potvrdjenInventurniBroj.value,
            status: this.state.status.value,
            napomena: this.state.napomena.value,
        };
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        };
        var myRequest = new Request('http://localhost:8080/updateStavkaInventure', options);
        const response = fetch(myRequest);
        const daNe= [ {value: 'DA', label: "DA"}, {value: 'NE', label: 'NE'}];
        const Kom= [{value: 'KOM', label: "KOM"}, {value: 'KO', label: 'KO'}];
        const status= [{value: 'Ispravno'}, {value: 'Pokvareno'}, {value: 'Nepoznato'}];
        this.state.nazivSredstva='';
        this.state.sifra.value='';
        this.state.status.value=status[0];
        this.state.jmj=Kom[0];
        this.state.prisutno=daNe[0];
        this.state.potvrdjenInventurniBroj=daNe[0];
        this.state.napomena.value='';
        this.getItems();
        this.forceUpdate();
    }
    getItems() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = {
            method: 'GET',
            headers: myHeaders
        }
        var request = new Request('http://localhost:8080/getItems', options);
        fetch(request).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then((res) => {
            this.setState({
                sredstva : res
            });
        });
    }
    createItem() {
        var auditList = [];
        if(this.state.sredstva) {
            this.state.sredstva.forEach(audit => {
                var x=audit.naziv;
                auditList.push({value: x, label: x});
            });
        }
        return auditList;
    }
    componentDidUpdate() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var data= {Name: this.state.nazivInventure}
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        }
        var request = new Request('http://localhost:8080/otvoriInventuru', options);
        fetch(request).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then((res) => {
            this.setState({
                postojeceStavke : res
            });
        });
    }
    componentDidMount() {
        const daNe= [ {value: 'DA', label: "DA"}, {value: 'NE', label: 'NE'}];
        const Kom= [{value: 'KOM', label: "KOM"}, {value: 'KO', label: 'KO'}];
        const status= [{value: 'Ispravno', label: 'Ispravno'}, {value: 'Pokvareno', label: 'Pokvareno'}, {value: 'Nepoznato', label: 'Nepoznato'}];
        this.state.status=status[0];
        this.state.jmj=Kom[0];
        this.state.prisutno=daNe[0];
        this.state.potvrdjenInventurniBroj=daNe[0];
        this.getRooms();
    }
    zavrsiInventuru() {
        if (this.refs.zakljucena.checked) {
            this.state.zakljucena=true;
            if (this.refs.odgOsoba.value=='' || this.refs.tim.value=='' || this.refs.opisProstorije.value=='' || 
            this.refs.organizacionaJedinica.value=='' || this.state.lokacija.value==null) {
                alert('Svi podaci moraju biti ispunjeni da bi se inventura zaključila!');
                return;
            }
        }
        var data = {
            AuditName: this.state.nazivInventure,
            User: this.refs.odgOsoba.value,
            LocationID: this.state.lokacija.value,
            Team: this.refs.tim.value,
            RoomDescription: this.refs.opisProstorije.value,
            OrganizationalUnit: this.refs.organizacionaJedinica.value,
            Completed: this.state.zakljucena,
        };
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        };
        var myRequest = new Request('http://localhost:8080/zavrsiInventuru', options);
        const response = fetch(myRequest).then(()=> {
            alert('Promjene uspješno zabilježene za inventuru: ' + this.state.nazivInventure);
            this.props.history.push('/novaInventura');
        });
    }
    render() {
        const daNe= [ {value: 'DA', label: "DA"}, {value: 'NE', label: 'NE'}];
        const Kom= [{value: 'KOM', label: "KOM"}, {value: 'KO', label: 'KO'}];
        const status= [{value: 'Ispravno'}, {value: 'Pokvareno'}, {value: 'Nepoznato'}];
        let stavke= this.createItem();
        let sobe= this.createRoom();
        return(
            <div>
                <div style={{paddingLeft:5}}>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Datum inventure: </label>
                        <label className="col-md-6 col-sm-10">{this.state.datum.getDate()}.{this.state.datum.getMonth()}.{this.state.datum.getFullYear()}.</label>
                    </div>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Organizaciona jedinica: </label>
                        <input className="col-md-6 col-sm-10" type="text" ref = 'organizacionaJedinica'/>
                    </div>
                    <br/>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10 "> Odgovorna osoba: </label>
                        <input className="col-md-6 col-sm-10" type="text" ref = 'odgOsoba'/>
                    </div>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Opis i tip prostorije: </label>
                        <input className="col-md-6 col-sm-10" type="text" ref='opisProstorije'/>
                    </div>
                    <br/>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Tim: </label>
                        <input className="col-md-6 col-sm-10" type="text" ref='tim'/>
                    </div>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Lokacija: </label>
                        <Select
                            className="col-md-6 col-sm-10"
                            name="sobe"
                            options={sobe}
                            value={this.state.lokacija}
                            ref={(ref) => { this.select = ref; }}
                            onBlurResetsInput={false}
                            onSelectResetsInput={false}
                            autoFocus
                            onChange={this.updateLokacija.bind(this)}
                            placeholder=""/>
                    </div>
                    <br/>
                </div>
                <br/><br/><br/>
                <div className="col-md-12" >
                <br/>
                    <table className="table table-bordered table-responsive">
                    <tbody>
                        <tr style={{backgroundColor: '#E5E7E8'}}>
                            <th className="text-center">Šifra</th>
                            <th className="text-center col-md-3">Naziv sredstva</th>
                            <th className="text-center">JMJ</th>
                            <th className="text-center">Potvrđeno prisustvo</th>
                            <th className="text-center">Potvrđen inventurni broj</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Napomena</th>
                        </tr>
                        <tr>
                            <th>
                                <input ref = {(a) => this.state.sifra = a} type="text"/>
                            </th>
                            <th> 
                                <Select
                                    name="nazivSredstva"
                                    options={stavke}
                                    value={this.state.nazivSredstva}
                                    ref={(ref) => { this.select = ref; }}
                                    onBlurResetsInput={false}
                                    onSelectResetsInput={false}
                                    autoFocus
                                    onChange={this.updateNaziv.bind(this)}
                                    placeholder=""
                                /> 
                            </th>
                            <th>
                            <Dropdown
                                    options={Kom}
                                    name='jmj'
                                    onChange={this.updateJmj.bind(this)}
                                    value={this.state.jmj}
                                />
                            </th>
                            <th>
                                <Dropdown
                                    options={daNe}
                                    onChange={this.updatePrisutnost.bind(this)}
                                    value={this.state.prisutno}
                                />
                            </th>
                            <th>
                                <Dropdown
                                    options={daNe}
                                    onChange={this.updateInvBroj.bind(this)}
                                    value={this.state.potvrdjenInventurniBroj}
                                />
                            </th>
                            <th>
                            <Dropdown
                                    options={status}
                                    onChange={this.updateStatus.bind(this)}
                                    value={this.state.status}
                                />
                            </th>
                            <th>
                                <input type='text' ref = {(a) => this.state.napomena = a}/>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    <div className="col-md-9"/>
                    <button className="btn btn-primary col-md-2" onClick={this.dodajStavku}> Dodaj stavku </button>
                </div>
                <div className="col-md-11 centered">
                    <p> Postojeće stavke: </p>
                    <table className="table table-bordered table-responsive">>
                        <tbody>
                            <Stavke stavke={this.state.postojeceStavke} />
                        </tbody>
                    </table>
                </div>
                <div className="col-md-10 col-md-offset-1">
                    <input type="checkbox" id="zakljuci" ref='zakljucena'/>
                    <label htmlFor="zakljuci"> Zaključi inventuru </label>
                </div>
                <div className="col-md-9"/>
                <button className="btn btn-primary col-md-2" type='submit' onClick={this.zavrsiInventuru}> Završi inventuru </button>
            </div>
        );
    }
}
export default Inventura;