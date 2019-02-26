import React, {Component} from 'react';

class Lesson extends Component {
    handleClick(lesson, index) {
      console.log(`${index} - ${lesson.title}`)
    }
    render() {
      return (
         <div>
            <h1 onClick={this.handleClick.bind(this, this.props.lesson, this.props.index)}>Lesson 1: {this.props.lesson && this.props.lesson.title}</h1>
            <p>Lesson 1: {this.props.lesson && this.props.lesson.description}</p>
         </div> 
      )  
    }
}

class LessonsList extends Component {
  render() {
    return (
      <div>{this.props.lessons.map((lesson, index) => <div key={index}><h1>{lesson.title}</h1><p>{lesson.description}</p></div>)}</div>
    )
  }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
          lessons: [
            { title: 'Lesson 1: title', description: 'Lesson 1: description' },
            { title: 'Lesson 2: title', description: 'Lesson 2: description' },
            { title: 'Lesson 3: title', description: 'Lesson 3: description' },
            { title: 'Lesson 4: title', description: 'Lesson 4: description' }
          ]
        }
    }

    render() {
      return (
         <div>
             {this.state.lessons.map((lesson, index) => <Lesson lesson={lesson} index={index} key={index} />)}
             <hr></hr>
             <LessonsList lessons={this.state.lessons} />
         </div>
      )  
    }
}

export default App;