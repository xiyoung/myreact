import React, {Component} from 'react';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            content: ''
        }
        this.commonInput = {}
    }
    componentWillMount() {
        this.setState({
            username: this._loadUserName()
        })
    }

    _loadUserName() {
      return window.localStorage.getItem('username')
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
            const { username, content} = this.state;
            if(!username) {
                alert('请输入用户名');
                return;
            }
            if(!content) {
                alert('请输入评论内容');
                return;
            }
            this.props.onSubmit({username, content, created_at: Date.now()})
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
    constructor() {
        super();
        this.state = {
            timeApart: ''
        }
    }

    componentWillMount() {
        this._updateAt();
        this._timer = setInterval(() => {
            this._updateAt();
        }, 5000);
    }

    _updateAt() {
        const timeApartStamp = Date.now() - this.props.created_at;
        this.setState({
            timeApart: Math.round(timeApartStamp/1000) >= 60 ? `${Math.round(timeApartStamp / 1000 / 60)}分钟前` : `${Math.max(Math.round(timeApartStamp / 1000), 1)}秒前`
        })
    }

    handleDeleteClick() {
        this.props.onDelete(this.props.index);
    }

    getProcessedContent(content) {
        console.log(content.replace(/`([\S\s]+?)`/g, '<code>$1</code>'));
        return content.replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    render() {
        return (
            <div className="comment-content">
                <div className="user"><span>{this.props.username}</span></div>：
                <div className="content" dangerouslySetInnerHTML={{ __html: this.getProcessedContent(this.props.content)}}></div>
                <div className="time-content"><span>{this.state.timeApart}</span></div>
                <div className="delete-content"><span onClick={this.handleDeleteClick.bind(this)}>删除</span></div>
            </div>
        )
    }
    componentWillUnmount() {
        clearInterval(this._timer)
    }
}

class CommentLists extends Component {
    static defaultProps = {
        commentsArr: []
    }

    onDelete(index) {
        this.props.onDelete(index);
    }

    render() {
        return (
            <div className="comments-list-content">
                {this.props.commentsArr.map((comment, index) => <Comment onDelete={this.onDelete.bind(this)} username={comment.username} content={comment.content} created_at={comment.created_at} index={index} key={index} />)}
            </div>
        )
    }
}

class CommentApp extends Component {
    constructor() {
        super();
        this.state = {
            commentsArr: []
        }
    }
    componentWillMount() {
        this.setState({
            commentsArr: JSON.parse(this._loadComments())
        })
    }
    _loadComments() {
       return window.localStorage.getItem('commentsArr') || [];
    }
    _saveUserName(username) {
        window.localStorage.setItem('username', username);
    }
    _saveComments(commentsArr) {
        window.localStorage.setItem('commentsArr', commentsArr);
    }
    onSubmit(common) {
        this.state.commentsArr.push(common);
        this.setState({
            commentsArr:  this.state.commentsArr
        }, () => {
            this._saveComments(JSON.stringify(this.state.commentsArr));
            this._saveUserName(common.username);
        })
    }
    onDelete(index) {
        this.setState({
            commentsArr: this.state.commentsArr.filter((commen, i) => i !== index)
        }, () => {
            this._saveComments(JSON.stringify(this.state.commentsArr)); 
        })

    }
    render() {
        return (
        <div className="wrap">
            <Input onSubmit={this.onSubmit.bind(this)} />
            <CommentLists onDelete = {this.onDelete.bind(this)} commentsArr={this.state.commentsArr} />
        </div>
        )
    }
}

export default CommentApp;