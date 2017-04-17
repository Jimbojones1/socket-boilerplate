var React    = require('react')
var ReactDOM = require('react-dom');
var io       = require('socket.io-client');
export var socket   = io.connect();

import {ChatRoom} from './Chatroom.js'

// console.log(ChatRoom)
class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: false
    };

    this.handleLogin = this.handleLogin.bind(this)
    // this.handleLogin.bind(this)
  }
  handleLogin(logged){
   let state = this.state;
   state.logged = logged;
   this.setState(state)
  }
  render() {
    return (
      <div className="container">
        {this.state.logged ? <ChatRoom /> : <Username logged={this.handleLogin}/>}
      </div>
      )
  }
}



var Username = React.createClass({
  getInitialState: function(){
    return {username: ''}
  },
  handleSubmit: function(e){
    e.preventDefault();

    socket.emit('addUser', this.state.username)

    this.props.logged(true)
  },
  handleNameChange: function(event){
    const state = this.state;
    state.username = event.target.value;
    this.setState(state)
  },
  render: function(){
    return (
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="username" onChange={this.handleNameChange} value={this.state.username}/>
          </form>
        </div>
      </div>
      )
  }
})


ReactDOM.render(<Container />, document.getElementById('app'))

