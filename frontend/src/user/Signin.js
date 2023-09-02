import React, { useState } from 'react'
import Base from '../core/Base'
import { useNavigate,Navigate} from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';

const Signin = () => {

    const [values,setValues]=useState({
        email:"",
        password:"",
        error:false,
        success:false,
        loading:false,
        didRedirect:false
    });
    const { email,password,error,success,loading,didRedirect } = values;
    // const navigate=useNavigate();

    const handleChange = (name) =>
    (event) =>{
        setValues({ ...values, error:false, [name]: event.target.value });
    
};

const onSubmit =(event) =>{
    event.preventDefault();
    setValues({...values,error:false,loading:true});

    signin({email,password})
        .then((data) =>{
            console.log("DATA",data);
            if(data.token){
                // let sessionToken=data.token;
                authenticate(data,() =>{
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect:true,
                    });
                })
            } else {
                setValues({
                    ...values,
                    loading:false,
                });
            }
        })
        .catch((e) => console.log(e));
};

    const navigate=useNavigate();
    const performRedirect = () =>{   
        if(isAuthenticated()){
            return navigate("/")
        }
    };
    const loadingMessage = () =>{
        return (
            loading && (
                <div className="alert alert-info">
                    <h4>Loading ...</h4>
                </div>
            )
        )
    }

    const successMessage=() =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display:success?"":"none"}}>
                        LoggedIn Successfully!! 
                    </div>
                </div>
            </div>
        );
    };
    const errorMessage=() =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display:error?"":"none"}}>
                        Check all fields again.
                    </div>
                </div>
            </div>
        );
    }

    const signInForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className='text-light'>Email</label>
                            <input type="text" className="form-control" value={email} onChange={handleChange("email")} />
                        </div>
                                            
                        <div className="form-group">
                            <label className='text-light'>Password</label>
                            <input type="password" className="form-control" value={password} onChange={handleChange("password")} />
                        </div>
                        <div className="d-grid gap-2 mt-2">
                            <button className="btn btn-success" type="submit" onClick={onSubmit}>Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }

    




  return (
    <Base 
    title='WelCome to Signin Page'
    description='A Ecom Store'
    >
        {loadingMessage()}
        {signInForm()}
        <p className='text-center'>{JSON.stringify(values)}</p>
        {/* {performRedirect()} */}
    </Base>
  )
}

export default Signin;
