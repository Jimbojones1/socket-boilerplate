var React    = require('react')
var io       = require('socket.io-client');
import {socket} from './main.js'
export var ChatBoard = React.createClass({
  getInitialState: function(){
    return {messageValue: ''}
  },
  handleSubmit: function(e){
    e.preventDefault();
    socket.emit('message', this.state.messageValue)
    var state = this.state;
    state.messageValue = '';
    this.setState(state)
  },
  handleMessageChange: function(event){
    var state = this.state;
    state.messageValue = event.target.value;
    this.setState(state)
  },
  render: function(){
    console.log(this.props.messages)
    var messages = this.props.messages.map(function(message, i){
      return <li key={i}>{message.username}: {message.message}</li>
    })


    return (
      <div className="six columns">
        <h3>Welcome to {this.props.roomName}</h3>
        <ul>
          {messages}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.messageValue} onChange={this.handleMessageChange} />
        </form>
      </div>
      )
  }
})

