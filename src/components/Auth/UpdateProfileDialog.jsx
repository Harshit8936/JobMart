import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

export default function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        phone: user?.phone,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(skill => skill),
        resume: user?.profile?.resume,
    })
    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileChangeHandler = (e) => {
        setInput({ ...input, resume: e.target.files?.[0] })
    }
    const dispatch = useDispatch();
    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.fullname)
        formData.append("phone",input.phone)
        formData.append("bio",input.bio)
        formData.append("skills",input.skills)
        if(input.resume){
            formData.append("resume",input.resume)
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);

            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <form method='post' onSubmit={submitHandler}>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='fullname' className='text-right'>Full Name</Label>
                                    <Input type="text" id="fullname" name="fullname" className="col-span-3" value={input.fullname} onChange={changeHandler} required />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='phone' className='text-right'>Phone Number</Label>
                                    <Input type="number" id="phone" name="phone" className="col-span-3" value={input.phone} onChange={changeHandler} required />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='bio' className='text-right'>Bio</Label>
                                    <Input type="text" id="bio" name="bio" className="col-span-3" value={input.bio} onChange={changeHandler} required />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='skills' className='text-right'>Skills</Label>
                                    <Input type="skills" id="skills" name="skills" className="col-span-3" value={input.skills} onChange={changeHandler} required />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='resume' className='text-right'>Resume</Label>
                                    <Input type="file" id="resume" name="resume" className="col-span-3" accept="application/pdf" onChange={fileChangeHandler} />
                                </div>
                            </div>
                            <DialogFooter>
                                {loading ?
                                    <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Loading</Button> :
                                    <Button type="submit" className='w-full my-4' >Update</Button>}
                            </DialogFooter>
                        </form>
                    </DialogHeader>
                </DialogContent>

            </Dialog>
        </div>
    )
}
