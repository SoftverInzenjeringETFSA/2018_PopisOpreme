import React from 'react';
import 'whatwg-fetch';


let StavkaObject ={
    inventurni_broj:1,
    naziv:"123",
    kategorija:"123",
    prisutnosti:"123",
    ispravnosti:"123"
}
class OtpisInventurneStavke extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            listaStavki : ['stolica','lemilica','monitor'],
            lista_inventurnih_brojeva:[],

            stavke_izvjestaj: []
        }

        this.dobaviStavke = this.dobaviStavke.bind(this);
        this.ObrisiInventurnuStavku = this.ObrisiInventurnuStavku.bind(this);
        this.dobaviStavke();
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


    ObrisiInventurnuStavku(stavka){
        const novaListaStavki = this.state.listaStavki.filter(tmpStavka =>{
            return tmpStavka !== stavka;
        });

        this.setState({
            listaStavki: [...novaListaStavki],
            stavke_izvjestaj:[...this.state.stavke_izvjestaj,stavka],
            //izvjestaj: 'Stavka '+ stavka + ' uspjesno obrisana.. '
          
        })

        alert('Stavka '+stavka.naziv +' Obrisana');
        //obrisati iz baze
        let id=1;
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
    
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify(stavka)
        }
    
        var request = new Request('http://localhost:8080/delete-stavku/' + stavka.id_broj, options);
    
        fetch(request)
        .then(res => {
            console.log(res);
        });
     
    }

    render(){
       
        const {listaStavki} = this.state;
        const {stavke_izvjestaj} = this.state;
        console.log(this.state.listaStavki);
        return(
           <div>
               <header>
               <h2 className="text-center">Otpis Inventurne Stavke</h2>
               </header>
               <div className="container">
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
                                    <td>
                                        <button onClick={(e)=>this.ObrisiInventurnuStavku(stavka)} type="button" className="btn btn-danger">
                                           Obriši
                                        </button>
                                    </td>
                                </tr> 
                            )
                              
                        })
                    }
                </tbody>
                </table>
                <h2 className="text-center">Izvještaj </h2>
                <div className="row row-centered">
               <table className="table table-sm">
                    <thead>
                        <tr>
                        <th >#</th>
                        <th>Inventurni broj</th>
                        <th>Naziv</th>
                        <th >Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                         stavke_izvjestaj.map((stavka,i)=>{
                             return(
                                 
                                <tr key={stavka.id_broj+" izvjestaj"}>
                                <th>{i+0+1}</th>
                                <td>{stavka.id_broj}</td>
                                <td>{stavka.naziv}</td>
                                <td>"Obrisano iz baze"</td>
                            </tr>
                            
                             )
                         })
                       }
                    </tbody>
                    </table>
                </div>
               </div>

           </div>
        );
    }

};



export default OtpisInventurneStavke;