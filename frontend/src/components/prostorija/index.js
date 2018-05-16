import React from 'react';

class BrisanjeProstorije extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className={'container'}>
                <div className="row">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form className={'well well-lg'}>
                            <div className="form-group">
                                <label>Pretraga</label>
                                <input className="form-control" name="roomName" placeholder={'Pretrazi'}/>
                            </div>
                            <button className="btn btn-default" type="submit" onClick={this.onAddRoom}>
                                Dodaj prostoriju
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

class UnosProstorije extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            parentRoom: this.props.rooms,
        };
        this.onChange = this.onChange.bind(this);

    }

    onAddRoom(e)
    {

        alert('Succes');
        /* Upisati u bazu prostoriju */
    }

    onChange(e)
    {
        this.setState({
            name: e.target.value
        });
    }

    render()
    {
        return (
            <div className={'container'}>
                <div className="row">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form className={'well well-lg'}>
                            <div className="form-group">
                                <label>Naziv prostorije</label>
                                <input className="form-control" name="roomName" placeholder={'Naziv'}
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label>Izbor parent prostorije (opcionalno)</label>
                                <select className="form-control" name={'chooseParentRoom'}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                            <button className="btn btn-default" type="submit" onClick={this.onAddRoom}>
                                Dodaj prostoriju
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export {UnosProstorije, BrisanjeProstorije};