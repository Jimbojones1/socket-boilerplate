const React    = require('react')
const io       = require('socket.io-client');
import {socket} from './main.js'

export class ChatBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageValue: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    socket.emit('message', this.state.messageValue)
    const state = this.state;
    state.messageValue = '';
    this.setState(state)
  }
  handleMessageChange(event){

    var state = this.state;
    state.messageValue = event.target.value;
    this.setState(state)
  }
  render(){

     var messages = this.props.messages.map( (message, i) => {
      console.log('something', message.username, this.props)
      if(message.username  === this.props.currentUser){
        console.log('if is hitting')
        return <li key={i}><span className="currentUser">{message.username}</span>: {message.message}</li>
      }
      else {
         return <li key={i}>{message.username}: {message.message}</li>
      }

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

}



