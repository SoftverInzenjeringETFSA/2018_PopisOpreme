import React from 'react';

class NotFound extends React.Component{
    render(){
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <div className="alert alert-danger">
                        <strong>Page not found</strong>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;