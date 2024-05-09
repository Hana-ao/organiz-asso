import User from "./User";
import '../styles/ProfilePage.css';
import Message from "./Message";

function ProfilePage({history, location}){
    const {currentUser} = location.state || {};

    function handleClick(){
        history.push({
            pathname: "/forum"
        })
        window.location.reload();
    }

    return (
        <div className="profile-page-box">
            
                <h2>Bienvenue sur la page de profil</h2>
            
                    <User {...currentUser}/> {/*autre façon d'écrire: <User _id={currentUser._id} name={currentUser.name} lastName={currentUser.lastName} login={currentUser.login} email={currentUser.email} isAdmin={currentUser.isAdmin} /> */}
                    <h3>Vos messages</h3>
                    <Message currentUser={currentUser}/>
         <button onClick={handleClick}>Forum</button>
        
        </div>
    )
}


export default ProfilePage;