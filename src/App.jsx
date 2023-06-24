import './App.css';
import './index.css'
import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Services from './components/services/Services'
import Portfolio from './components/portfolio/Portfolio'
import Acclamations   from './components/acclamations/acclamations'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'


const App = () => {
    return (
        <>
            <Header/>
            <Navbar/>
            <About/>
            <Experience/>
            <Services/>
            <Portfolio/>
            <Acclamations/>
            <Contact/>
            <Footer/>
        </>
    );
}
export default App
