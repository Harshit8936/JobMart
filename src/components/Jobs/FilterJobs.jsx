import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Gurugram","Noida","Bangalore", "Hyderabad", "Pune", "Mumbai"]
    }, {
        filterType: "Industry",
        array: ["Front End Developer", "Back End Developer", "Data Science", "Graphic Designer", "Full Stack Developer",]
    }, {
        filterType: "Salary",
        array: ["0-40k", "40k - 1Lakh", "1 Lakh to 5 Lakh"]
    }
]

export default function FilterJobs() {
    const [selectedValue,setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const handleChange = (value)=>{
        setSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='flex font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='flex font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const uniqueId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value ={item} id={uniqueId} />
                                            <Label htmlFor={uniqueId} >{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}
