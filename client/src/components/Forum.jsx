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
            <div className="message-page">
                {/* On utilise Link pour créer un lien vers la page de profil */}
               
                    <button className="custom-button-pageprofil" onClick={handleClickProfilePage}>Page de profil</button>
               
           

            <Logout history={history} />
            {/* <div className="message-page-msg"> */}
                <MessageList currentUser={currentUser} />
                <div className="searchmessage">
                    <SearchMessages />
                    {isAdmin && (<div>
                        <AdminPanel />
                        </div>)}
                    
                </div>
            </div>
            
        </>
    );
}

export default withRouter(Forum); 