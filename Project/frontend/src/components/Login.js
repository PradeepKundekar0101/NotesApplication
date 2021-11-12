import React,{useState} from 'react'
import {useHistory} from 'react-router-dom';
import '../App.css';
const Login = (props) => {

    const [details, setDetails] = useState({email:"",password:""})
    const history=useHistory();
    const handleLogin=async(e)=>{
        e.preventDefault();
        console.log( JSON.stringify({email:details.email,password:details.password}))
        
        const response = await fetch(`http://localhost:5000/auth/login`,
        {
          method: 'POST', 
          headers:
          {
              'Content-Type': 'application/json',              
          },
          body: JSON.stringify({email:details.email,password:details.password})
        });
        
        const data=await response.json();
        console.log(data);
        if(data.success===true){
            localStorage.setItem("token",data.token)
            history.push('/');
            props.showAlert("Login Successful","success")}
        else{props.showAlert("Invalid login Details","danger")}
    }
    const HandleonChange=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value});
    }
    return (
        <div className="container login-box my-5" >
            <h1>Login</h1>
           <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email Address:</label>
                <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={HandleonChange}/>

            </div>
            <div class="form-group my-2">
                <label for="exampleInputPassword1">Password:</label>
                <input type="password" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password" onChange={HandleonChange}/>
            </div>
           
            <button type="submit" class="btn btn-success my-3" onClick={handleLogin}>Continue</button>
            </form>
        </div>
    )
}

export default Login
