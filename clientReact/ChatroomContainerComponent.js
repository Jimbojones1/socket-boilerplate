const React    = require('react')
const io       = require('socket.io-client');
import {socket} from './main.js'
import {ChatBoard} from './ChatBoardComponent'
import {ChatRooms} from './ChatRoomsComponent'
import {Users} from './UserComponent'

export class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: [],
      messages: [],
      rooms: [],
      roomName: 'MainRoom',
      currentUser: ''
    }

  }
  componentDidMount() {
    const state = this.state;

    socket.on('users', (usernames, roomName) =>{

      state.roomName = roomName || this.state.roomName;
      // wrote all this code expecting an array of usernames

      state.usernames = usernames;
      this.setState(state)
    })

    socket.on('all messages', (messages, username) =>{
      console.log('all messages', messages)
      state.messages = messages;
      state.currentUser = username || this.state.currentUser;
      this.setState(state)
    })

    socket.on('rooms', (rooms) => {
      state.rooms = rooms;
      this.setState(state)
    })
  }
  render() {

    return (
      <div className="row">
        <Users usernames={this.state.usernames}/>
        <ChatBoard messages={this.state.messages} roomName={this.state.roomName} currentUser={this.state.currentUser}/>
        <ChatRooms rooms={this.state.rooms} roomName={this.state.roomName}/>
      </div>
      )
  }
}




