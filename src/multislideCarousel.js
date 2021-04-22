import React, {useState, useEffect} from 'react';
import images from './images.json';
import './carousel.css';

const MultislideCarousel = () => {

    const [nrOfSlide, setNrOfSlide] = useState(0);
    const [nrOfItemsOfSlider, setnrOfItemsOfSlider] = useState(images.length);
    const [firstTouch, setFirstTouch] = useState(0);
    const [lastTouch, setLastTouch] = useState(0);
    const [imagesArray, setImagesArray] = useState([]);



    useEffect(() => {
        // setnrOfItemsOfSlider(images.length - 1);
        setImagesArray(images);
        const interval = setInterval(incrementNr, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [])


    const incrementNr = () => {
         setNrOfSlide(prevCount => (prevCount + 1) % (nrOfItemsOfSlider));
    }


const swipeTowardsLeft = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let slide = nrOfSlide < nrOfItemsOfSlider -1 ? nrOfSlide + 1 : 0;
    setNrOfSlide(slide);
}

const swipeLeftwards = () => {
    let slide = nrOfSlide < nrOfItemsOfSlider -1 ? nrOfSlide + 1 : 0;
    setNrOfSlide(slide);
    console.log("You are swiping leftwards");
}


const swipeTowardsRight = (e) => {
    e.stopPropagation();
    e.preventDefault()
    let slide =nrOfSlide>0 ? nrOfSlide - 1 : nrOfItemsOfSlider-1 ;
    setNrOfSlide(slide);
}

const swipeRightwards = () => {
    let slide =nrOfSlide>0 ? nrOfSlide - 1 : nrOfItemsOfSlider ;
    setNrOfSlide(slide);
    console.log("You are swiping rightwards");
}


const goToSlide = (slideNr) => {
    setNrOfSlide(slideNr);
}

const swipeSlider = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let difference = firstTouch - lastTouch;
    if(difference > 0){
    swipeLeftwards()   
    } 
    else if(difference < 0){
    swipeRightwards();
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
            {imagesArray.map((image) =>(
                <div key={image.id}>
                <div style={{transform:`translateX(${(image.id+1) * 33.3}%)`}} className={`container-small`}
                >
                <div className={`carousel-content-small ${nrOfSlide === image.id ? 'activeSlide' : 'unactiveSlide'}`}
                style={{transform:`translateX(${-(nrOfSlide * 100)}%)`, transition: 'transform 1s'}}
                >
                <img src={image.image} alt={image.name} />
                <div className={'slideTitleSmall'}> {image.name}</div>
                </div>
                </div>
                <div id="arrows-container">
                    <button className='arrow-button' 
                    onTouchStart={(e) => swipeTowardsRight(e)}
                    onClick={(e) => swipeTowardsRight(e)} >&#8678;</button>
                    <button className= 'arrow-button' 
                    onTouchStart={(e) => swipeTowardsLeft(e)}
                    onClick={(e) => swipeTowardsLeft(e)} >&#8680;</button>
                </div> 
                </div>
            ))}
            </div>

            <div id="dots-container">
                {imagesArray.map((image) => (
                    <div key={image.id} className={nrOfSlide === image.id ? "activeDot" : "dot"} onClick={() => {goToSlide(image.id);}}></div>
                ))}
            </div>

        </div>
    )
}

export default MultislideCarousel
