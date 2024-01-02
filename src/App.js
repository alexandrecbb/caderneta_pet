import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/context/AuthContext';
//import PrivateRoute from './components/context/PrivateRoute';

import Home from './components/Pages/Home';
import Animals from './components/Pages/Animals';
import About from './components/Pages/About';
import RegisterAnimal from './components/Pages/RegisterAnimal';
import VaccinationSchedule from './components/Pages/VaccinationSchedule';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Animal from './components/Pages/Animal';
import HealthRecord from './components/Pages/HealthRecord';
import Login from './components/Pages/Login';

function App() {

  const { isAuthenticated } = useContext(AuthContext);

  return (
      <Router>
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            <Route path='/animals' element={isAuthenticated ? <Animals /> : <Navigate to="/login" replace />} />
            <Route path='/about' element={<About />} />
            <Route path='/registeranimal' element={isAuthenticated ? <RegisterAnimal /> : <Navigate to="/login" replace />} />
            {/* <PrivateRoute path='/registeranimal' component={<RegisterAnimal />} /> */}
            <Route path='/vaccinationschedule' element={<VaccinationSchedule />} />
            <Route path='/animals/:id' element={<Animal />} />
            <Route path='/animals/:id/:healthRecord' element={<HealthRecord />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
  );
}

export default App;
