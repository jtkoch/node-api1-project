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
      message: "The user with the specified ID does not exist."
    })
  }

  if (user) {
    res.json(user)
  } else {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved."
    })
  }
})


server.post("/users", (req, res) => {
  if (!req.body.name, !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    }) 
  }

  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  })
  if (newUser) {
    res.json(newUser)
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database."
    })
  }
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

  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    })
  }

  if (updatedUser) {
    res.json(updateUser)
  } else {
    res.status(500).json({
      errorMessage: "The user information could not be modified."
    })
  }

  if (updatedUser) {
    res.json(updatedUser)
  }

})


server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)

  if (!user) {

    res.status(404).json({
    message: "The user with the specified ID does not exist.",
    })
  } 
  if (user) {    
    db.deleteUser(user.id)
    res.status(200).json({
      message: `User${req.params.id} has been deleted`
    })
  } else {
    res.status(500).json({
      errorMessage: "The user could not be removed."
    })
  }
})

server.listen(5000, () => {
  console.log("server started at port 5000")
})