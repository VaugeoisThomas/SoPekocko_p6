# SoPekocko_p6

## Récupération du projet
```
git clone https://github.com/VaugeoisThomas/SoPekocko_p6.git
npm install
```

## Coté Front-end

Veuillez vous rendre dans le dossier Front-end et exécuter la commande :
```
  ng serve
 ```
Cette commande permettra de lancer Angular, afin d'avoir un visuel sur le site !

## Coté Back-end

Veuillez également vous rendre dans le dossier Back-end et exécuter la commande :

```
  node .\server.js
```
Cette commande permettra de lancer le serveur de l'application, et ainsi pouvoir accés à toutes les fonctionnalités de ce dernier !


## Pour la sécurité !

Utilisation de Helmet afin de protéger les HEADERS du serveur !
https://www.npmjs.com/package/helmet
Utilisation de maskdata afin de masquer les emails en base de données afin de protéger la récupération de ses dernières !
https://www.npmjs.com/package/maskdata
Utilisation de sanitize afin de nettoyer les champs pour éviter les failles XSS
https://www.npmjs.com/package/express-mongo-sanitize
Utilisation d’un fichier .env afin de protéger les données sensibles !
Génération d’un token de sécurité afin de sécuriser et limiter les actions d’un utilisateur !


