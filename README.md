# League of Legends pour les nuls

Cette API va permettre d'avoir des informations vulgarisées sur les personnages du jeu League of Legends pour les néophytes.

## Installation :

Pour exécuter ce projet localement vous devrez suivre ces étapes :

1. Clonez le dépôt : `git clone https://github.com/MtxYohann/API_Lol_Pour_Les_Nuls.git`
2. Installez les dépendances : `npm install express express-validator dotenv bcryptjs jsonwebtoken mongoose multer`
3. Pour faire des tests Installez les dépendances : `npm install -D @babel/core @babel/node @babel/preset-env @types/jest jest supertest` 
4. Créer un fichier .env et mettre les valeurs du .env.example en les remplaçants par les votre
5. Lancez le serveur : `npm start`

## Fonctionnalités :

### Création de compte
Cette API nécessite d’être connecté, on doit avant créer un compte il faut donc sur VsCode dans le fichier app.http utiliser cette commande
 ```bash
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
    "email": "exemple@gmail.com",
    "password": "Exem3le.123",
    "name": "",
    "phoneNumber": ""
}
```
Les paramètres peuvent être changé, email doit avoir la même nomenclature qu’un mail classique et le mot de passe doit au moins comporter 8 caractères, une majuscule, une minuscule, un nombre, un symbole.

### Connection au compte
On peut ensuite se connecter avec ce compte, pour se connecter il faut utiliser vos identifiant.
```bash
POST http://localhost:3000/auth/signin
Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "Te2t.1234"
}
```
Un token vas alors être créer il faudra le copier et utiliser POSTMAN pour la suite.
 
![Alt text](/images/gitImg/token.jpg)


Il faut mettre comme type d’authorization Bearer Token et sur la droite rentrer le token copier plus tôt.

### Accès API
on peut maintenant avoir accès à l'API en utilisant la méthode `GET` et le lien `http://localhost:3000/Champions/`.

Se chemin est protégé et il n’est pas accessible sens token et si le token est inexistant ou faux.

### Création de champion

Toujours en étant connecté avec son compte on vas pouvoir créer un champion,

![Alt text](/images/gitImg/creation.jpg)

Vous ne pouvez pas créer un personnage si le nom est déjà emprunté.

### Modification de champion 

Toujours en étant connecté avec son compte on vas pouvoir modifier un champion,

![update](/images/gitImg/update.jpg)

il faut mettre l'ID du champion dans l'URL.

### Supression de champion 

Toujours en étant connecté avec son compte on vas pouvoir supprimer un champion,

Il suffit d'utiliser la méthode `DELETE` et de mettre l'url `http://localhost:3000/Champions/:id` ainsi que l'id du champion souhaité.

### Uploads d'un fichier 

En étant connecté on vas pouvoir télécharger un fichier qui ont les extensions suivante `png/jpg/jpeg`.

Avec la méthode `POST` et l'URL `http://localhost:3000/uploads/image` et le fichier que l'on souhaite dans le body sur postman.

![upload](/images/gitImg/upload.jpg)

### TEST