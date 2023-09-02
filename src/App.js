import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Animals from './components/Pages/Animals';
import Annotation from './components/Pages/Annotation';
import RegisterAnimal from './components/Pages/RegisterAnimal';
import VaccinationSchedule from './components/Pages/VaccinationSchedule';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Animal from './components/Pages/Animal';
import HealthRecord from './components/Pages/HealthRecord';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/animals' element={<Animals />} />
          <Route path='/annotation' element={<Annotation />} />
          <Route path='/registeranimal' element={<RegisterAnimal />} />
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
