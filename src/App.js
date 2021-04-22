import React from 'react';
import Carousel from './Carousel';
import MultislideCarousel from './multislideCarousel';

const App =  () => {
    return (
        <div>
            {/* <h1> Welcome {new Date().toDateString()}</h1> */}
            <Carousel/>
            <MultislideCarousel/>
        </div>
    )
}

export default App;