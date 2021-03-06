const React    = require('react')

export function Users(props){
    var users = props.usernames.map((user, i) => {
      return <li key={i}>{user}</li>
    })

    return (
      <div className="three columns">
        <h3>Users</h3>
        <ul className="room-list-users">
          {users}
        </ul>
      </div>
      )
}


