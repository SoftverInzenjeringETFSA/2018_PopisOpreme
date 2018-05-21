import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-select/dist/react-select.css';

class Inventura extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            datum: new Date(),
            odabraneStavke: [],
            sredstva: [],
            nazivSredstva: '',
        };
        this.onChange = this.onChange.bind(this);
        this.getItems= this.getItems.bind(this);
        this.getItems();
    }	 
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    updateValue (newValue) {
        this.setState({
			nazivSredstva: newValue,
		});
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
                var x=audit.ItemName;
                var y=audit.SubgroupPart;
                auditList.push({value: x, label: x + '-' + y});
            });
        }
        return auditList;
    }
    render() {
        const daNe= [ {value: 1, label: "DA"}, {value: 0, label: 'NE'}];
        const Kom= [{value: 1, label: "KOM"}, {value: 0, label: 'KO'}];
        const status= [{value: 1, label: "Ispravno"}, {value: 0, label: 'Pokvareno'}, {value: 2, label: 'Nepoznato'}];
        let stavke= this.createItem();
        return(
            <div>
                <div style={{paddingLeft:5}}>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Datum inventure: </label>
                        <label className="col-md-6 col-sm-10">{this.state.datum.getDate()}.{this.state.datum.getMonth()}.{this.state.datum.getFullYear()}.</label>
                    </div>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Opis i tip prostorije: </label>
                        <input className="col-md-6 col-sm-10" type="text"/>
                    </div>
                    <br/>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10 "> Odgovorna osoba: </label>
                        <input className="col-md-6 col-sm-10" type="text"/>
                    </div>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Lokacija: </label>
                        <input className="col-md-6 col-sm-10" type="text"/>
                    </div>
                    <br/>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Tim: </label>
                        <input className="col-md-6 col-sm-10" type="text"/>
                    </div>
                    <div className="col-md-6">
                        <label className="col-md-4 col-sm-10"> Organizaciona jedinica: </label>
                        <input className="col-md-6 col-sm-10" type="text"/>
                    </div>
                    <br/>
                </div>
                <br/><br/><br/>
                <div className="col-md-12" style={{height:300}}>
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
                                <input type="number"/>
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
                                    onChange={this.updateValue.bind(this)}
                                    placeholder=""
                                /> 
                            </th>
                            <th>
                            <Dropdown
                                    options={Kom}
                                    onChange={this._onSelect} 
                                    value={'KOM'}
                                />
                            </th>
                            <th>
                                <Dropdown
                                    options={daNe}
                                    onChange={this._onSelect} 
                                    value={'NE'}
                                />
                            </th>
                            <th>
                                <Dropdown
                                    options={daNe}
                                    onChange={this._onSelect} 
                                    value={'NE'}
                                />
                            </th>
                            <th>
                            <Dropdown
                                    options={status}
                                    onChange={this._onSelect} 
                                    value={'Ispravno'}
                                />
                            </th>
                            <th>
                                <input type='text'/>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    <div className="col-md-10"/>
                    <button className="btn btn-primary col-md-2" onClick={this.dodajStavku}> Dodaj stavku </button>
                </div>
                <div>
                </div>
                <div className="col-md-10 col-md-offset-1">
                    <input type="checkbox" id="zakljuci"/>
                    <label htmlFor="zakljuci"> Zaključi inventuru </label>
                </div>
                <div className="col-md-9"/>
                <button className="btn btn-primary col-md-2"> Završi inventuru </button>
            </div>
        );
    }
}
export default Inventura;