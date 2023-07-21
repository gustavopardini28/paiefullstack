import { Router } from "express";
import { CreateUser } from "./services/createUser";
import { GetUsers } from "./services/getUsers";


const getUsers = new GetUsers();
const createUser = new CreateUser();

export const routes = Router();

routes.post('/users',  async (req,res) => {
  const {name, age} = req.body;
   
   await createUser.execute({
     name,
     age
   });
  res.status(201).send('Sucessfully added')
 });
 
 routes.get('/users',async (req,res) => {
   const users = await getUsers.execute();
   res.send(users);
   
 });
 