import React from 'react';

class GenerisanjeNaljepnica extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            listaStavki : ['stolica','lemilica','monitor']
        }
    }

    onButtonClick (){
        alert("uspjesno ste generisali naljepnicu.. ");
    }

    generisiNaljepnicu(stavka){
            console.log('generisanje naljepnice za '+stavka);
    }

    render(){
        const {listaStavki} = this.state;
        return(
           <div>
               <header>
                  <h1>Generisanje Naljepnica</h1>
               </header>
               <div className="container">
               <table className="table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Stavka</th>
                    <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaStavki.map(stavka =>{
                            return (
                                <tr key={stavka}>
                                    <th scope="row">1</th>
                                    <td>{stavka}</td>
                                    <td>
                                        <button onClick={(e)=>this.generisiNaljepnicu(stavka)} type="button" className="btn btn-default">
                                            Generisi Naljepnicu
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
        );
    }

};



export default GenerisanjeNaljepnica;