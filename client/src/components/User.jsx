

function User({ _id, name, lastName, login, email, isAdmin }) {
    

    return (
        <div>
            <p>Informations sur l'utilisateur n° {_id}</p>
            <p>Prénom : {name}</p>
            <p>Nom : {lastName}</p>
            <p>Identifiant : {login}</p>
            <p>E-mail : {email}</p>
            {isAdmin && <p>Statut : Administrateur</p>}
        </div>
    );
}

export default User;
