import React, { Component } from 'react';
//import TextToImage from 'reactjs-text-to-image';
var QRCode = require('qrcode.react');
var Barcode = require('react-barcode');
//var ReactDOM = require('react-dom');



/*let StavkaObject ={
    id_broj : "",
    ispravnost : "",
    kategorija : "",
    kolicina : "",
    naziv : "",
    prisutnost : ""
}*/

class GenerisanjeNaljepnica extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            listaStavki : ['stolica','lemilica','monitor'],
            lista_inventurnih_brojeva:[],
            visible:false,
            StavkaObject:{
                id_broj : "",
                ispravnost : "",
                kategorija : "",
                kolicina : "",
                naziv : "",
                vlasnistvo:"",
                prisutnost : ""
            },
            pretragaText:'',
            vlasnistvoFaxa:true

        }
        //let nummberImage = this.refs.canvas;
        //nummberImage.fillText("Hello World!", 10, 50);
        this.myRef = React.createRef();
        this.inputPretraga=this.inputPretraga.bind(this);
        this.buttonSearchEvent=this.buttonSearchEvent.bind(this);
        this.dobaviStavke = this.dobaviStavke.bind(this);
        this.dobaviStavke();
        this.GenerisiNaljepnicu = this.GenerisiNaljepnicu.bind(this);
    }

    inputPretraga(e)
    {
        this.setState({
            pretragaText: e.target.value,
        });
    }

    buttonSearchEvent(e)
    {
            e.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
        
            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({naziv: this.state.pretragaText})
            }
        
            var request = new Request('http://localhost:8080/search-stavku', options);
    
            fetch(request)
              .then(res => res.json())
              .then(json => {
                  console.log(json);
                  if(json!=null) this.setState({listaStavki:[json]});
                  else alert("FAIL");
              }).catch(err=>{console.log('Parsing error ',err)});
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
              //counters: json
              listaStavki:json
              
            });
          }).catch(err=>{console.log('Parsing error ',err)});
          
      }

      GenerisiNaljepnicu(stavka){
          let tmpboolean =false;
          if(stavka.vlasnistvo =="DA") tmpboolean=true;
          //console.log(tmpboolean);
          //console.log(stavka.vlasnistvo);
       this.setState({
        visible:true,
        StavkaObject:stavka,
        vlasnistvoFaxa:tmpboolean
       });

       //pristup bazi spasavanje id
       //this.state.StavkaObject.id_broj.. spasis u bazu za naljepnice..
       let myHeaders = new Headers();
       myHeaders.append('Content-Type', 'application/json');

       const options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(stavka)
        };

        var  myRequest = new Request('http://localhost:8080/dodaj-naljepnicu', options);
        const response = fetch(myRequest);

        alert("Uspješno kreirana naljepnica");
        

      }


    render(){
       
        const {listaStavki} = this.state;
        const {stavke_izvjestaj} = this.state;
        //this.GenerisiNaljepnicu();
        return(
           <div>
               <header>
               <h2 className="text-center">Generisanje Naljepnice</h2>
               </header>
               <div className="container">

               <table className="table">
                <thead>
                    <tr>
                    <th> 
                        <label>Pretraga</label>
                        <input className="form-control" name="ImeStavke" placeholder={'naziv stavke'} onChange={this.inputPretraga}/>
                    </th>
                    <th>
                    <button
                           className="btn btn-info"
                            type="submit"
                             onClick={this.buttonSearchEvent}>
                                  Pretraži
                    </button>
                    </th>
                    
                    </tr>
                </thead>
                </table>

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
                    <th>Vlasnistvo</th>
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
                                        <button onClick={(e)=>this.GenerisiNaljepnicu(stavka)} type="button" className="btn btn-info">
                                           Generiši najepnicu
                                        </button>
                                    </td>
                                </tr> 
                            )
                              
                        })
                    }
                </tbody>
                </table>

                {this.state.visible ? <Naljepnica vrijednost={this.state.StavkaObject.id_broj} vlasnistvoFaxa={this.state.vlasnistvoFaxa}/>:null}
    
               </div>

           </div>
        );
    }

};

class Naljepnica extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            <h2 className="text-center">Naljepnica </h2>
            <div className="text-center">
            {this.props.vlasnistvoFaxa ? <Barcode value={this.props.vrijednost} />: <QRCode value={this.props.vrijednost} /> }
            </div>
        </div>
        );
    }
}

//samo mjenjas ove brojeve ili link stavis sta hoces on sam generise qr code..
 //<canvas ref={this.myRef}/>
export default GenerisanjeNaljepnica;