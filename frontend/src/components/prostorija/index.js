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
            roomName: '',
            parentRoomName: '',
        };
        this.onChangeRoomName = this.onChangeRoomName.bind(this);
        this.onChangeParentRoomName = this.onChangeParentRoomName.bind(this);
        this.onAddRoom = this.onAddRoom.bind(this);
    }

    onAddRoom()
    {

        var data = {
            roomName: this.state.roomName,
            parentRoomName: this.state.parentRoomName
        };

        var regex = new RegExp('^[a-zA-Z0-9|/|(|)|-]+$');

        if (!regex.test(data.roomName))
        {
            alert('Naziv prostorije nije validan!');
        }
        else
        {
            console.log(data);

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data)
            };

            var myRequest = new Request('http://localhost:8080/addRoom', options);
            const response = fetch(myRequest);
            alert('Uspjesno dodana prostorija');
        }
    }

    onChangeRoomName(e)
    {
        this.setState({
            roomName: e.target.value
        });
    }

    onChangeParentRoomName(e)
    {
        this.setState({
            parentRoomName: e.target.value,
        });
    }

    render()
    {
        return (
            <div className={'container'}>
                <header>
                    <h2 className="text-center">Dodavanje prostorije</h2>
                </header>
                <div className="row">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form className={'well well-lg'}>
                            <div className="form-group">
                                <label>Naziv prostorije</label>
                                <input className="form-control" name="roomName" placeholder={'Naziv'}
                                       onChange={this.onChangeRoomName}/>
                            </div>
                            <div className="form-group">
                                <label>Parent prostorija (opcionalno)</label>
                                <input className="form-control" name="parentRoomName"
                                       placeholder={'Naziv parent prostorije'}
                                       onChange={this.onChangeParentRoomName}/>
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