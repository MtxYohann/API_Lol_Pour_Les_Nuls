import Champion from "../models/champion.js";
import { validationResult } from "express-validator";

export const getChampions = (req, res) => {
   Champion.find()
    .then((result) => {;
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

export const getChampion = (request, response) => {
  const id = request.params.id ;
  Champion.findById(id)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log(error)
      throw new Error(error);
    });
};
  
export const createChampion = async (request, response) => {
  const bodyContent = request.body;
  const newChampion = new Champion(bodyContent);
  const errors = validationResult(request).array();
  const champion = await Champion.findOne({ name: bodyContent.name });

  if(errors.length === 0 & newChampion === champion.name ) {
    newChampion
      .save()
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }
  else {
    response.status(404).json({ message: "Action impossible" });
  }
};

export const udpateChampion = (request, response) => {
  const id = request.params.id ;
  const bodyContent = request.body;

  Champion.findByIdAndUpdate(id, bodyContent)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log(error)
      throw new Error(error);
    });
};

export const deleteChampion = (request, response) => {
  const id = request.params.id ;
  Champion.findByIdAndDelete(id)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log(error)
      throw new Error(error);
    });
};
