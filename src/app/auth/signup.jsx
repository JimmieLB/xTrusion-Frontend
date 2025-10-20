// LoginPage.js
import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate('/')

    const { session, signUpUser } = UserAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password, confirmPassword);
        if (loading) {
            return;
        }
        if (password.length <= 3 || password != confirmPassword) {
            return;
        }
        setLoading(true);
        try {
            const result = await signUpUser({email: email, password: password});

            if (result.success) {
                navigate('/');
            }
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }


    };

    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign Up for a New Account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label for="email" className="block text-sm/6 font-medium text-gray-800">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" name="email" onChange={(e) => setEmail(e.target.value)} required autocomplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label for="password" className="block text-sm/6 font-medium text-gray-800">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} required autocomplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label for="password" className="block text-sm/6 font-medium text-gray-800">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirmPassword" type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}required autocomplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;