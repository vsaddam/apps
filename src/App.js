import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/page/LoginPage';
import SignupPage from './components/page/SignupPage';
import SecureHome from './components/private-routes/SecureHome';
import UsersDetails from './components/page/UsersDetails';
import Stote from './components/page/Store';
import Service from './components/page/Service';
import Contactus from './components/page/Contactus';
import PageNotFound from './components/page/PageNotFound';
import Dashboard from './components/page/Dashboard'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/apps" exact element={<Login />} />
                    <Route path="/signup" exact element={<SignupPage />} />
                    <Route path="/userdetails" exact element={<SecureHome>  <UsersDetails /> </SecureHome>} />
                    <Route path="/store" element={<Stote />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/contactus" element={<Contactus />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
               
                {/* <MainPage /> */}
              
                
            </BrowserRouter>
        </>
    );
}

export default App;