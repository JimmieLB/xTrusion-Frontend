// LoginPage.js
import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate('/')
    
    const { session, signInUser } = UserAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(loading) {
            return;
        }
        setLoading(true);
        try {
            const result = signInUser({email: email, password: password});

            if (result.success) {
                navigate("/");
            }
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div action="#" method="POST" class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-800">Email address</label>
                        <div class="mt-2">
                            <input id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-800">Password</label>
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-indigo-800 hover:text-indigo-600">Forgot password?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleSubmit} class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;