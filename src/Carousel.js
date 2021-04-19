import React, {useState, useEffect} from 'react';
import images from './images.json';
import './carousel.css';

const Carousel = () => {

    const [nrOfSlide, setNrOfSlide] = useState(0);
    const [nrOfItemsOfSlider, setnrOfItemsOfSlider] = useState(images.length);



    useEffect(() => {
        // setnrOfItemsOfSlider(images.length - 1);
        const interval = setInterval(incrementNr, 3000);
      
        return () => {
            clearInterval(interval);
        }
    }, [])


    const incrementNr = () => {
         setNrOfSlide(prevCount => (prevCount + 1) % (nrOfItemsOfSlider));
    }


const swipeTowardsLeft = () => {
    let slide = nrOfSlide < nrOfItemsOfSlider ? nrOfSlide + 1 : 0;
    setNrOfSlide(slide);
}

const swipeTowardsRight = () => {
    let slide =nrOfSlide>0 ? nrOfSlide - 1 : nrOfItemsOfSlider ;
    setNrOfSlide(slide);
}

const goToSlide = (slideNr) => {
    setNrOfSlide(slideNr);
}

    return (
        <div id="carousel">
            <div id="slide">
            {images.map((image) =>(
                <div key={image.id}>
                <div style={{transform:`translateX(${image.id * 100}%)`}} className={`flags`} 
                onTouchStart ={e => console.log("touch", e)}>
                <img src={image.image} alt={image.name} style={{transform:`translateX(${-(nrOfSlide * 100)}%)`, transition: 'transform 1s' }}/>
                </div>
                <div id="arrows-container">
                    <button className='arrow-button' onClick={swipeTowardsLeft}>&#8678;</button>
                    <button className= 'arrow-button' onClick={swipeTowardsRight} >&#8680;</button>
                </div> 
                </div>
            ))}
            </div>

            <div id="dots-container">
                {images.map((image) => (
                    <div key={image.id} className={nrOfSlide === image.id ? "activeDot" : "dot"} onClick={() => {goToSlide(image.id);}}></div>
                ))}
            </div>

        </div>
    )
}

export default Carousel
