import express from 'express';
import { createUsers, deleteUsers, getUsers, } from './depositories/mongoDb.js';

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/mokito', (req, res) => {
  res.send('dwadaw')
})

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, age, likes } = req.body;
    await createUsers(name, age, likes);
    const result = await createUsers(name, age, likes);
    res.status(201).json({ message: "User created", userId: result.insertedId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        await deleteUsers(userId);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/post', (req, res) => {
  res.send('POST request to the homepage')
  console.log(req.body)
  console.log(req.body.title)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})