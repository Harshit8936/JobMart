import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CompanyTable() {
    const { companies,searchCompanyByText } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [filterCompany,setFilterCompany] = useState(companies);

    useEffect(()=>{
        const filteredCompany = companies.length >=0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany)
    },[companies,searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent register companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {   filterCompany?.length <=0 ? <span className='items-center font-bold'>No Companies found</span>:
                        filterCompany?.map((company) => (
                            <tr key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32 '>
                                            <div onClick={()=>navigate(`/recruiter/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}
