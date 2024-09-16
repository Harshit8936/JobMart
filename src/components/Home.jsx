import React, { useEffect } from 'react'
import HeroSection from './Home/HeroSection'
import CategoryCaresouel from './Home/CategoryCaresouel'
import LatestJobs from './Home/LatestJobs'
import Footer from './Home/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/recruiter/companies")
    }
  }, [])
  return (
    <div>
      <HeroSection />
      <CategoryCaresouel />
      <LatestJobs />
      <Footer />
    </div>
  )
}
