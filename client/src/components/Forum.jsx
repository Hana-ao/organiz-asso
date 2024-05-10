import React from 'react';
import MessageList from "./MessageList";
import { withRouter } from 'react-router-dom';
import Logout from "./Logout";
import '../styles/Forum.css';
import SearchMessages from "./SearchMessages";
import AdminPanel from './AdminPanel';


function Forum(props) {
    const { history, location} = props;
    const currentUser = location.state ? location.state.currentUser : null;

    const isAdmin = currentUser && currentUser.isAdmin; //Si currentUser est null ou undefined, alors isAdmin sera automatiquement false sans même vérifier currentUser.isAdmin
    console.log("Verification de isAdmin : " + isAdmin);
    

    function handleClickProfilePage() {
        history.push({
            pathname: "profile",
            state: {currentUser: currentUser}
        })
        window.location.reload(); //permet de recharger la page
    }

    return (
        <>
            <div className="forum-container">
            <header>
                <h1>Forum OrganizAsso</h1>
                <SearchMessages />
                <button className="custom-button-pageprofil" onClick={handleClickProfilePage}>Aller sur la page de profil</button>
                <Logout history={history} />
                
            </header>
           
            
            <main>
                <div className="message-panel">
                <MessageList currentUser={currentUser} /> </div>
                <div className="search-panel">
                    {isAdmin && (<AdminPanel currentUser={currentUser} isAdmin={isAdmin} />)}
                    
                </div>
            </main>
            <footer>
                <p>&copy; 2024 OrganizAsso. Tous droits réservés.</p>
            </footer>
            </div>
            
        </>
    );
}

export default withRouter(Forum); 