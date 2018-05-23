import React from 'react';

class BrisanjeProstorije extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: '',
            roomList: []
        };

        this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.handleListAllRooms = this.handleListAllRooms.bind(this);
        this.handleSearchList = this.handleSearchList.bind(this);
    }

    componentDidMount()
    {
        // this.getRooms();
    }

    getRooms()
    {
        fetch('http://localhost:8080/getRooms', {
            headers: {
                'Accept': 'application/json'
            },
        }).then(function (res)
        {
            return res.json();
        })
            .then((res) =>
            {
                this.setState({
                    roomList: res,
                })
            });

    }

    onChangeName(e)
    {
        this.setState({
            name: e.target.value,
        });
    }

    handleDeleteRoom(e, room)
    {
        e.preventDefault();

        const newRoomList = this.state.roomList.filter(r =>
        {
            return r !== room;
        });

        var myHeaders1 = new Headers();
        myHeaders1.append('Content-Type', 'application/json');

        const options1 = {
            headers: myHeaders1,
        };

        fetch('http://localhost:8080/getAudits', options1).then(function (res)
        {
            return res.json();
        }).then((res) =>
        {
            console.log(res);
            var tempRoomName;
            res.forEach(function (audit)
            {
                if (audit.LocationID === room.roomName)
                {
                    tempRoomName = room.roomName;
                }
            });
            if (tempRoomName !== undefined)
            {
                alert('Prostorija ima vezane stavke, ne moze se obrisati');
            }
            else
            {
                console.log(newRoomList);
                this.setState({
                    roomList: newRoomList,
                });

                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');

                const options = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: JSON.stringify(room),
                };

                var myRequest = new Request('http://localhost:8080/deleteRoom', options);
                const response = fetch(myRequest);
                alert('Uspjesno obrisana prostorija');
            }
        });
    }

    handleListAllRooms(e)
    {
        e.preventDefault();

        this.getRooms();
    }

    handleSearchList(e)
    {
        e.preventDefault();
        fetch('http://localhost:8080/getRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, body: JSON.stringify({
                roomName: this.state.name,
            })
        }).then(function (res)
        {
            if (res.status !== 204)
            {
                return res.json();
            }
            else
            {
                return null;
            }
        })
            .then((res) =>
            {
                if (res === null)
                {
                    alert('Nema prostorije sa tim imenom');
                }
                else
                {
                    var emptyArray = [];
                    emptyArray.push(res);
                    this.setState({
                        roomList: emptyArray,
                    })
                }
            });
    }

    render()
    {
        const roomList = this.state.roomList;
        const buttonBox = {
            textAlign: 'center',
        };
        return (
            <div className={'container'}>
                <div className="row">
                    <div className="col-lg-12">
                        <form className={'well well-lg'}>
                            <div className="form-group">
                                <label>Pretraga</label>
                                <input className="form-control" name="roomName" placeholder={'Pretrazi'}
                                       onChange={this.onChangeName}/>
                            </div>
                            <div className="button-box col-lg-12" style={buttonBox}>
                                <button
                                    className="btn btn-default"
                                    type="submit"
                                    onClick={this.handleSearchList}
                                    style={{marginBottom: 10, float: 'left'}}>
                                    Pretrazi
                                </button>
                                <button
                                    className="btn btn-default"
                                    type="submit"
                                    onClick={this.handleListAllRooms}
                                    style={{marginBottom: 10, float: 'right'}}>
                                    Izlistaj sve prostorije
                                </button>
                            </div>

                            <header>
                                <h2 className="text-center">Lista prostorija</h2>
                            </header>
                            <table className={'table'}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Naziv prostorije</th>
                                    <th>Naziv parent prostorije</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    roomList.map((room, i) =>
                                    {
                                        return (
                                            <tr key={room._id}>
                                                <th>{i + 1}</th>
                                                <td>{room.roomName}</td>
                                                <td>{room.parentRoomName}</td>
                                                <td>
                                                    <button
                                                        className={'btn btn-danger'}
                                                        onClick={(e) => this.handleDeleteRoom(e, room)}
                                                        type={'button'}
                                                        style={{float: 'right'}}
                                                    >
                                                        Obriši
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
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
            errorMsg: '',
            successMsg: '',
        };
        this.onChangeRoomName = this.onChangeRoomName.bind(this);
        this.onChangeParentRoomName = this.onChangeParentRoomName.bind(this);
        this.onAddRoom = this.onAddRoom.bind(this);
        this.validateName = this.validateName.bind(this);
        this.setError = this.setError.bind(this);
        this.unsetError = this.unsetError.bind(this);
    }

    validateName(name)
    {
        var regex = new RegExp('^[a-zA-Z0-9|/|(|)|-]+$');
        return regex.test(name);
    }

    unsetError()
    {
        this.setState({
            errorMsg: ''
        });
    }

    setError()
    {
        this.setState({
            errorMsg: 'Naziv prostorije može sadržavati samo alfanumeričke znakove i /()-'
        });
    }

    onAddRoom(e)
    {
        e.preventDefault();

        var data = {
            roomName: this.state.roomName,
            parentRoomName: this.state.parentRoomName
        };


        if (!this.validateName(data.roomName))
        {
            alert('Nije validan naziv prostorije!')
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
        if (!this.validateName(e.target.value) && e.target.value !== '')
            this.setError();
        else
            this.unsetError();
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
                            <div className={'form-group'}>
                                <button className="btn btn-default" type="submit" onClick={this.onAddRoom}>
                                    Dodaj prostoriju
                                </button>
                            </div>
                            {
                                this.state.successMsg &&
                                <div className="alert alert-success" style={{paddingTop: 10}}>
                                    <strong>{this.state.successMsg}</strong>
                                </div>
                            }
                            {
                                this.state.errorMsg &&
                                <div className="alert alert-danger">
                                    <strong>{this.state.errorMsg}</strong>
                                </div>
                            }
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export {UnosProstorije, BrisanjeProstorije};