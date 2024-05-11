import { useState, useEffect } from 'react';
import '../styles/SignIn.css';
import axios from 'axios';
import { BrowserRouter, Link } from "react-router-dom";

function SignIn({ history }) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loginExists, setLoginExists] = useState(false); // State pour vérifier l'existence du login
    axios.defaults.baseURL = 'http://localhost:4000';


    useEffect(() => {
        // Vérifier si le login existe lorsqu'il change
        const checkLoginExists = async () => {
            try {
                const response = await axios.post('/api/user/exist', { login });
                setLoginExists(response.data.exists);
            } catch (error) {
                console.error("Erreur lors de la vérification de l'existence du login :", error);
            }
        };

        if (login) {
            checkLoginExists();
        }
    }, [login]);

    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "login":
                setLogin(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Avertissement : les deux mots de passe sont différents ! ");
            return;
        }

        if (loginExists) {
            alert("Avertissement : Ce login est déjà utilisé, veuillez en choisir un autre.");
            setLogin(""); // Efface le champ de login pour que l'utilisateur puisse en choisir un autre
            return;
        }

        try {
            const user = { name, lastName, login, email, password };
            const requestResponse = await axios.post("/api/request", user);
            alert("Votre demande d'inscription a été soumise avec succès et est en attente de validation par un administrateur");
        } catch (error) {
            console.log("Erreur lors de l'inscription", error);
        }
    }

    return (
        <div className='signin'>
            <BrowserRouter forceRefresh ={true}>
            <h2>Inscription</h2> 
            <form className='signin-form' onSubmit={handleSubmit}>
                <label>Prénom</label> 
                <input type="text" name="name" value={name} onChange={handleChange} className='input-signin-name'/>
                <label>Nom</label>
                <input type="text" name="lastName" value={lastName} onChange={handleChange} className='input-signin-lastName'/>
                <label>Identifiant</label>
                <input type="text" name="login" value={login} onChange={handleChange} className='input-signin-login'/>
                {loginExists && <p style={{ color: "red" }}>Ce login est déjà utilisé, veuillez en choisir un autre.</p>}
                <label>E-mail</label>
                <input type="email" name="email" value={email} onChange={handleChange} className='input-signin-email'/>
                <label>Mot de passe</label>
                <input type="password" name="password" value={password} onChange={handleChange} className='input-signin-password'/>
                <label>Confirmer le mot de passe</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} className='input-signin-confirmpassword'/>
                <button type="submit" >S'inscrire</button>
                <Link to="/login" >Vous avez déjà un compte ? Identifiez vous ici </Link>
                <Link to="mainpage">Retour à la page d'accueil</Link>
            </form>
            </BrowserRouter>
        </div>
    );
}

export default SignIn;
