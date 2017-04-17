var React    = require('react')

export function Users(props){
    var users = props.usernames.map(function(user, i){
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


