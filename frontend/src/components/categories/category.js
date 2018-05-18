import React from 'react';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            successMsg: '',
            errorMsg: ''
        };

        this.onChange = this.onChange.bind(this);
        this.createCategory = this.createCategory.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createCategory(e) {
        e.preventDefault();
        fetch('http://localhost:8080/categories', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        console.log(json);
                        this.setState({
                            successMsg: json.message
                        })
                    });
                }
                else{
                    console.log(res);
                    res.json().then(json => {
                        console.log(json);
                        this.setState({
                            errorMsg: json.error
                        })
                    });
                }
            })
            .catch(err => {
                this.setState({
                    errorMsg: err.message || 'Error ocurred.'
                })
            })
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>Categories List</h1>
                </div>
                <div className="row well">
                    <div className="col-lg-offset-4 col-lg-4">
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control" name="name" onChange={this.onChange}/>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" name="description" onChange={this.onChange}/>
                            </div>

                            <button className="btn btn-success" onClick={this.createCategory}>Create Category</button>

                            {this.state.errorMsg &&
                                <div className="alert alert-danger">
                                    <strong>{this.state.errorMsg}</strong>
                                </div>
                            }

                            {this.state.successMsg &&
                                <div className="alert alert-success">
                                    <strong>{this.state.successMsg}</strong>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;