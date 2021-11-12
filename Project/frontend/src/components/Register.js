import React ,{useState} from 'react'
import { useHistory } from 'react-router'
const Register = (props) => {
    const history=useHistory();
    const [credentials, setCredentials] = useState({
        name:"",email:"",password:"",cpassword:""
    })
    const HandleonChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const handleSignup=async (e) =>{
        let s=true;
        e.preventDefault();
        const {name,email,password,cpassword}=credentials;
        if(password!==cpassword){
            props.showAlert("Passwords are Not matching","danger");
            s=false;
        } 

          const response =await fetch('http://localhost:5000/auth/register',{
                method: 'POST', 
                headers:
                {
                    'Content-Type': 'application/json',              
                },
                body: JSON.stringify({username:name,email:email,password:password})
              });  
            const data=await response.json();
              console.log(data)
            if(data.errors)
            {
                for(let i=0;i<data.errors.length;i++)
                {
                    props.showAlert(data.errors[i].msg,"danger");
                    // alert(data.errors[i].msg);
                }
            }
            if(data.success===false)
            {
                props.showAlert(data.msg,"danger")
                // <Alert alert={"danger"} message={data.msg}  />
            }
            if(data.success && s)
            {
                console.log("S==="+s);
                localStorage.setItem('token',data.token)
                // alert("User Created");
                props.showAlert("User created successfully","success")
                history.push('/login');
            }
        }
    return (
        <div className="container register-box my-5">
            <h1>Sign Up</h1>
         <form>
            <div class="form-group">
                <label for="exampleInputEmail1">User Name:</label>
                <input type="text" class="form-control" name="name" id=""  placeholder="Enter your name" onChange={HandleonChange}/>

            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={HandleonChange}/>

            </div>
            <div class="form-group my-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password" onChange={HandleonChange} required minLength="5"/>
            </div>
            <div class="form-group my-2">
                <label for="exampleInputPassword1">Confirm Password:</label>
                <input type="password" class="form-control" name="cpassword" id="exampleInputPassword1" placeholder="Confirm Password" onChange={HandleonChange} required minLength="5"/>
            </div>
           
            <button type="submit" class="btn btn-success my-3" onClick={handleSignup}>SignUp</button>
            </form>
        </div>
    )
}

export default Register
