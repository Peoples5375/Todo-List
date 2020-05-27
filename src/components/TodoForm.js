import React from 'react';
import shortid from 'shortid';
export default class TodoList extends React.Component {

state = {
    text: ''
}
handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}
handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({ 
        id: shortid.generate(),
        text: this.state.text,
        compolete: true
    });
    this.setState({
        text:""
    });
    //time to submit the form
};

    render() {
        return (
            <div className="container">
        <form onSubmit = {this.handleSubmit}>
        <input 
        className=" form-control col-xs-4"
        name="text"
            value ={this.state.text} 
            onChange={this.handleChange}
            placeholder="Todo..."/>
            <button className="btn btn-success sm" onClick={this.handleSubmit}>Add Todo</button>
        </form>
        </div>
        );
    }
}