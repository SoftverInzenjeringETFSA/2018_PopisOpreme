import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class NovaInventura extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            naziv: '',
            prostorija: ''
        };
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }	
    handleClick () {
        fetch('/novaInventura', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: {
                "naziv": this.state.naziv,
                "prostorija" : this.state.prostorija
            }
        });
    }	
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    updateValue (newValue) {
        this.setState({
			prostorija: newValue,
		});
    }
    render() {
    const options = [
        { label: "S1", value: 1 },
        { label: "S2", value: 2 },
        { label: "S3", value: 3 }
      ]
    return (
        <div className="container">
            <div className="page-header text-left">
                <h3>Nova inventura</h3>
            </div>
            <div className="col-lg-offset-2 col-lg-8 centered">
                <form className="well well-lg" onSubmit={e => e.dodajInventuru()}>
                <div className="col-md-12 centered">
                    <label className="col-md-5">Naziv inventure: </label>
                    <input className="col-md-6" name="naziv" onChange={this.onChange} type="text"/>
                    <label> *</label>
                </div>
                <br/><br/>
                <div className="col-lg-12 centered">
                    <label className="col-md-5">Prostorija za koju se vrši inventura: </label>
                    <Select
                        name="prostorija"
                        options={options}
                        className="col-lg-6"
                        ref={(ref) => { this.select = ref; }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        autoFocus
                        value={this.state.prostorija}
                        onChange={this.updateValue.bind(this)}
                        placeholder=""
                    /> 
                </div>
                <br/><br/><br/>
                <div className="col-lg-12 centered">
                    <div className="col-md-9"></div>
                    <button className="btn btn-primary col-md-2" onClick={this.handleClick}>Kreiraj</button>
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
                        name="listaInventura"
                        className="col-md-6"
                        ref={(ref) => { this.select = ref; }}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        autoFocus
                        placeholder=""
                    /> 
                    <br/> <br/> <br/>
                    <div className="col-lg-12 centered">
                        <div className="col-md-9"></div>
                        <button className="btn btn-primary col-md-2"> Odaberi
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