import jwt from "jsonwebtoken";

export default function auth(request, response, next) {
    // recuperer le header authorization
    const header = request.header("Authorization");
    console.log("ICI",request.headers)
    if (request.headers.authorization != null){
        // "Bearer token"
        const array = header.split(" ");
        if (array.length !== 2) {
            return response.status(401).json({ message: "Unauthorized" });
        }
        const token = array[1];

        console.log(("TOKEN LA", token))
        // si le token n'est pas existant, on renvoie une erreur 401
        if (!token) {
            return response.status(401).json({ message: "Unauthorized" });
        }
        let decodedToken;
        // faire des try catch pour gerer les erreurs
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // verifier si le token est null

        // vous allez ensuite modifier request pour qu'il contiennent des infos relatives
        // au user authentifié
        request.user = decodedToken;
        next();
    } else {
        response.status(404).json({ message: "Action impossible" });
    }
}