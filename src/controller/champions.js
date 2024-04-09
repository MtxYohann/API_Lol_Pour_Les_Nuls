import { mockChampions } from "../data/mock.js";

export const getChampions = (req, res) => {
    res.json(mockChampions);
  };
  
  export const getChampion = (request, response) => {
    const id = parseInt(request.params.id, 10);
    console.log(id);
    if (isNaN(id)) {
      response.status(400).json({ message: "Invalid id" });
    }
    const Champion = mockChampions.find((Champion) => Champion.id === id);
    if (Champion) {
      response.json(Champion);
    } else {
      response.status(404).json({ message: "Champion not found" });
    }
  };
  
  export const createChampion = (request, response) => {
    const bodyContent = request.body;
    const id = mockChampions.length + 1;
    const newChampion = { id, ...bodyContent };
    mockChampions.push(newChampion);
    response.status(201).json(newChampion);
  };
  
  export const udpateChampion = (request, response) => {
    const id = parseInt(request.params.id, 10);
    const bodyContent = request.body;
    const Champion = mockChampions.find((Champion) => Champion.id === id);
    if (Champion) {
      const updatedChampion = { ...Champion, ...bodyContent };
      const index = mockChampions.findIndex((Champion) => Champion.id === id);
      mockChampions[index] = updatedChampion;
      response.json(updatedChampion);
    } else {
      response.status(404).json({ message: "Champion not found" });
    }
  };
  
  export const deleteChampion = (request, response) => {
    const id = parseInt(request.params.id, 10);
    const Champion = mockChampions.find((Champion) => Champion.id === id);
    if (Champion) {
      mockChampions = mockChampions.filter((Champion) => Champion.id !== id);
      response.status(204).end();
    } else {
      response.status(404).json({ message: "Champion not found" });
    }
  };