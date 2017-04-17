var React    = require('react')
var io       = require('socket.io-client');
import {socket} from './main.js'

export class ChatRooms extends React.Component {
  constructor(props) {
    super(props);
  }
  joinRoom(){
    socket.emit('join room', e.target.innerText)
  }
  render() {

    var rooms = this.props.rooms.map((room, i) => {
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

