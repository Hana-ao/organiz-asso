import React, { useState} from 'react';
import axios from 'axios'; // Importer Axios
import '../styles/Login.css';
import {Link} from "react-router-dom"

function Login({history}) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    axios.defaults.baseURL = 'http://localhost:4000';
    
   
    async function handleSubmit(event) {

        event.preventDefault();
        const currentUser = { login, password };
        try {
            const response = await axios.post('/api/user/login', currentUser);
            // Vérifier si la réponse est OK (status 200)
            if (response.status !== 200) {
                throw new Error('Identifiant ou mot de passe incorrect');
            }
            const userData = response.data.user;
            console.log("Les données userData sont: " + JSON.stringify(userData));
            history.push({
                pathname: '/forum',
                state: { currentUser : userData}
            });
            
            window.location.reload(); //permet de recharger la page
            // Appeler la fonction de connexion passée en tant que prop depuis MainPage
        } catch (error) {
            setError(error.message);
        }
    }

    function handleChangeLogin(event) {
        setLogin(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleClick(){
        window.location.reload();
      }

    return (
        <div className='login'>
            <h2>Connexion</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor='login'>Identifiant </label>
                
                <input
                    id='login'
                    onChange={handleChangeLogin}
                    type="text"
                    value={login}
                />

                

                <label htmlFor='pass'>Mot de passe</label>
                
                <input
                    id="pass"
                    onChange={handleChangePassword}
                    type="password"
                    value={password}
                />
                <br />
                <button type="submit">Se connecter</button>
                <br />
                <Link to="/signin" >Vous n'avez pas de compte ? Inscrivez vous ici</Link>
                <Link to="mainpage">Retour à la page d'accueil</Link>
            </form>
        </div>
    );
}

export default Login;
