import React,{ useEffect } from 'react';
import { Link,useLocation,useHistory} from 'react-router-dom';
const Nav = () => {
    let location =useLocation(); //location variable will store The current Url of Window
    let history=useHistory();
    
    useEffect(()=>{
        console.log("Location: "+location);
    },[location]) //Any Changes in Location Variable the Callback Function is Executed

    const token=localStorage.getItem('token');

    const handleLogout=()=>{
        console.log("logged out")
        localStorage.removeItem('token');
        history.push('/login');
    }
    return (
       <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Notes App</Link> 
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={location='/'?"nav-link":"nav-link active"} aria-current="page" to="/">Home</Link> 
                </li>
            </ul>
                {!token &&    //If token is Present is Present then don't show Login n Signup
                <div class="form-inline my-2 my-lg-0">
                    <Link class="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link class="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
                </div>
                }
                {
                    token &&
                    <div class="form-inline my-2 my-lg-0">
                        <button class="btn btn-primary mx-1" onClick={handleLogout} role="button">LogOut</button>
                    </div>
                }

            </div>
        </div>
        </nav>
       </>
    )
}

export default Nav
