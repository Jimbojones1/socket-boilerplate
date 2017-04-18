const React    = require('react')
const ReactDOM = require('react-dom');
const   io       = require('socket.io-client');
export const socket   = io.connect();

import {ChatRoom} from './ChatroomContainerComponent.js'
import {Username} from './UserLoginComponent.js'
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







ReactDOM.render(<Container />, document.getElementById('app'))

