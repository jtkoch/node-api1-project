const express = require("express")
const db = require("./database.js")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
  res.json({ message: "hello, world"})
})

server.get("/users", (req, res) => {
  const users = db.getUsers()

  if (users) {
    res.json(users)
  } else {
    res.status(500).json({
      errormessage: "The users information could not be retrieved."
    })
  }
})

server.get("/users/:id", (req, res) => {
  const userId = req.params.id
  const user = db.getUserById(userId)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    })
  }
})

server.post("/users", (req, res) => {
  if (!req.body.name, !req.body.name) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    }) 
  }
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  })
  res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
      bio: req.body.bio || user.bio
    })
    res.json(updatedUser)
  } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
    })   
  }
})

server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    db.deleteUser(user.id)
    res.status(204).end()
  } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
    })  
  }
})

server.listen(5000, () => {
  console.log("server started at port 5000")
})