import React from 'react';
import './style.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        this.createCategoryComponents = this.createCategoryComponents.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.fetchAllCategories = this.fetchAllCategories.bind(this);
        this.openEdit = this.openEdit.bind(this);
    }

    componentDidMount() {
        this.fetchAllCategories();
    }

    fetchAllCategories(){
        fetch('http://localhost:8080/categories')
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.setState({
                            categories: json
                        })
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    openEdit(id){
        let selectedCategory = this.state.categories.find(cat => cat._id === id);

        this.props.history.push({
            pathname: '/categories/add',
            data: selectedCategory
        });
    }

    deleteCategory(id){
        fetch(`http://localhost:8080/categories/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    this.fetchAllCategories();
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    createCategoryComponents() {
        let catUI = [];
        if (this.state.categories) {
            this.state.categories.forEach(cat => {
                catUI.push(
                    <div key={cat._id}>
                        <span>{'Name: ' + cat.name}</span>
                        <span
                            className="glyphicon glyphicon-minus pull-right cursor-pointer"
                            onClick={e => this.deleteCategory(cat._id)}
                        />
                        <span
                            className="glyphicon glyphicon-pencil pull-right cursor-pointer"
                            onClick={e => this.openEdit(cat._id)}
                        />
                    </div>
                );
            });
        }
        return catUI;
    }

    render() {
        let ui = this.createCategoryComponents();

        return (
            <div className="container">
                <div className="page-header">
                    <h1>Categories List</h1>
                </div>
                <div className="row">
                    <div className="col-lg-offset-2 col-lg-4">
                        {ui}
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;