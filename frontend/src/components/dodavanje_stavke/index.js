import React from 'react'
import './dodavanje.css';

class Item extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items: []

        };
        this.addItem = this.addItem.bind(this);
    }
    
   
   onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
   
   addItem(e)
   {
    
        if(this._naziv.value.length === 0 || this._kategorija.value.length === 0 || this._kolicina.value.length === 0
            || this._vlasnistvo.value.length === 0 || this._ispravnost.value.length === 0 || this._prisutnost.value.length === 0
            || this._datum.value.length === 0)
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
                var datum = new Date(); // za idBroj
                datum = this._datum.valueAsDate;
                var dan = datum.getDay();
                var mjesec = datum.getMonth();
                var godina = datum.getFullYear();
                const min = 1;
                const max = 99999;
                const rand = min + Math.random() * (max - min); // za idBroj
                if(this._naziv.value !== "" && this._kolicina.value !== "")
                {
                    var newItem = {
                        naziv: this._naziv.value,
                        kolicina: this._kolicina.value,
                        kategorija: this._kategorija.value,
                        ispravnost: this._ispravnost.value,
                        prisutnost: this._prisutnost.value,
                        idBroj: parseInt(dan.toString() + mjesec.toString() + godina.toString() + this._kategorija.value.toString() + rand.toString()),
                        vlasnistvo: this._vlasnistvo.value,
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
                this._vlasnistvo.value = "";
                
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
            }
        }
       e.preventDefault();
    
    
   }
   render(){
       return(
    
       <div className="container">
       <div className="row">
           <div className="col-lg-offset-4 col-lg-4">

               <form className="well" onSubmit = {this.addItem}>
               <table className="tableItem">
              <tr>
                   <div className="form-group">
                       <label>Naziv *</label>
                       <input ref = {(a) => this._naziv = a} className="form-control" name="naziv" placeholder="Naziv stavke"/>
                   </div>
               </tr>
               
               <tr>
                    <div className="form-group">
                       <label>Kategorija *</label>
                       <select className="form-control" name="kategorija" ref = {(a) => this._kategorija = a}>
                       <option value = "1"> Stalna sredstva u upotrebi</option>
                       <option value = "2"> Sitni inventar i autoguma u upotrebi</option> 
                       <option value = "3"> Novčana sredstva</option> 
                       <option value = "4"> Potraživanja</option> 
                       <option value = "5"> Obaveze</option> 
                       <option value = "6"> Stanje o vanbilansnoj evidenciji</option> 
                       <option value = "7"> Tuđa sredstva koja se u vrijeme popisa nalaze na fakultetu</option>
                       <option value = "8"> Sredstva koja se vrijeme popisa nalaze kod drugog pravnog lica</option>  
                       </select>
                   </div>
               </tr>
               <tr>
                    <div className="form-group">
                       <label>U vlasništvu fakulteta *</label>
                       <select className="form-control" name="vlasnistvo" ref = {(a) => this._vlasnistvo = a}>
                       <option value ="DA">DA</option>
                       <option value ="NE">NE</option> 
                       </select>
                   </div>
               </tr>
               <tr>
                    <div className="form-group">
                       <label>Količina *</label>
                       <input ref = {(a) => this._kolicina = a}  className="form-control" name="kolicina" placeholder="Količina"/>
                   </div>
               </tr>
               <tr>
                    <div className="form-group">
                       <label>Ispravnost *</label>
                       <input  ref = {(a) => this._ispravnost = a} className="form-control" name="ispravnost" placeholder="Ispravnost" />
                   </div>
               </tr>
               <tr>
                    <div className="form-group">
                       <label>Prisutnost *</label>
                       <input  ref = {(a) => this._prisutnost = a} className="form-control" name="prisutnost" placeholder="Prisutnost"  />
                   </div>
               </tr>
               <tr>
                   <div className="form-group">
                       <label>Datum unosa *</label>
                       <input  ref = {(a) => this._datum = a} type="date" className="form-control" name="idBroj"  />
                   </div>
               </tr>
               <tr>
                   <button type="submit" id = "btn_dodaj" >Dodaj Stavku</button>
               </tr>
              </table>
               </form>
           </div>
        </div>
    </div>
    );
   }
 }
 export default Item;