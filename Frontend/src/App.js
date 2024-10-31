import React, { Component } from 'react'
import './App.css';

const tasks = [
  {
    id: 1,
    title: "Wash the Dishes",
    description: "Make sure all dishes are washed and dried",
    completed: true
  },
  {
    id: 2,
    title: "Walk the Dog",
    description: "Take the dog around the nieghborhood",
    completed: false
  },
  {
    id: 3,
    title: "Help Mom",
    description: "Help mom clean the house",
    completed: true
  },


]

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
        viewCompleted: false,
        taskList: tasks,
    };
  }

  displayCompleted = status => {
    if (status){
      return this.setstatus({ viewCompleted: true });
    }
    return this.setstatus({ viewCompleted: false });
  }

  renderTabList = () => {
    return (
      < div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    )
  }

  //Rendering items as incompleted || completed
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );
  };

  //Rendering on the screen itself
  render() {
    return (
      <div className = "App">
        Hello World
      </div>
    )
  }

}

export default App;
