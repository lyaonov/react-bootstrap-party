import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerFrom";


const Login = () => {
    const { type } = useParams()
    const [formType, setFormType] = useState(type === 'register' ? type : 'login');

    const toggleFromType = () => {
        setFormType(prevState => prevState === 'register' ? 'login' : 'register')
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    
                    {formType === 'register' ? (
                        <>
                        <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>
                                Already have account? <a role='button' onClick={toggleFromType}>Sign In</a>
                            </p>
                        </>)
                        : (
                            <>
                            <h3 className="mb-4">Login</h3>
                                <LoginForm />
                                <p>
                                    Dont have account? <a role='button' onClick={toggleFromType} >Sign In</a>
                                </p>
                            </>)}

                </div>
            </div>
        </div>
    )
};

export default Login;
