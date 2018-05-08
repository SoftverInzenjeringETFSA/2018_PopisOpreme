import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1>Popis Opreme</h1>
                </div>
            </div>
        )
    }
}

export default Home;