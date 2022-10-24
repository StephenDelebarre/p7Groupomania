# p7Groupomania

Installation de l'application.

Créez un dossier. Placez vous dans le dossier avec votre terminal.

Depuis ce dossier, dans votre console faite un git clone https://github.com/StephenDelebarre/p7Groupomania

Allez dans le dossier Back.

Dans le fichier "app.js", remplacez le cluster mongoDB existant par le votre.

Commencez par créer un fichier ".env".

Créez les variables suuivantes avec les informations correspondantes :

DB_USERNAME: indiquez le nom d'utilisateur pour votre cluster.
DB_PASSWORD: indiquez le mot de passe de votre cluster.
DB_SECRET_TOKEN: indiquez la clé secrete pour votre token.

Faite ensuite "npm install" dans la console afin d'installer les outils nécessaire pour faire fonctionner le backend. 

Démarrez votre serveur avec la commande "npm start" ou "nodemon". Le serveur va démarrer sur le port 5000.

Allez ensuite dans le dossier front.

Faite "npm install" dans la console afin d'installer l'application.

Démarrez l'application avec la commande "npm start".

L'application souvrira automatiquement sur le port 3000.


ps: Lors de la création de compte, l'application renvoie une erreur 404 mais la création se fait bien (vérifier la base de données)
