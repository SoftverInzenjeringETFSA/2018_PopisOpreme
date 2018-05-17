import React from 'react';
import {fetchCategories} from "./actions";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        this.createCategoryComponents = this.createCategoryComponents.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/categories')
            .then(res => {
                if(res.ok){
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

    createCategoryComponents(){
        let catUI = [];
        if(this.state.categories) {
            this.state.categories.forEach(cat => {
                catUI.push(
                    <p>{cat.name}</p>
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
                    <div className="col-lg-offset-3 col-lg-6">
                        {ui}
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;