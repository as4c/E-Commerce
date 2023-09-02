import Base from '../core/Base'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';

const Signup = () => {
    const [values,setValues]=useState({
        username:"",
        email:"",
        phone:1234567890,
        gender:"",
        password:"",
        error:"",
        success:false,
    });
    const {username,email,password,phone,gender,error,success} = values;
    const handleChange = (user) =>
        (event) =>{
            setValues({ ...values, error:false, [user]: event.target.value });
        
    };
    
    const onSubmit =(event) =>{
        event.preventDefault();
        setValues({...values,error:false});
        signup({username,email,password})
        // console.log(Response)
        .then((data) =>{
                console.log("DATA",data);
                if(data.email === email){
                    setValues({
                        ...values,
                        username : "",
                        email:"",
                        phone:1234567890,
                        gender:"",
                        password:"",
                        error:"",
                        success:true,
                    });
                }
                else{
                    setValues({
                        ...values,
                        error:true,
                        success:false,
                    });
                }
            })
            .catch((e) => console.log(e));
    };

    const successMessage=() =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display:success?"":"none"}}>
                        New Account Created Successfully.Please <Link to="/signin">Login now.</Link> 
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

    const signUpForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className='text-light'>Username</label>
                            <input type="text" className="form-control" value={username} onChange={handleChange("username")} />
                        </div>
                        <div className="form-group">
                            <label className='text-light'>Email</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange("email")} />
                        </div>
                        <div className="form-group">
                            <label className='text-light'>Phone</label>
                            <input type="number" className="form-control" value={phone} onChange={handleChange("phone")} />
                        </div>
                        <div className="form-group">
                            <label className='text-light'>Gender</label>
                            <input type="text" className="form-control" value={gender} onChange={handleChange("gender")} />
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
    <Base title='Sign Up Page' description='A signup for Ecom Store user'>
        {errorMessage()}
        {successMessage()}
        {signUpForm()}
        <p className="text-white text-center">
            {JSON.stringify(values)}
        </p>
    </Base>
    );
};

export default Signup;
