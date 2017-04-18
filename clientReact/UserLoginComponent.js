const React = require("react")
const io  = require('socket.io-client');
import {socket} from './main.js'

export class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }
  handleNameChange(event){
    console.log('this is happenings')
    console.log('handle name ')
    const state = this.state;
    state.username = event.target.value;
    this.setState(state)
  }
  handleSubmit(e){
    e.preventDefault();
    socket.emit('addUser', this.state.username)
    this.props.logged(true)

  }
  render(){
    return(
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="username" onChange={this.handleNameChange} value={this.state.username}/>
          </form>
        </div>
      </div>
      )
  }

}

