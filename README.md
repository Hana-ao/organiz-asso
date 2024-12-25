# Organiz’asso

Organiz’asso est un projet de modélisation et de développement d’un site associatif permettant à des membres d’échanger via des forums. Ce projet a été réalisé dans le cadre des TD/TP de modélisation.

📝 Cahier des charges

## Fonctionnalités principales

Hors connexion :
	•	Création de compte.
	•	Inscription nécessitant une validation par un administrateur.

Connecté :
	•	Membres :
	•	Accès au forum ouvert.
	•	Publication de messages :
	•	Répondre à un message existant.
	•	Créer une nouvelle discussion.
	•	Supprimer ses propres messages.
	•	Visualisation du profil (personnel et des autres membres).
	•	Recherche avancée de messages (mots-clés, auteur, intervalle de temps).
	•	Administrateurs :
	•	Accès au forum fermé.
	•	Validation ou rejet des inscriptions des membres.
	•	Gestion des statuts administratifs (ajout ou retrait pour les membres).

Autres fonctionnalités :
	•	Déconnexion sécurisée.

🛠️ Technologies utilisées

Technologie	Description
Frontend	React avec Yarn
Backend	Node.js, Express (API RESTful)
Base de données	MongoDB
Gestion des dépendances	Yarn

🚀 Installation et démarrage

Prérequis
	•	Node.js
	•	Yarn
	•	MongoDB

Étapes d’installation
1.	Clonez le dépôt :

        git clone https://github.com/Hana-ao/organiz-asso.git
        cd organiz-asso


2.	Installez les dépendances backend et frontend :

        yarn install


	3.	Configurez les variables d’environnement dans un fichier .env (exemple : MongoDB URI, ports, etc.).
	4.	Lancez le backend :

            cd server
            yarn start


	5.	Démarrez le frontend :

            cd client
            yarn start


	6.	Accédez à l’application dans votre navigateur : http://localhost:3000.

📂 Structure du projet

organiz-asso/
├── client/           # Frontend (React)
├── server/           # Backend (Node.js, Express)
├── database/         # Fichiers liés à la base MongoDB
├── docs/             # Diagrammes, schémas et documentation
├── package.json      # Dépendances du projet
└── README.md         # Fichier README

📖 Modélisation

Schéma d’interactions

Les composants principaux :
	•	Client : Navigateur des utilisateurs (interface utilisateur).
	•	Serveur : API RESTful en Node.js/Express.
	•	Base de données : MongoDB pour stocker les utilisateurs, messages, et permissions.

Services à implémenter
	1.	DeleteMessage :
	•	Supprime un message (accessible uniquement à son auteur).
	2.	GetMessage :
	•	Recherche avancée des messages (mots-clés, auteur, période de publication).
	3.	Authentification :
	•	Inscription, connexion, et gestion des rôles (membre, administrateur).

Structure de la base de données

Exemple des collections MongoDB :
	•	Users :
	•	Champs : username, email, password, role, status (validé/en attente).
	•	Messages :
	•	Champs : author, content, timestamp, forum_type (ouvert/fermé), replies.

🌟 Fonctionnalités en cours de développement
	•	Amélioration des interfaces utilisateur (React).
	•	Sécurisation des routes backend avec JWT.
	•	Tests unitaires et intégration continue.

📄 Diagrammes et maquettes

Les diagrammes de modélisation (architecture, base de données, schéma d’interaction) sont disponibles dans le dossier docs/.

📜 Licence

Ce projet est distribué sous la licence MIT. Consultez le fichier LICENSE pour plus d’informations.
