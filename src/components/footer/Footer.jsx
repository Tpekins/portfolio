import React from 'react'
import './footer.css'
import{FaFacebook} from 'react-icons/fa'
import{BsLinkedin} from 'react-icons/bs'
import{FaWhatsapp} from 'react-icons/fa'


export const Footer = () => {
return (
<footer>

    <a href='#' className='footer__logo'>TIANI</a>
    <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Exeperience</a></li>
        <li><a href="#services">Services</a></li> 
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>

    <div className="footer__social">
           <a href="http://facebook.com"><FaFacebook/></a>
        <a href="http://LinkedIn.com"><BsLinkedin/></a>
        <a href="http://Whatsapp.com"><FaWhatsapp/></a>
    </div> 

<div className= "footer__copyright" >
<small>&copy; All rights reserved.</small>
</div>

</footer>
)
}
export default Footer;