import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./landing/Navbar"
import Body from "./landing/Body"
import Login from "./components/IQenglish/login.jsx";
import Footer from "./landing/Footer"
import Card from "./landing/Card" 
import Blog from "./landing/Blog"
import Teachers from "./landing/Teachers"
import Reviews from "./landing/Reviews.jsx" 
import { UserContextProvider } from './context/advisor.context.jsx';
import Dashboard from "./components/IQenglish/Dashboard.jsx"
import ProtectedRoute from "./components/IQenglish/middleware/ProtectedRoute.jsx";
import Prueba from "./components/IQenglish/Prospects/prueba.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ProviderModal } from './landing/ModalConext.jsx';

function App() {
  return (
    <ProviderModal>
      <UserContextProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/ma9ypwq1420s/sa9v5r3cd64q/prospects/secure/login" element={<Login />} />
            <Route path="/ma9ypwq1420s/sa9v5r3cd64q/prospects/secure/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/prueba" element={<Prueba/>} />
            <Route path="/" element={
              <>
                <Navbar />
                <Body />
                <Blog />
                <Card/>
                <Reviews/>
                <Footer />
              </>
            }/>
            <Route path="/teachers" element={<Teachers />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </ProviderModal>
  );
}

export default App;
