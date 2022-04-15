# Projet NodeJS

## L’équipe

Abdoul ZAKARI - Melien Roldy PIERRE

<br>


## Introduction

Nous avons choisi de créer une API qui permet d'avoir accès à aux NFTs qui sont sur les marketplaces telque Opensea :
- Créer une collection
- Mise à jour de collection
- Faire des rechches de nft
- Ajouter des nft à sa collection
- Obtenir les propriétaires des Nft
- Voir les metadata des nft de sa collection
- Supprimer des nft de sa collection
- Ajouter des commentaires à sa collection  


<br>

## Collection postman 

Le fichier `Projet NodeJS.postman_collection.json` est une collection postman contenant les requêtes vers les différents `endpoints` l'api


<br>

## Les dépendances du projet

les dépendances du projet

>`bcrypt` Pour hacher les mots de passe <br>
>`body-parser` Pour analysez les corps de requête entrants dans un middleware, disponibles dans `req.body` <br>
>`dotenv` Pour charger les variables d'environnement <br>
>`express-validator` Pour la validation de données <br>
>`mongoose` Pour la modélisation d'objet MongoDB conçu pour fonctionner dans un environnement asynchrone <br>
>`moralis` Moralis fournit un backend géré pour les projets blockchain. Il synchronise automatiquement les soldes des  utilisateurs dans la base de données, et permet de mettre en place des alertes sur la chaîne, de surveiller les événements des contrats intelligents, de construire des index. <br>
>`passport`  Middleware d'authentification compatible avec Express <br>
>`stripe` Pour les paiements <br>
>`passport-google-oauth20` Pour l'authentification avec google<br>
>...

<br>


## Installation

Installation des modules:

```
npm i
```

Une fois tous les modules installés, vous devez créer un fichier `.env` à la racine de votre répertoire local pour y indiquer les valeurs des différentes variables d'environnement nécessaires pour le fonctionnement de l'API : 

Installer mongodb et ajouter à `MONGO_URL=` le lien vers la base de données

Creer un serveur Moralis
```
NFT_API_APP_ID=
NFT_API_MASTER_KEY=
NFT_API_SERVER_URL=
```
>[https://docs.moralis.io/moralis-dapp/web3-sdk](Documentation)

```
# NODE Serveur
PORT=...
ALLOWED_ORIGINS=...

# MONGO
MONGO_URL=...

# JWT
JWT_SECRET=...

# Google OAUTH
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

# MONGO
MONGO_URL=

#NFT API
NFT_API_APP_ID=
NFT_API_MASTER_KEY=
NFT_API_SERVER_URL=
```


<br>

Pour ensuite lancer l'API avec la commande : 

```
npm start 
```