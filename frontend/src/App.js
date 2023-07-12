import { Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {HomePage} from "./pages/HomePage";
import {Login} from "./pages/auth/Login";
import {Register} from "./pages/auth/Register";
import {ProtectedRoute} from "./components/Routes/ProtectedRoute";
import {PublicRoute} from "./components/Routes/PublicRoute";
import {Donor} from "./pages/Dashboard/Donor";
import {Hospital} from "./pages/Dashboard/Hospital";
import {OrganizationPage} from "./pages/Dashboard/OrganizationPage";
import {Consumer} from "./pages/Dashboard/Consumer";
import {Donation} from "./pages/Donation";
import {Analytics} from "./pages/Dashboard/Analytics";
import {DonorList} from "./pages/Admin/DonorList";
import {HospitalList} from "./pages/Admin/HospitalList";
import {OrgList} from "./pages/Admin/OrgList";
import {AdminHome} from "./pages/Admin/AdminHome";



function App() {
  return (
    <>
        <ToastContainer />
      <Routes>
          <Route path='/admin' element={
              <ProtectedRoute>
                  <AdminHome/>
              </ProtectedRoute>
          }/>
          <Route path='/donor-list' element={
              <ProtectedRoute>
                  <DonorList/>
              </ProtectedRoute>
          }/>
          <Route path='/hospital-list' element={
              <ProtectedRoute>
                  <HospitalList/>
              </ProtectedRoute>
          }/>
          <Route path='/org-list' element={
              <ProtectedRoute>
                  <OrgList/>
              </ProtectedRoute>
          }/>
          <Route path='/analytics' element={
              <ProtectedRoute>
                  <Analytics/>
              </ProtectedRoute>
          }/>
          <Route path='/consumer' element={
              <ProtectedRoute>
                  <Consumer/>
              </ProtectedRoute>
          }/>
          <Route path='/donation' element={
              <ProtectedRoute>
                  <Donation/>
              </ProtectedRoute>
          }/>
          <Route path='/organization' element={
              <ProtectedRoute>
                  <OrganizationPage/>
              </ProtectedRoute>
          }/>
          <Route path='/hospital' element={
              <ProtectedRoute>
                  <Hospital/>
              </ProtectedRoute>
          }/>
          <Route path='/donor' element={
              <ProtectedRoute>
                  <Donor />
              </ProtectedRoute>
          }/>
          <Route path='/' element={
              <ProtectedRoute>
                  <HomePage />
              </ProtectedRoute>
          }/>
          <Route path='/login' element={
              <PublicRoute>
                  <Login />
              </PublicRoute>
          }/>
          <Route path='/register' element={
              <PublicRoute>
                  <Register />
              </PublicRoute>
          }/>
      </Routes>
    </>
  );
}

export default App;
