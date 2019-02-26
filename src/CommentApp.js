import React, {Component} from 'react';

const setItem =(key, value) => {
    window.localStorage.setItem(key, value);
}

const getItem =(key) => {
   return window.localStorage.getItem(key);
}

class Input extends Component {
    constructor() {
        super();
        this.state = {
            username: getItem('username') || '',
            content: ''
        }
        this.commonInput = {}
    }
    componentDidMount() {
        this.commonInput.focus();
    }
    
    inputChangeHandle(e) {
        this.setState({
            username: e.target.value
        })
    }

    textChangeHandle(e) {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit() {
        if(this.props.onSubmit) {
            const {username, content} = this.state;
            if(!username) {
                alert('请输入用户名');
                return;
            }
            if(!content) {
                alert('请输入评论内容');
                return;
            }
            this.props.onSubmit({username, content})
            this.setState({
                content: ''
            })
            
        }
    }
    render() {
        return (
            <div className="input-content">
                <div className="user-content"><span>用户名：</span><input onChange={this.inputChangeHandle.bind(this)} value={this.state.username} /></div>
                <div className="text-content"><span>评论内容：</span><textarea ref={input => this.commonInput = input} onChange={this.textChangeHandle.bind(this)} value={this.state.content}></textarea></div>
                <div className="button-content"><button onClick={this.handleSubmit.bind(this)}>发布</button></div>
            </div>
        )
    }
}

class Comment extends Component {
    render() {
        return (
            <div className="comment-content">
                <div className="user"><span>{this.props.username}</span></div>
                <div className="content"><span>：</span>{this.props.content}</div>
            </div>
        )
    }
}

class CommentLists extends Component {
    static defaultProps = {
        commentsArr: []
    }
    render() {
        return (
            <div className="comments-list-content">
                {this.props.commentsArr.map((comment, index) => <Comment username={comment.username} content={comment.content} key={index} />)}
            </div>
        )
    }
}

class CommentApp extends Component {
    constructor() {
        super();
        this.state = {
            commentsArr: JSON.parse(getItem('commentsArr')) || []
        }
    }
    onSubmit(common) {
        this.state.commentsArr.push(common);
        this.setState({
            commentsArr:  this.state.commentsArr
        }, () => {
            setItem('commentsArr', JSON.stringify(this.state.commentsArr));
            setItem('username', common.username);
        })
    }
    render() {
        return (
        <div className="wrap">
            <Input onSubmit={this.onSubmit.bind(this)} />
            <CommentLists commentsArr={this.state.commentsArr} />
        </div>
        )
    }
}

export default CommentApp;