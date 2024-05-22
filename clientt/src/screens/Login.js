import React, {useState ,useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

function Login() {
        const[email,setemail]=useState('')
        const[password,setpassword]=useState('')
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState();
        
        async function Login(){
            
                const user={
            
                    email,
                    password,
                   
                }
                try {
                    setLoading(true)

                    const result = (await axios.post('/api/users/login',user)).data
                    setLoading(false)
                    localStorage.setItem('currentuser',JSON.stringify(result));
                    window.location.href='/home'

                } catch (error) {
                    console.log(error)
                    setLoading(false)
                    setError(true)
                }
               
        }
  return (
    <div className = "login">
        {loading && (<Loader/>)}
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                {error &&(<Error message='Invalid credentials'/>)}
                <div className='bs'>
                    <h2>Login</h2>
                    {/* <input type="text" className='form-control' placeholder='Name' value={name} onChange={(e)=>{setname(e.target.value)}}  /> */}
                    <input type="text" className='form-control' placeholder='Email'value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                    <input type="text" className='form-control' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                    {/* <input type="text" className='form-control' placeholder='Confirm Password' value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/> */}
                    <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login