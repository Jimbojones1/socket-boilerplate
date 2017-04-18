const React    = require('react')
const io       = require('socket.io-client');
import {socket} from './main.js'

export class ChatRooms extends React.Component {
  constructor(props) {
    super(props);

    this.joinRoom = this.joinRoom.bind(this)
  }
  joinRoom(e){
    console.log(e.target.innerText)
    console.log(this.props, ' this.props')
    socket.emit('join room', e.target.innerText, this.props.roomName)
  }
  render() {

    let rooms = this.props.rooms.map((room, i) => {
      return <li key={i} onClick={this.joinRoom}>{room.room}</li>
    })

    return (
      <div className="three columns">
        <h3>Rooms</h3>
        <ul>
          {rooms}
        </ul>
      </div>
      )
  }


}

