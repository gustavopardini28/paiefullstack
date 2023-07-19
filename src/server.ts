import { randomUUID } from 'crypto';
import express from 'express'

interface User {
  id: string,
  name: string,
  age: number
}

let users:User[] = []

const app = express();

app.use(express.json());

app.post('/users', (req,res) => {
  const user = req.body
  users.push({
    age: user.age,
    name: user.name,
    id: randomUUID()
    
  })
 res.status(201).send('Sucessfully added')
});


app.get('/users', (req,res) => {
  const { orderedUser } = req.query;

  const sortedUsers = users.sort((a,b) => {
    if ( orderedUser === "desc" ) {
      return a.id < b.id ? 1 : -1
    }
    return a.id > b.id ? 1 : -1
  })
  res.send(sortedUsers);
});

app.get('/users/:id', (req,res) => {
  const { id } =  req.params;

  const user = users.find( user => user.id === id )
  if ( !user ) {
    return res.send(404).json({ message: 'User not found' })
  }
  res.send(user)
})

app.put('/users/:id', (req,res) => {
  const { id } = req.params;
  const { name } = req.body;

  const userExists = users.find( user => id === user.id )

  if ( !userExists ) {
    return res.send(400).json({ messgae: 'user not found'});
  }

  users = users.map( user => {
    if ( user.id === id ) {
      return {...user, name}
  }

  return user;
});
  return res.json({ message: 'name changed' })
});

app.delete('/users/:id', (req,res) => {
  const { id } = req.params;
  users = users.filter( user => user.id !== id)

  return res.json({ message: 'user deleted' })

});


app.listen(3000,() => {
  console.log('server is listening on port 3000');
});

// c - create ✔
// r - read ✔
// u - update ✔
// d - delete ✔