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
})

app.get('/users', (req,res) => {
  res.json({
    users
  })
})

app.put('/users/:id', (req,res) => {
  const userId = req.params.id;
  const targetName = req.body.name;
  const targetUser = users.find( user => userId === user.id )
  if ( !targetUser ) {
    return res.status(404).json({ message: 'User not found' })
  }
  targetUser.name = targetName;
  return res.json({ message: 'name changed' })
})

app.delete('/users/:id', (req,res) => {
  const userId = req.params.id;
  const usersFiltered = users.filter( user => userId !== user.id );
  users = usersFiltered;

  return res.json({ message: 'user deleted' })

})

app.listen(3000,() => {
  console.log('server is listening on port 3000');
})

// c - create ✔
// r - read ✔
// u - update ✔
// d - delete ✔