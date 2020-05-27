import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default class TodoList extends React.Component {

    state = {
        todos: [],
        todoToShow: "all",
        toggleAllComplete : true
    }

    addTodo = (todo) => {
        this.setState({
            todos: [todo, ...this.state.todos]
        });
    };

    toggleComplete =(id) => {
        this.setState ({
            todos: this.state.todos.map(todo => {
                //supposed to update
                if (todo.id === id){
                    return{
                    ...todo,
                    complete: !todo.complete
                    };
                }else{
                    return todo;
                    //doesnt change values
                }
            })  
        });
    };

    updateTodoToShow = (s) =>{
        this.setState({
            todoToShow: s
        });
    };

    removeAllTodosThatAreComplete=()=>{
        this.setState({
            todos: this.state.todos.filter(todo=> !todo.complete)
        });
    };

    handleDeleteTodo=(id)=>{
        this.setState({
            todos: this.state.todos.filter(todo=> todo.id !==id)
        });
    };

    render() {
        let todos =[];

        if (this.state.todoToShow === "all") {
            todos = this.state.todos;
        }
        else if (this.state.todoToShow === "active") {
            todos = this.state.todos.filter(todo => !todo.complete)
        }
        else if (this.state.todoToShow === "complete") {
            todos = this.state.todos.filter(todo => todo.complete)
        }


        return ( <div>
            <TodoForm onSubmit = {this.addTodo} />
            {todos.map(todo=> (
            <Todo 
                key={todo.id} 
                toggleComplete={() => this.toggleComplete(todo.id)}
                onDelete ={() => this.handleDeleteTodo(todo.id)} 
                todo={todo} />
                
            ))}
            <div>Todos Left: {this.state.todos.filter(todo => !todo.complete).length}</div>
            <div>
                <button className="btn btn-primary" onClick = {() => this.updateTodoToShow("all")}>All</button>
                <button className="btn btn-primary" onClick = {() => this.updateTodoToShow("active")}>Active</button>
                <button className="btn btn-primary" onClick = {() => this.updateTodoToShow("complete")}>Complete</button>
            </div>
            {this.state.todos.some(todo => todo.complete) ? (
            <div>
                <button className="btn btn-danger" onClick={this.removeAllTodosThatAreComplete}>
                    Remove all of the complete Todos
                </button>
            </div>
        ) : null}
        <div>
            <button className="btn btn-success" onClick={() => this.setState({
                todos: this.state.todos.map(todo=>({
                    ...todo,
                    complete:this.state.toggleAllComplete
                })),
                toggleAllComplete: !this.state.toggleAllComplete
            })} >Toggle all Complete:
                 {`${this.state.toggleAllComplete}`}</button>
        </div>
        </div>
        );
    }
}