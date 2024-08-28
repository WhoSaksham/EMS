import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLoader from './_widgets/Loader/MainLoader';
import NotFound from './components/NotFound/NotFound';

const LoginLayout = lazy(() => import('./components/Layouts/LoginLayout'));
const HomeLayout = lazy(() => import('./components/Layouts/HomeLayout'));

const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const Departments = lazy(() => import('./components/Departments/Departments'));
const Employees = lazy(() => import('./components/Employees/Employees'));
const EmployeeDetails = lazy(() => import('./components/Employees/EmployeeDetails'));

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Suspense fallback={<MainLoader />}>
        <BrowserRouter>
          <Routes>
            <Route element={<LoginLayout />} >
              <Route exact path='/' element={<ProtectedRoute Component={<Login />} />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path="/*" element={<NotFound />} />
            </Route>

            <Route element={<HomeLayout />}>
              <Route exact path="/departments" element={<ProtectedRoute Component={<Departments />} />} />
              <Route exact path="/employees" element={<ProtectedRoute Component={<Employees />} />} />
              <Route exact path="/employees/:eId" element={<ProtectedRoute Component={<EmployeeDetails />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div >
  );
}

export default App;
