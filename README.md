# Projet NodeJS

---

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

>  

<br>

## Les dépendances du projet

les dépendances du projet

<br>


## Installation

Installation des modules:

```
npm i
```

Une fois tous les modules installés, vous devez créer un fichier `.env` à la racine de votre répertoire local pour y indiquer les valeurs des différentes variables d'environnement nécessaires pour le fonctionnement de l'API : 

```
# NODE Serveur
PORT=...
ALLOWED_ORIGINS=...

# MONGO
MONGO_URL=...

# JWT
JWT_SECRET=...

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