import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      todoItemName: "",
      placeHolder: "",
      is_active: false,
      is_done: false,
    };

    //Input Handler
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSwitchChange = this.handleOnSwitchChange.bind(this);
    this.handleOnDoneChange = this.handleOnDoneChange.bind(this);
    this.handleOnDeleteChange = this.handleOnDeleteChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    //Add Item to List
    this.addItemToList = this.addItemToList.bind(this);
  }

  //Input Handler
  handleOnChange = (e) => {
    var value = e.target.value;

    this.setState({
      [e.target.name]: value,
    });
  };

  handleOnSwitchChange = (e) => {
    var checked = e.target.checked;
    var name = e.target.name;
    if (name === "is_active") {
      this.setState({
        is_active: checked,
        is_done: false,
      });
    }
    if (name === "is_done") {
      this.setState({
        is_active: false,
        is_done: checked,
      });
    }
  };

  handleOnDoneChange = (index) => {
    var todoList = this.state.todoList;
    var todoItem = todoList[index];
    todoItem.is_done = !todoItem.is_done;
    this.setState({
      todoList: this.state.todoList,
    });
  };

  handleOnDeleteChange = (id) => {
    var todoList = this.state.todoList;
    var todoItem = todoList.find((list) => list.id === id);
    todoItem.is_delete = !todoItem.is_delete;
    console.log("[App]", todoItem);
    this.setState({
      todoList: this.state.todoList,
    });
  };

  handleDelete = (index, key) => {
    var todoList = this.state.todoList;
    var todoItem = todoList[index];
    if (key === "delete") {
      todoList.splice(index, 1);
      this.setState({
        todoList: todoList,
      });
    } else if (key === "close") {
      todoItem.is_delete = false;
      this.setState({
        todoList: this.state.todoList,
      });
    }
  };

  //Add Item to List
  addItemToList = () => {
    var state = this.state;

    if (state.todoItemName === "") {
      this.setState({
        placeHolder: "Please enter item name",
      });
    } else {
      var todoObj = {
        name: state.todoItemName,
        is_done: false,
        id: new Date().toString(),
        is_delete: false,
      };

      this.setState({
        todoList: [...state.todoList, todoObj],
        todoItemName: "",
      });
    }
  };

  //Render View
  render() {
    let state = this.state;
    let { todoList } = state;

    if (state.is_done) {
      todoList = state.todoList.filter((item) => item.is_done);
    }

    if (state.is_active) {
      todoList = state.todoList.filter((item) => !item.is_done);
    }

    return (
      <section className="container">
        <h1 className="heading-primary">
          Todo list
          <span>Get things done, one item at a time.</span>
        </h1>
        <div className="todo-list">
          {todoList.length !== 0 ? (
            todoList.map((todoItem, i) => (
              <div key={i} className="todo-item">
                <span
                  className={
                    todoItem.is_done ? "todo-item-name done" : "todo-item-name"
                  }
                >
                  {todoItem.name}
                </span>
                <div className="todo-item-icon">
                  <input
                    type="checkbox"
                    id={todoItem.id}
                    className="todo-item-check"
                    onChange={() => this.handleOnDoneChange(i)}
                    checked={todoItem.is_done}
                  />
                  {!todoItem.is_delete && (
                    <label htmlFor={todoItem.id} className="checkbox-btn">
                      <div>
                        <i className="material-icons">check</i>
                      </div>
                    </label>
                  )}
                  {!todoItem.is_delete && (
                    <i
                      className="material-icons"
                      style={{ color: "#FFF", cursor: "pointer" }}
                      onClick={() => this.handleOnDeleteChange(todoItem.id)}
                    >
                      delete
                    </i>
                  )}
                  {todoItem.is_delete && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="material-icons"
                        style={{
                          color: "#FFF",
                          marginRight: 15,
                          cursor: "pointer",
                        }}
                        onClick={() => this.handleDelete(i, "delete")}
                      >
                        check
                      </i>
                      <i
                        className="material-icons"
                        style={{ color: "#FFF", cursor: "pointer" }}
                        onClick={() => this.handleDelete(i, "close")}
                      >
                        close
                      </i>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <span className="todo-erro-text">
              {state.is_done
                ? "You haven't done any item yet!"
                : state.is_active
                ? "You have done all items in the list"
                : "Your todo list is empty!"}
            </span>
          )}
        </div>
        {state.todoList.length !== 0 && (
          <div>
            <div className="switch-container">
              <span className="switch-name">Show done item only?</span>
              <input
                type="checkbox"
                className="switch"
                checked={this.state.is_done}
                name="is_done"
                value={this.state.is_done}
                onChange={this.handleOnSwitchChange}
              />
            </div>
            <div className="switch-container">
              <span className="switch-name">Show active items only?</span>
              <input
                type="checkbox"
                className="switch"
                checked={this.state.is_active}
                name="is_active"
                value={this.state.is_active}
                onChange={this.handleOnSwitchChange}
              />
            </div>
          </div>
        )}
        <div className="form">
          <h2 className="heading-secondary">Add to the todo list</h2>
          <div className="form__group">
            <input
              type="text"
              className="form__input"
              name="todoItemName"
              value={this.state.todoItemName}
              onChange={this.handleOnChange}
              placeholder={this.state.placeHolder}
              onFocus={() => this.setState({ placeHolder: "" })}
            />
            <button className="form__btn" onClick={this.addItemToList}>
              add item
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
