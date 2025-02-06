/*const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./models/User'); // importation du  modele user  
*/
import express, { response } from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import { request } from "http";
const app = express();
const port = 4000;

app.use(express.json());
//connect to mongodb database
const uri =
  "mongodb+srv://oonnonon:oonnonon@cluster0.paelt.mongodb.net/person_Api?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

async function createUsers() {
  try {
    const Users = [
      { name: "Sally", email: "sally@gmail.com", city: "Rabat" },
      { name: "Noor", email: "Noor@gmail.com", city: "Casablanca" },
      { name: "Anass", email: "Anass@gmail.com", city: "SAlé" },
      { name: "Omar", email: "omar@gmail.com", city: "Casablanca" },
    ];
    await User.create(Users);
    const allusers = await User.find();
    console.log("l' instansiation est successive !!!\n", allusers);
  } catch (error) {
    console.error(error);
  }
}
//createUsers();
app.get('/hello',(request,response)=>
{
    response.send(`Hellooo to My App ${request.query.yourName}`);
})
//afficher touts les users
//GET : RETOURNER TOUS LES UTILISATEURS
app.get("/", async (request, response) => {
  const getAllUsers = await User.find();
  response.status(200).json(getAllUsers);
});
//ajouter un nouveaux user
app.post("/User", async (request, response) => {
  try {
    //constructeur
    const addUser = new User({
      name: request.body.name,
      age: request.body.age,
      email: request.body.email,
      city: request.body.city,
    });
    await addUser.save();
    response.status(201).send(addUser); //201 Created : La requête a réussi et une nouvelle ressource a été créée sur le serveur.
    console.log("Nouveau User : \n", addUser);
  } catch (error) {
    response.status(500).send(error);
  }
});

// PUT : ÉDITER UN UTILISATEUR PAR ID
app.put("/userPut/:id", async (request, response) => {
  try {
    //const id = request.params.id;
    //  const findUser = await User.findById({ _id: request.params.id });
    /* const { name,  email, city } = request.body;
    if (name) {
       findUser.name = name;
     }
     if (email) {
       findUser.email = email;
     }
     if (city) {
       findUser.city = city;
     }*/
    const  { name,email, city } = request.body;
    const update={ name,email, city };
    const findUser = await User.findOneAndUpdate(
      { _id: request.params.id },
      update,
      { new: true }
    );

    response.status(200).json(findUser);
    console.error(`Voila le resultat de la modification du User ${findUser.name} `);
  } catch (error) {
    console.error("Error :", error);
    response.status(500).send("Erreur lors de la modification");
  }
});

// SUPPRIMER UN UTILISATEUR PAR ID
app.delete("/userDelete/:id", async (request, response) => {
  try {
    const findTodelete = await User.findByIdAndDelete({
      _id: request.params.id,
    });
    if (findTodelete) {
      response.send(`User avec le nom :${findTodelete.name} a ete supprimer !`);
    }
  } catch (error) {
    console.error("Error :", error);
  }
});

app.listen(port, () => {
  console.log("serveur ecoutant sur http://localhost:" + port);
});
