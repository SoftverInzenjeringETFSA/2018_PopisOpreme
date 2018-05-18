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

       
    }

    dobaviStavke() {
        fetch('/backend/controllers/stavke')//ne treba ovolika ruta al da ne bude konflikta kasnije.. moze i /stavke al ce vjerovatno neko kasnije koristit to
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

        alert('Stavka '+stavka +' Obrisana');
        //obrisati iz baze
        /*
                this.setState({
                    message:'Stavka +'
                })
        */
     
    }

    render(){
        /*
        this.setState(prevState=>({
            listaStavki:[...prevState.listaStavki,'Adnan']
        }));*/
        const {listaStavki} = this.state;
        const {stavke_izvjestaj} = this.state;
        /*
        var tmpListaStavkiObjekata = [];
        for(let i=0; i<5; i++){
            StavkaObject.naziv="Monitor"
            StavkaObject.inventurni_broj=123;
            StavkaObject.ispravnosti=true;
            StavkaObject.kategorija=3;
            StavkaObject.prisutnosti=true;
            tmpListaStavkiObjekata.push(StavkaObject);
        }
        this.setState({listaObjekataStavki:tmpListaStavkiObjekata});*/


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
                                <tr key={stavka}>
                                    <th>{i+1}</th>
                                    <td>2123</td>
                                    <td>{stavka}</td>
                                    <td>"kategorija 3"</td>
                                    <td>"količina 3"</td>
                                    <td>"prisutno"</td>
                                    <td>"ispravno"</td>
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
                                <tr key={stavka+" izvjestaj"}>
                                <th>{i+1}</th>
                                <td>2123</td>
                                <td>{stavka}</td>
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