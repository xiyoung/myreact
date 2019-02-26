import React, { Component } from 'react'
import './index.css'

class App extends Component {
  getNotificationsCount(n) {
    return n > 0 ? <span>您有（{n}）条未读消息</span> : <span>没有未读消息</span>
  }
  render () {
    return (
        <h5>
            {this.getNotificationsCount(0)}
        </h5>
    )
  }
  
}

export default App;