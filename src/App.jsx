import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

// Pages
import LandingPage from './components/LandingPage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AllUsers from './pages/AllUsers'
import CreateForiyadi from './pages/CreateForiyadi'
import MyForiyadis from './pages/MyForiyadis'
import AllForiyadis from './pages/AllForiyadis'
import SearchForiyadi from './pages/SearchForiyadi'
import LandingManager from './pages/LandingManager'
import PatientDetailsForm from './pages/PatientDetailsForm'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - Public */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Page - Public */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Route - Protected, SuperAdmin Only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['superAdmin']} showLayoutOnUnauthorized={true}>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* All Users - Admin & SuperAdmin */}
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute allowedRoles={['admin', 'superAdmin']} showLayoutOnUnauthorized={true}>
                <DashboardLayout>
                  <AllUsers />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Create Foriyadi - Admin, SuperAdmin, Distributor, Writer */}
          <Route
            path="/dashboard/foriyadi/create"
            element={
              <ProtectedRoute allowedRoles={['admin', 'superAdmin', 'distributor', 'writer']} showLayoutOnUnauthorized={true}>
                <DashboardLayout>
                  <CreateForiyadi />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Patient Details Form (Page 2) - Admin, SuperAdmin, Distributor, Writer */}
          <Route
            path="/dashboard/foriyadi/create/:patientId"
            element={
              <ProtectedRoute allowedRoles={['admin', 'superAdmin', 'distributor', 'writer']} showLayoutOnUnauthorized={true}>
                <DashboardLayout>
                  <PatientDetailsForm />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* My Foriyadis - Admin, SuperAdmin, Distributor, Writer */}
          <Route
            path="/dashboard/foriyadi/my-list"
            element={
              <ProtectedRoute allowedRoles={['admin', 'superAdmin', 'distributor', 'writer']} showLayoutOnUnauthorized={true}>
                <DashboardLayout>
                  <MyForiyadis />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* All Foriyadis - All Users */}
          <Route
            path="/dashboard/foriyadi/all"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AllForiyadis />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Search Foriyadi - View Only */}
          <Route
            path="/dashboard/foriyadi/search"
            element={
              <ProtectedRoute allowedRoles={['view']} showLayoutOnUnauthorized={true}>
                <DashboardLayout>
                  <SearchForiyadi />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Landing Manager - SuperAdmin Only */}
          <Route
            path="/dashboard/landing-manager"
            element={
              <ProtectedRoute allowedRoles={['superAdmin']} showLayoutOnUnauthorized={true}>
                <DashboardLayout>
                  <LandingManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
