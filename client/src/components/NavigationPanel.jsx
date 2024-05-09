import Login from "./Login"
import Logout from "./Logout";
import '../styles/NavigationPanel.css'
import User from "./User"

function NavigationPanel({history, login, logout, isConnected, currentUser,currentPage}){
    return (
        <div className="navigation-panel">
            <nav>
                {isConnected ? (
                    <> 
                    <Logout history={history} logout={logout} />
                    {<User {...currentUser}/> && currentUser}
                    </>
                    
                ) : (
                    <Login login={login} currentUser={currentUser} />
                )}
            </nav>
            {isConnected && currentPage === "message_page" }
        </div>
    );
}


export default NavigationPanel;