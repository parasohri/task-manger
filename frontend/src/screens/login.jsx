import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../axios/axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/UserSlice';
const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
const dispatch=useDispatch()
    const onSubmit = data => {
        apiClient.post('/login', data)
            .then(response => {
                console.log("Response:", response);
                localStorage.setItem('token', response.data.token);
                dispatch(login(data))
                navigate('/'); // Call navigate here, not chained directly.
            })
            .catch(error => {
                console.error("Login failed:", error);
            });
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
                        Login
                    </button>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            dont have an account? <a href="/register" className="text-blue-600 hover:underline">register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;