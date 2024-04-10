import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (request, response, next) => {
  const { email, password, name, phoneNumber } = request.body;
  // On va hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 12);
  // On cree un nouvel utilisateur
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    phoneNumber,
  });
  const user = await User.findOne({ email: email });
  try {
    if (newUser.email === user.email){
        return response.status(404).json({ message: "Cette Email est deja utilise" }); 
    }           
  } catch (error) {
     // On sauvegarde le nouvel utilisateur
     const doc = await newUser.save();
    
     // si tout s'est bien passé, on renvoie un status 201
     response.status(201).json(doc);
  }
};

export const signin = async (request, response, next) => {
    const { email, password } = request.body;
    // On cherche l'utilisateur dans la base de donnees
    const user = await User.findOne({ email: email });
    if (!user){
        response.status(404).json({ message: "Utilisateur introuvable" });
    } else {
        // si l'utilisateur n'existe pas, on renvoie une erreur

        // si l'utilisateur existe, on compare les mots de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid === true){
            // si le mot de passe est invalide, on renvoie une erreur

            // sinon on genere un token
            const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
            );
            // on renvoie le token
            response.status(200).json({ token });
        } else {
            response.status(404).json({ message: "Mot de pass incorrect" });
        }
    }
};