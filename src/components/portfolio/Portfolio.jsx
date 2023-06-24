import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/portfolio 1.webp'
import IMG2 from '../../assets/portfolio 2.webp'
import IMG3 from '../../assets/portfolio 3.webp'

const data =[
    {
    
    id: 1,
    image :IMG1,
    title: 'Radar charts collection ✦ Hyper charts UI Kit',
    github:'https://github.com/Tpekins/portfolio',
    demo: 'https://dribbble.com/shots/21778362-Radar-charts-collection-Hyper-charts-UI-Kit',

    },  
     
    {


        id: 2,
        image :IMG2,
        title: 'Orion UI kit – data visualization and charts templates for Figma',
        github: 'https://github.com/Tpekins/portfolio',
        demo:'https://dribbble.com/shots/21778299-Orion-UI-kit-data-visualization-and-charts-templates-for-Figma',
        },
           
    {
    id:3,
    image :IMG3,
    title: 'Aurora Bundle ✦ Orion + Eclipse + Hyper ✦ Save 30%',
    github: 'https://github.com/Tpekins/portfolio',
    demo:'https://dribbble.com/shots/21778082-Aurora-Bundle-Orion-Eclipse-Hyper-Save-30',
    }
    ]
    




 const Portfolio = () => {
return (
<section id='portfolio'>
    <h5>My Recent Work</h5>
    <h2>portfolio</h2>

    <div className="container portfolio__container">
        {
            data.map(({id, image, title, github, demo}) =>{
                return(

                
       <article key={id} className='portfolio__item'>
           <div className="portfolio__item-image">
            <img src={image} alt={title}/>
            </div>
            <h3>{title}</h3>
            <div className="portfolio__item-cta">
            <a href={github} className='btn' target='_blank'>Github</a>
            <a href={demo}className='btn btn-primary' target='_blank'>Demo</a>
            </div>
  </article>

                )
                })
            }
    </div>
    
    
    </section>
)
}
export default Portfolio;