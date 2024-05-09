import { useState, useEffect } from 'react';
import '../styles/SignIn.css';
import axios from 'axios';
import { Link } from "react-router-dom";



function SignIn({ history }) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    axios.defaults.baseURL = 'http://localhost:4000';


    function handleChange(e) {

        const { name, value } = e.target;

        switch(name) {
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

        try {
            const user = { name, lastName, login, email, password };

            console.log("User Data:", user);

            // Créer une demande d'inscription
            const requestResponse = await axios.post("/api/request", user);
            console.log("Demande d'inscription créée :", requestResponse.data);

            alert("Votre demande d'inscription a été soumise avec succès et est en attente de validation par un administrateur");

            // Rediriger l'utilisateur vers une page de confirmation ou de connexion
            // history.push("/login");
        } 
        catch (error) {
            console.log("Erreur lors de l'inscription", error);
        }
    }

    return (
        <div className='signin'>
            <h2>Inscription</h2> 
            <form className='signin-form' onSubmit={handleSubmit}>
                <label>Prénom</label> <label>Nom</label>
                <input type="text" name="name" value={name} onChange={handleChange} className='input-signin-name'/>
                <input type="text" name="lastName" value={lastName} onChange={handleChange} className='input-signin-lastName'/>

                <label>Identifiant</label>
                <input type="text" name="login" value={login} onChange={handleChange} className='input-signin-login'/>

                <label>E-mail</label>
                <input type="email" name="email" value={email} onChange={handleChange} className='input-signin-email'/>
                
                <label>Mot de passe</label>
                <input type="password" name="password" value={password} onChange={handleChange} className='input-signin-password'/>

                <label>Confirmer le mot de passe</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} className='input-signin-confirmpassword'/>

                <button type="submit">S'inscrire</button>
                <Link to="/login" >Vous avez déjà un compte ? Identifiez vous ici </Link>

            </form>
        </div>
    );
}

export default SignIn;
