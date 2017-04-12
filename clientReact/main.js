var React    = require('react')
var ReactDOM = require('react-dom');
var io       = require('socket.io-client');
var socket   = io.connect();

var Container = React.createClass({
  getInitialState: function(){
    return {logged: false}
  },
  handleLogin: function(logged){
    var state = this.state;
    state.logged = logged;
    this.setState(state)
  },
  render: function(){
    return (
      <div className="container">
        {this.state.logged ? <ChatRoom /> : <Username logged={this.handleLogin}/>}
      </div>
      )
  }
})

var ChatRoom = React.createClass({
  getInitialState: function(){
    return {usernames: []}
  },
  componentDidMount: function(){
    var state = this.state;
    var self = this;
    socket.on('users', function(usernames){
      // wrote all this code expecting an array of usernames
      state.usernames = usernames;
      self.setState(state)
    })

  },
  render: function(){
    return (
      <div className="row">
        <Users usernames={this.state.usernames}/>
        <ChatBoard />
        <ChatRooms />
      </div>
      )
  }
})

var Users = React.createClass({
  render: function(){
    console.log(this.props.usernames)
    var users = this.props.usernames.map(function(user, i){
      return <li key={i}>{user}</li>
    })


    return (
      <div className="three columns">
        <h3>Users</h3>
        <ul>
          {users}
        </ul>
      </div>
      )
  }
})

var ChatRooms = React.createClass({
  render: function(){
    return (
      <div className="three columns">
        <h3>Rooms</h3>
        <ul>
          <li>THis is where the Chatrooms will be listed</li>
        </ul>
      </div>
      )
  }
})

var ChatBoard = React.createClass({
  getInitialState: function(){
    return {messageValue: ''}
  },
  handleSubmit: function(e){
    e.preventDefault();
    console.log('this is happening')
    socket.emit('message', this.state.messageValue)
  },
  handleMessageChange: function(event){
    var state = this.state;
    state.messageValue = event.target.value;
    this.setState(state)
  },
  render: function(){
    return (
      <div className="six columns">
        <h3>ChatBoard</h3>
        <ul>
          <li>THis is where messages will go</li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.messageValue} onChange={this.handleMessageChange} />
        </form>
      </div>
      )
  }
})



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
    var state = this.state;
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

