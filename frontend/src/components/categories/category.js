import React from 'react';

class Container extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.location.data){
            console.log(this.props.location.data);
            this.state = {
                name: this.props.location.data.name,
                description: this.props.location.data.description,
                id: this.props.location.data._id,
                successMsg: '',
                errorMsg: ''
            };

            this.createCategory = this.editCategory.bind(this);
        }
        else{
            this.state = {
                name: '',
                description: '',
                successMsg: '',
                errorMsg: ''
            };

            this.createCategory = this.createCategory.bind(this);
        }

        this.onChange = this.onChange.bind(this);
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

    editCategory(e) {
        e.preventDefault();
        fetch(`http://localhost:8080/categories/${this.state.id}`, {
            method: 'PATCH',
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
                                <input
                                    value={this.state.name}
                                    className="form-control"
                                    name="name"
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    value={this.state.description}
                                    className="form-control"
                                    name="description"
                                    onChange={this.onChange}
                                />
                            </div>

                            <button className="btn btn-success" onClick={this.createCategory}>
                                {this.props.location.data ? 'Edit Category' : 'Create Category'}
                            </button>

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