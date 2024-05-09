import '../styles/Logout.css';




function Logout({history}) {

   

    function handleLogout(event){
        event.preventDefault();
        history.push({
            pathname: "/mainpage"
        })
        window.location.reload(); //permet de recharger la page
    }

    return (
        
            <button
                onClick={handleLogout}
                className="logout-button">
                Se déconnecter
            </button>
       
    );
}

export default Logout;
