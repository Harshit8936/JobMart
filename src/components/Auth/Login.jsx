import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

export default function Login() {
    const [login,setLogin] = useState({
        email:"",
        password:"",
        role:""
    })
    const handleOnchangeInput = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const {loading,user} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleForm = async(e)=>{
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`,login,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res.data.success){
                setLogin({email:"", password:"", role:""});
                toast.success(res.data.message ? res.data.message: "Login Success");
                dispatch(setUser(res.data.user));
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false))
        }

    }
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])
    return (
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form method='post' onSubmit={handleForm} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='flex font-bold text-xl mb-5'>Sign In</h1>
                <div className='my-2'>
                    <Label className='flex my-2' htmlFor="email">Email</Label>
                    <Input type="email" placeholder="Enter your Email" name="email" value={login.email} onChange={handleOnchangeInput} required/>
                </div>
                <div className='my-2'>
                    <Label className='flex my-2' htmlFor="password">Password</Label>
                    <Input type="password" placeholder="Enter your Password" name="password" value={login.password} onChange={handleOnchangeInput} required/>
                </div>
                <div className='flex items-center justify-between'>
                    <RadioGroup className="flex items-center gap-4 my-5">
                        <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="student" className="cursor-pointer" checked={login.role==='student'} onChange={handleOnchangeInput}/>
                            <Label htmlFor="student">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={login.role==='recruiter'} onChange={handleOnchangeInput}/>
                        <Label htmlFor="recruiter">Recruiter</Label>
                        </div>
                    </RadioGroup>
                </div>
                {loading ? 
                <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Loading</Button> : 
                <Button type="submit" className='w-full my-4' >SignIn</Button>}
                <span className='flex text-sm'>Don't have an account?<Link to="/signup" className='text-blue-600'> Sign Up</Link></span>
            </form>
        </div>
    )
}
