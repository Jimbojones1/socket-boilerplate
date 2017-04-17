var React    = require('react')
var io       = require('socket.io-client');
import {socket} from './main.js'
import {ChatBoard} from './ChatBoardComponent'
import {ChatRooms} from './ChatRoomComponent'
import {Users} from './UserComponent'

export class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: [],
      messages: [],
      rooms: [],
      roomName: 'MainRoom'
    }

  }
  componentDidMount() {
    var state = this.state;
    var self = this;
    socket.on('users', function(usernames, roomName){

      state.roomName = roomName || "MainRoom"
      // wrote all this code expecting an array of usernames
      state.usernames = usernames;
      self.setState(state)
    })

    socket.on('all messages', function(messages){
      state.messages = messages;
      self.setState(state)
    })

    socket.on('rooms', function(rooms){
      state.rooms = rooms;
      self.setState(state)
    })
  }
  render() {
    return (
      <div className="row">
        <Users usernames={this.state.usernames}/>
        <ChatBoard messages={this.state.messages} roomName={this.state.roomName}/>
        <ChatRooms rooms={this.state.rooms}/>
      </div>
      )
  }
}




