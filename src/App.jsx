import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs/jobs'
import Browse from './components/Browse'
import Profile from './components/Auth/Profile'
import JobDetail from './components/Jobs/JobDetail'
import NotFound from './components/NotFound'
import Companies from './components/recruiters/companies/Companies'
import CompanyCreate from './components/recruiters/companies/CompanyCreate'
import CompanySetup from './components/recruiters/companies/CompanySetup'
import RecruiterJobs from './components/recruiters/jobs/RecruiterJobs'
import RecruiterCreateJob from './components/recruiters/jobs/RecruiterCreateJob'
import RecruiterEditJob from './components/recruiters/jobs/RecruiterEditJob'
import RecruiterApplicants from './components/recruiters/applications/RecruiterApplicants'
import ProtectedRoute from './components/recruiters/ProtectedRoute'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/jobs' element={<Jobs/>}></Route>
      <Route path='/detail/:id' element={<JobDetail/>}></Route>
      <Route path='/browse' element={<Browse/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
      {/* start for recruiters */}
      <Route path='/recruiter/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />
      <Route path='/recruiter/companies/create' element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
      <Route path='/recruiter/companies/:id' element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
      <Route path='/recruiter/jobs' element={<ProtectedRoute>< RecruiterJobs /></ProtectedRoute>} />
      <Route path='/recruiter/jobs/create' element={<ProtectedRoute>< RecruiterCreateJob /></ProtectedRoute>} />
      <Route path='/recruiter/jobs/:id' element={<ProtectedRoute><RecruiterEditJob /></ProtectedRoute>} />
      <Route path='/recruiter/jobs/applicants/:id' element={<ProtectedRoute>< RecruiterApplicants /></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
          </>
  )
}

export default App
