import jwt from "jsonwebtoken";

export default function auth(request, response, next) {
    // recuperer le header authorization
    const header = request.header("Authorization");
    if (request.headers.authorization != null){
        // "Bearer token"
        const array = header.split(" ");
        if (array.length !== 2) {
            return response.status(401).json({ message: "Votre session n'est pas valide" });
        }
        const token = array[1];
        // si le token n'est pas existant, on renvoie une erreur 401
        if (!token) {
            return response.status(401).json({ message: "Votre session n'est plus valide" });
        }    
        let decodedToken;
        // faire des try catch pour gerer les erreurs
        try {            
            decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            // verifier si le token est null

            // vous allez ensuite modifier request pour qu'il contiennent des infos relatives
            // au user authentifié
            request.user = decodedToken;
            next();
        } catch (error) {
            return response.status(401).json({ message: "Votre token n'est pas valide" });

        }
               
    } else {
        response.status(401).json({ message: "Vous n'êtes pas connecté" });
    }
}