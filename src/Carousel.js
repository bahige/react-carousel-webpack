import React, {useState, useEffect} from 'react';
import images from './images.json';
import './carousel.css';

const Carousel = () => {

    const [nrOfSlide, setNrOfSlide] = useState(0);
    const [nrOfItemsOfSlider, setnrOfItemsOfSlider] = useState(images.length - 1);
    const [firstTouch, setFirstTouch] = useState(0);
    const [lastTouch, setLastTouch] = useState(0);



    useEffect(() => {
        // setnrOfItemsOfSlider(images.length - 1);
        const interval = setInterval(incrementNr, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [])


    const incrementNr = () => {
         setNrOfSlide(prevCount => (prevCount + 1) % (nrOfItemsOfSlider+1));
    }


const goToNextSlide = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let slide = nrOfSlide < nrOfItemsOfSlider   ? nrOfSlide + 1 : 0;
    setNrOfSlide(slide);
}

const swipeToNextSlide = () => {
    let slide = nrOfSlide < nrOfItemsOfSlider  ? nrOfSlide + 1 : 0;
    setNrOfSlide(slide);
}

const goToPreviousSlide = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let slide =nrOfSlide>0 ? nrOfSlide - 1 : nrOfItemsOfSlider ;
    setNrOfSlide(slide);
}

const swipeToPreviousSlide = () => {
    let slide =nrOfSlide>0 ? nrOfSlide -1 : nrOfItemsOfSlider ;
    setNrOfSlide(slide);
}

const goToSlide = (slideNr) => {
    setNrOfSlide(slideNr);
}

const swipeSlider = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.preventDefault();
    let difference = firstTouch - lastTouch;
    if(difference > 0){
        swipeToNextSlide();
    } 
    else if(difference < 0){
        swipeToPreviousSlide();
    }   
}

    return (
        <div id="carousel">
            <div id="slide"
                     onTouchStart={e=> setFirstTouch(e.touches[0].clientX)}
                     onTouchMove={e=>  setLastTouch(e.touches[0].clientX)}
                     onTouchEnd={e => swipeSlider(e)}
                     onMouseDown={e => setFirstTouch(e.clientX)}
                     onMouseMove={e => setLastTouch(e.clientX)}
                     onMouseUp={e => swipeSlider(e)}
            >
            {images.map((image) =>(
                <div key={image.id}>
                <div style={{transform:`translateX(${image.id * 100}%)`}} className={`container`}
                >
                <div className={'carousel-content'}
                style={{transform:`translateX(${-(nrOfSlide * 100)}%)`, transition: 'transform 1s' }}
                >
                <img src={image.image} alt={image.name} />
                <div className={'slideTitle'}> {image.name}</div>
                </div>
                </div>
                <div id="arrows-container">
                    <button className='arrow-button' 
                    onTouchEnd={(e) => goToPreviousSlide(e)}
                    onClick={(e) => goToPreviousSlide(e)} >&#8678;</button>
                    <button className= 'arrow-button' 
                    onTouchEnd={(e)=>goToNextSlide(e)}
                    onClick={(e) => goToNextSlide(e)} >&#8680;</button>
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
