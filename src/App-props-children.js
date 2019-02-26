import React, { Component } from 'react'

class BlackBorderContainer extends Component {
    render () {
        return  (
            <div>
                <div style={{border: '1px solid black'}}>{this.props.children[0]}</div>
                <div style={{border: '1px solid black'}}>{this.props.children[1]}</div>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <BlackBorderContainer>
                <div>div1</div>
                <div>div2</div>
            </BlackBorderContainer>
        )
    }
}

export default App