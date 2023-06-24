import React from 'react'
import './acclamations.css'
import pic1  from '../../assets/pic1.jpg'
import pic2  from '../../assets/pic2.jpg'


const acclamations = () => {
  return (
    <section id='acclamations'>
      <h5>Review from clients</h5>
      <h2>Acclamations</h2>

 <div className="container.acclamations__container" >
   <article className="acclamation">
    <div className="client__avatar">
      <img src={pic1} alt="Avatar one" />
     
    </div>
    <h5 className='client__name'>Larissa</h5>
      <small className='client__review'>
        good job and  keep up
      </small>
   </article>

   <article className="acclamation">
    <div className="client__avatar">
      <img src={pic2} alt=" picture 2" />
     
    </div>
    <h5 className='client__name'>jennifer</h5>
      <small className='client__review'>
        Hey there that's nice and interesting,keep up 
      </small>
   </article>


 </div>
    </section>
    

    
  )
}

export default acclamations