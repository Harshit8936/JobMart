import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';
import { setUser } from '@/redux/authSlice';


export default function Navbar() {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOuthandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/")
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Mart</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><NavLink to="/recruiter/companies" >Companies</NavLink></li>
                                    <li><NavLink to="/recruiter/jobs">Jobs</NavLink></li>
                                </>
                            ) : (
                                <>
                                    <li><NavLink to="/" >Home</NavLink></li>
                                    <li><NavLink to="/jobs">Jobs</NavLink></li>
                                    <li><NavLink to="/browse">Browse</NavLink></li>
                                </>
                            )
                        }

                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <NavLink to="/login"><Button variant="outline">Login</Button></NavLink>
                            <NavLink to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b3086]">Sign Up</Button></NavLink>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : "https://github.com/shadcn.png"} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className=''>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : "https://github.com/shadcn.png"} />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    {
                                        user && user.role === 'student'&& (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        )
                                    }
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut />
                                        <Button onClick={logOuthandler} variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}


                </div>
            </div>


        </div>
    )
}
