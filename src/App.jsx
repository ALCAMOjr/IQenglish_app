// App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavbarApp from "./landing/Navbar";
import Body from "./landing/Body";
import Login from "./components/IQenglish/login.jsx";
import Footer from "./landing/Footer";
import Card from "./metodo/Card.jsx";
import Blog from "./landing/Blog";
import Mediun from "./landing/Mediun.jsx";
import Reviews from "./landing/Reviews.jsx";
import Nivelacion from "./landing/Nivelacion.jsx";
import { UserContextProvider } from './context/advisor.context.jsx';
import Dashboard from "./components/IQenglish/Dashboard.jsx";
import ProtectedRoute from "./components/IQenglish/middleware/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProviderModalIQ } from './components/IQenglish/Prospects/IQContextModal.jsx';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@material-tailwind/react";
import Carousel from "./landing/Carousel.jsx";
import ContactoFly from "./landing/ContactoFly.jsx";
import Course from "./landing/Course.jsx";
import Practica from "./landing/Practica.jsx";
import Teachers from "./team/Teachers.jsx";
import BodyTeachers from './team/BodyTeachers.jsx';
import Cards from "./team/Cards.jsx";
import ContactoFlyEdit from "./landing/ContactoFlyEdit.jsx";
import TeacherOne from './team/TeacherOne.jsx';
import TeacherSecond from './team/TeacherSecond.jsx';
import BodyNosotros from './nosotros/BodyNosotros.jsx';
import Nosotros from './nosotros/Nosotros.jsx';
import CardNosotros from './nosotros/CardNosotros.jsx';
import VideoNosotros from './nosotros/VideoNosotros.jsx';
import BodyMetodo from './metodo/BodyMetodo.jsx';
import Metodo from './metodo/Metodo.jsx';
import End from './team/End.jsx';
import NuevaYork from './landing/NuevaYork.jsx';
import Aprende from './metodo/Aprende.jsx';
import Libros from './metodo/Libros.jsx';
import Banner from "./landing/Banner.jsx";
import Video from './landing/Video.jsx';
import VideoMetodo from './metodo/videoMetodo.jsx';
import Toefl from './landing/Toefl.jsx';
import { updateTitle } from './views/utils.js'; // Importar la función
import Condiciones from './landing/Condiciones.jsx';

function App() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      updateTitle(searchTerm);
    } else {
      document.title = 'IQEnglish Monterrey';
    }
  }, [location]);

  return (
    <NextUIProvider>
      <ThemeProvider>
        <ProviderModalIQ>
          <UserContextProvider>
            <ToastContainer />
            <Routes>
              <Route path="/ma9ypwq1420s/sa9v5r3cd64q/prospects/secure/login" element={<Login />} />
              <Route path="/ma9ypwq1420s/sa9v5r3cd64q/prospects/secure/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/" element={
                <>
                  <Banner />
                  <NavbarApp />
                  <Body />
                  <ContactoFly />
                  <Mediun />
                  <Blog />
                  <Course />
                  <Practica />
                  <Nivelacion />
                  <Carousel />
                  <NuevaYork />
                  <Video />
                  <Toefl />
                  <Reviews />
                  <Footer />
                </>
              } />
              <Route path="/teachers" element={
                <>
                  <Banner />
                  <NavbarApp />
                  <BodyTeachers />
                  <ContactoFlyEdit />
                  <Cards />
                  <TeacherOne />
                  <TeacherSecond />
                  <Teachers />
                  <End />
                  <Footer />
                </>
              } />
              <Route path="/metodo" element={
                <>
                  <Banner />
                  <NavbarApp />
                  <BodyMetodo />
                  <Card />
                  <ContactoFlyEdit />
                  <Metodo />
                  <Libros />
                  <Aprende />
                  <VideoMetodo />
                  <Footer />
                </>
              } />
              <Route path="/nosotros" element={
                <>
                  <Banner />
                  <NavbarApp />
                  <BodyNosotros />
                  <ContactoFlyEdit />
                  <Nosotros />
                  <CardNosotros />
                  <VideoNosotros />
                  <Footer />
                </>
              } />
                 <Route path="/condiciones" element={
                <>
                  <NavbarApp />
                 <Condiciones />
                 <Footer />
                </>
              } />
            </Routes>
          </UserContextProvider>
        </ProviderModalIQ>
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default App;
