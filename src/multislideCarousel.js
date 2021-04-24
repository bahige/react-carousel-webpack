import React, {useState, useEffect} from 'react';
import images from './images.json';
import './carousel.css';

const MultislideCarousel = () => {

    const [nrOfSlide, setNrOfSlide] = useState(0);
    const [nrOfItemsOfSlider, setnrOfItemsOfSlider] = useState(images.length);
    const [firstTouch, setFirstTouch] = useState(0);
    const [lastTouch, setLastTouch] = useState(0);
    const [slidesArray, setSlidesArray] = useState([]);



    useEffect(() => {
        // setnrOfItemsOfSlider(images.length - 1);
        setSlidesArray(images);
        const interval = setInterval(incrementNr, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [])


    const incrementNr = () => {
         setNrOfSlide(prevCount => (prevCount + 1) % (nrOfItemsOfSlider));
    }


const goToNextSlide = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let slide = nrOfSlide < nrOfItemsOfSlider -1 ? nrOfSlide + 1 : 0;
    setNrOfSlide(slide);
}

const swipeToNextSlide = () => {
    let slide = nrOfSlide < nrOfItemsOfSlider -1 ? nrOfSlide + 1 : 0;
    setNrOfSlide(slide);
}


const goToPreviousSlide = (e) => {
    e.stopPropagation();
    e.preventDefault()
    let slide =nrOfSlide>0 ? nrOfSlide - 1 : nrOfItemsOfSlider-1 ;
    setNrOfSlide(slide);
}

const swipeToPreviousSlide = () => {
    let slide =nrOfSlide>0 ? nrOfSlide - 1 : nrOfItemsOfSlider -1 ;
    setNrOfSlide(slide);
}


const goToSlide = (slideNr) => {
    setNrOfSlide(slideNr);
}

const swipeSlider = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let difference = firstTouch - lastTouch;
    if(difference > 0){
    swipeToNextSlide()   
    } 
    else if(difference < 0){
    swipeToPreviousSlide();
    }   
}


    return (
        <div id="carousel">
            <div id="slide-small"
                     onTouchStart={e=> setFirstTouch(e.touches[0].clientX)}
                     onTouchMove={e=>  setLastTouch(e.touches[0].clientX)}
                     onTouchEnd={e => swipeSlider(e)}
                     onMouseDown={e => setFirstTouch(e.clientX)}
                     onMouseMove={e => setLastTouch(e.clientX)}
                     onMouseUp={e => swipeSlider(e)}
            >
            {slidesArray.map((slide) =>(
                <div key={slide.id}>
                <div style={{transform:`translateX(${(slide.id+1) * 33.3}%)`}} className={`container-small`}
                >
                <div className={`carousel-content-small ${nrOfSlide === slide.id ? 'activeSlide' : 'unactiveSlide'}`}
                style={{transform:`translateX(${-(nrOfSlide * 100)}%)`, transition: 'transform 1s'}}
                >
                <img src={slide.image} alt={slide.name} />
                <div className={'slideTitleSmall'}> {slide.name}</div>
                </div>
                </div>
                <div id="arrow-buttons-container">
                    <button className='arrow-button' 
                    onTouchEnd={(e) => goToPreviousSlide(e)}
                    onClick={(e) => goToPreviousSlide(e)} >&#8678;</button>
                    <button className= 'arrow-button' 
                    onTouchEnd={(e) => goToNextSlide(e)}
                    onClick={(e) => goToNextSlide(e)} >&#8680;</button>
                </div> 
                </div>
            ))}
            </div>

            <div id="dots-container">
                {slidesArray.map((slide) => (
                    <div key={slide.id} className={nrOfSlide === slide.id ? "activeDot" : "dot"} onClick={() => {goToSlide(slide.id);}}></div>
                ))}
            </div>

        </div>
    )
}

export default MultislideCarousel
