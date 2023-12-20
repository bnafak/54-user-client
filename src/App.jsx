import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); 
          const newUsers = [...users, data]
          setUsers(newUsers)
          form.reset();
    })
  }

  return (
    <>
      <h1>React Users</h1>
      <h3>Number of Users : {users.length}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" id="" />
        <br />
        <input type="email" name="email" placeholder="Email" id="" />
        <br />
        <input type="submit" value="Add user" />
      </form>
      <div>
        {users.map(user => ( 
          <p key={user.id}>
            {user.id} : {user.name} : {user.email}
          </p>
        ))
        }
      </div>
    </>
  );
}

export default App;
