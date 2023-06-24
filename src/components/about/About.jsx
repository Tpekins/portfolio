import React from 'react'
import './about.css'
import ME from '../../assets/it.jpg'
import{FaAward} from 'react-icons/fa'
import{FiUser} from 'react-icons/fi'
import{VscFolderLibrary} from 'react-icons/vsc'




 const About = () => {
return (
      <section id='about'>
            <h5>Get To know</h5>
            <h2> About me </h2>
      <div className="container about__container">
            <div className="about__me">
                  <div className="about__me-image">
                        <img src={ME} alt="About Image" />

                  </div> 
         </div>

            <div className="about__content"> 
                     <div className="about__cards">
                        <article className='about__card'>
                               <FaAward className='about__icon'/>
                              <h5>Experince </h5>
                              <small>some months </small>
                        </article>

                   
                        <article className='about__card'>
                               <FiUser className='about__icon'/>
                              <h5> client  </h5>
                              <small>10+ nation wide</small>
                        </article>

                        <article className='about__card'>
                          <VscFolderLibrary  className='about__icon'/>
                         <h5>projects </h5>
                           <small>5 completed </small>
                        </article>
                        </div>    
                     <p>
                        sapientia in servito humanitatos
                     </p>
                      <a href="#contact" className='btn btn-primary'> Let's Talk </a>
           </div>
         </div>
      </section>
)
}
export default About;