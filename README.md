# p7Groupomania

Installation de l'application.

Aller dans le dossier Back.

Dans le fichier app.js rempplacer le cluster mongoDB existant par le votre.

Commencez par créer un fichier .env.

Créer les variables suuivante avec les informations correspondantes :

DB_USERNAME: indiquer le nom d'utilisateur pour votre cluster.
DB_PASSWORD: indiquer le mot de passe de votre cluster.
DB_SECRET_TOKEN: indiquer la clé secret pour votre token.

Faites ensuite "npm install" dans la console afin d'installer les outils nécessaire pour faire fonctionner le backend. 

Démarrer votre serveur avec la commande "npm start" ou "nodemon". Le serveur va démarrer sur le port 5000.

Aller ensuite dans le dossier front.

Faite "npm install" dans la console afin d'installer l'application.

Démarrer l'application avec la commande "npm start".

L'application souvrira automatiquement sur le port 3000.
