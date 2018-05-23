import React from 'react';
import './modifikacija.css';
import ReactDOM from 'react-dom';


class ModifikacijaStavke extends React.Component
{
    constructor(props)
    {
        super(props);
       this.state = {
           childVisible: true,
           listaStavki: [],
           StavkaObject: ''

       };
      
        this.onChange = this.onChange.bind(this);
        this.dobaviStavke = this.dobaviStavke.bind(this);
        this.dobaviStavke();
        this.onClick = this.onClick.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickNazad = this.onClickNazad.bind(this);
    }
    
   onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

   onClick(stavka)
   {
    this.setState({
        childVisible: !this.state.childVisible,
        StavkaObject: stavka
       });
   }

   onClickNazad(e)
   {
    this.setState({
        childVisible: !this.state.childVisible,
        });
   }

   dobaviStavke() {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
        method: 'GET',
        headers: myHeaders
    }

    var request = new Request('http://localhost:8080/get-stavke', options);

    fetch(request)
      .then(res => res.json())
      .then(json => {
        this.setState({
          listaStavki:json
          });
      }).catch(err=>{console.log('Parsing error ',err)});  
    }
    
    
    onClickSave(e) {

        if(this._naziv.value.length === 0 || this._kategorija.value.length === 0 || this._kolicina.value.length === 0
            || this._vlasnistvo.value.length === 0 || this._ispravnost.value.length === 0 || this._prisutnost.value.length === 0)
        {
            alert("Sva polja moraju biti popunjena");
        }
        else
        {
            var regex = new RegExp('(^([0-9])+([0-9]|\s|([0-9]+\s))+)'); // ako počinje brojem i ako sadrži samo brojeve i razmake onda nije ispravan naziv
            if(regex.test(this._naziv.value))
            {
                alert("Naziv nije ispravan.");
            }
            else
            {
                var newItem = {
                naziv: this._naziv.value,
                kolicina: this._kolicina.value,
                kategorija: this._kategorija.value,
                ispravnost: this._ispravnost.value,
                prisutnost: this._prisutnost.value,
                vlasnistvo: this._vlasnistvo.value,
                id_broj: this._idBroj.value,
        
                };
                var stavkaObjekat = [];

                for(let i = 0; i < 6; i++)
                {
                
                    if(newItem.id_broj === this.state.listaStavki[i].id_broj)
                    {
                        stavkaObjekat.push(newItem);  
                    }
                    else
                    {
                        stavkaObjekat.push(this.state.listaStavki[i]);
                    }
                }
                this.setState({ 
                    childVisible: !this.state.childVisible,
                    listaStavki: stavkaObjekat
                });
                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
        
                const options = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(newItem)
                };
                var  myRequest = new Request('http://localhost:8080/modifikujstavku', options);
                const response = fetch(myRequest);
        
                alert("Uspješno modifikovana stavka");
            }
        }
        e.preventDefault();
        
    }
    render()
    { 
        const {listaStavki} = this.state;
        var shown = {
            display: this.state.childVisible ? "block" : "none"
        };
        var hidden = {
            display: this.state.childVisible ? "none" : "block"
        }; 
        return(
            <div>
                <header>
                    <h2 className="text-center">Modifikacija stavke</h2>
                </header>
                <div className="container"  style={shown}>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                <th>#</th>  
                                <th>Inventurni broj</th>
                                <th>Naziv</th>
                                <th>Kategorija</th>
                                <th>Količina</th>
                                <th>Info o prisutnosti</th>
                                <th>Info o ispravnosti</th>
                                <th>Info o vlasništvu</th>
                                <th>Akcija</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                listaStavki.map((stavka,i) =>{
                                    return (
                                        <tr key={stavka.id_broj}>
                                            <th>{i+1}</th>
                                            <td>{stavka.id_broj}</td>
                                            <td>{stavka.naziv}</td>
                                            <td>{stavka.kategorija}</td>
                                            <td>{stavka.kolicina}</td>
                                            <td>{stavka.prisutnost}</td>
                                            <td>{stavka.ispravnost}</td>
                                            <td>{stavka.vlasnistvo}</td>
                                            <td>
                                                <button onClick={(e)=>this.onClick(stavka)} type="button" className="btn btn-info">
                                                 Modifikuj
                                                </button>
                                            </td>
                                            </tr> 
                                            )
                                        })
                                }
                            </tbody>
                            </table>
                    </div>
                </div>
                <div className="container" style={hidden}>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Inventurni broj</th>
                                <th>Naziv</th>
                                <th>Kategorija</th>
                                <th>Količina</th>
                                <th>Info o prisutnosti</th>
                                <th>Info o ispravnosti</th>
                                <th>Info o vlasništvu</th>
                                <th>Akcija</th>
                                </tr>
                            </thead>
                            <tbody>
                            {   <tr key={this.state.StavkaObject.id_broj}>
                                <td> </td>
                                <td>
                                    <input value = {this.state.StavkaObject.id_broj} ref = {(a) => this._idBroj = a} readonly/>
                                </td>
                                <td>
                                    <input placeholder = {this.state.StavkaObject.naziv} id = "input" ref = {(a) => this._naziv = a}/>
                                </td>
                                <td>
                                <select className="form-control" name="kategorija" ref = {(a) => this._kategorija = a} id= "kategorijaId">
                                <option value = "1"> Stalna sredstva u upotrebi</option>
                                <option value = "2"> Sitni inventar i autoguma u upotrebi</option> 
                                <option value = "3"> Novčana sredstva</option> 
                                <option value = "4"> Potraživanja</option> 
                                <option value = "5"> Obaveze</option> 
                                <option value = "6"> Stanje o vanbilansnoj evidenciji</option> 
                                <option value = "7"> Tuđa sredstva koja se u vrijeme popisa nalaze na fakultetu</option>
                                <option value = "8"> Sredstva koja se vrijeme popisa nalaze kod drugog pravnog lica</option>  
                                </select>
                                </td>
                                <td>
                                    <input placeholder = {this.state.StavkaObject.kolicina} id = "input"  ref = {(a) => this._kolicina = a}/>
                                </td>
                                <td>
                                    <input placeholder = {this.state.StavkaObject.prisutnost} id = "input" ref = {(a) => this._prisutnost = a}/>
                                </td>
                                <td>
                                    <input placeholder = {this.state.StavkaObject.ispravnost} id = "input" ref = {(a) => this._ispravnost = a}/>
                                </td>
                                <td>
                                    <input placeholder = {this.state.StavkaObject.vlasnistvo} id = "input" ref = {(a) => this._vlasnistvo = a}/>
                                </td>
                                <td>
                                    <button onClick={(e)=>this.onClickSave(e)} type="button" className="btn btn-info">
                                        Modifikuj
                                    </button>
                                </td>
                                </tr> 
                            }
                            </tbody>
                        </table>
                        <button onClick={(e)=>this.onClickNazad(e)} type="button" className="btn btn-info"> Nazad </button>
                    </div>
                </div>
            </div>
        );
    }
};
const mountNode = document.getElementById('root');
ReactDOM.render(<ModifikacijaStavke />, mountNode);

export default ModifikacijaStavke;
