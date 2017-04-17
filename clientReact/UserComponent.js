var React    = require('react')

export var Users = React.createClass({
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
