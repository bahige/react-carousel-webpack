# Creating A Carousel in React JS Using Webpack

## Objective

This project is made up of two types of carousel: a carousel that shows **one and only one slide** in react js at a time and a carousel that shows **multiple slides** at a time.

Both carousels will have the following four features:

1. The carousel will jump to the next slide every five seconds automatically.
2. The carousel will go from one slide to the next one every interval of time.
3. Both carousels will have a previous and a next button that will allow you to move the slide to the previous and the next slide respectively.
4. Both carousels will have indicator dots that show which slide is the active one or being displayed. In addition, you can click on any of these dots to go to its respective slide.

---

## Layout of the Carousel.

---

! [Single Slide Displaying Carousel](OneSlideCarousel.png "Single Carousel")

! [Single Slide Displaying Carousel Anatomy](OneSlideCarouselAnatomy.png "Single Carousel Anatomy")

The carousel has a container of **id=slide**. This container has two containers that are stacked above each other. The below container is the **id=dots-container** where the dots that show the current slide of the carousel are placed. The dots are spread evenly horizontally in the container.

The above container is the container returned by the array mapping function executed on the array of items that will be displayed in the carousel. It is a fixed container with width equal to that of the screen. Inside of it we have the following containers:

1. The first container is the **arrow-buttons-container** that contains the previous and next buttons spread in opposite directions at the peripheries of the container. They are used to go to the previous and next slides respectively when clicked on them. We use the `position: absolute;` to place this container over the slides (The **container** div).

2. The **container** components where we spread the slides of the carousel next to each other using the `{transform: translateX(${slide.id * 100}%)}` css property. Since the first item of the slide has an **id of zero** it will be displayed on the screen. The next item of the slide with an **id of one** will be translated by **one times 100%** horizontally to the right of the previous slide item. The consequent items of the slide will be placed accordingly by translating them by their id number times width of screen to the right of its previous slide until all items of the slide are placed next to each other.

   Inside this container, you have another container called **carousel-container** which is the one that pushes the **container** making it to slide in front of the screen. This container has the following style: ` style={{transform: translateX(${-(nrOfSlide * 100)}%), transition: 'transform 1s' }}`. Since this container will be swiping towards the left, the transition property will have a negative horizontal translation. To add the sliding effect on the container a transition property is set as mentioned before. In addition to this, this container will contain the image displayed in the slide and the text included in the slide.

   The image below shows how we arranged the slides in the carousel:

   ! [Single Slide Displaying Carousel Anatomy](CarouselSlidesLayout.png "Single Carousel Anatomy")

---

## Coding the Carousel

---

### 1. Required States

---

We need the following states:

1. `nrOfSlide`: It represents the number of the slide in the carousel. The functioning of the carousel depends on this state.
2. `nrOfItemsOfSlider` : It represents the total number of slides in the carousel which in return is the number of items to be displayed there.
3. `slidesArray`: It is the array of items displayed in the carousel's slides.
4. `firstTouch`: It is used in the swiping function of the carousel. As its name suggests, it is the first point that the user touches when he/she touches the carousel.
5. `lastTouch`: As `firstTouch`, it is also used in the swiping function of the carousel. It is the last point that the user touches before he/she raises his finger from the carousel after finishing the swipe.

---

### 2. The required Functions.

---

As previously mentioned, the carousel works in four ways:

1. Moving to the next swipe every five seconds automatically.
2. Clicking on the previous or next button to move to the previous or next slide of the carousel respectively.
3. Clicking on one of the dots below the carousel to go to its respective
   slide in the carousel.
4. Swiping the carousel leftwards or rightwards to move to the previous or next slide respectively.

### 1. Moving to the next swipe every five seconds automatically.

---

A. We define an increment function that allows us to increment the number of slide of the carousel by one as follows:

```javascript
const incrementNr = () => {
  setNrOfSlide((prevCount) => (prevCount + 1) % (nrOfItemsOfSlider + 1));
};
```

Since we want the count to stop at the last item of the slide before jumping back to the first slide, we **modal (%)** the number of slide over the number of items to be displayed in the slide.

B. In the `useEffect()` hook that executes once the component is rendered, we set the previously defined `incrementNr` function in a time interval of five seconds as follows:

```jsx
useEffect(() => {
  setSlidesArray(images);
  const interval = setInterval(incrementNr, 5000);
  return () => {
    clearInterval(interval);
  };
}, []);
```

We also instantiate in the previous `useEffect()` hook, the `slidesArray` array state to the items to be displayed in the carousel.

C. In the `carousel-content` container, we add the `style={{transform: translateX(${-(nrOfSlide * 100)}%), transition: 'transform 1s' }` as follows:

```jsx
  <div className={'carousel-content'}
                style={{transform:`translateX(${-(nrOfSlide * 100)}%)`, transition: 'transform 1s' }}
                >
```

As the nrOfSlide increments in the `setInterval` method in the `useEffect` hook, the carousel content will slide leftwards to display the new slide as an active slide. We will be needing this styling for the remaining methods of functioning of the carousel.

### 2. Clicking on the previous or next button to move to the previous or next slide of the carousel respectively.

A. We set the `goToNextSlide()` function that will allow us to go to the next slide when we click on the next button of the carousel:

```jsx
const goToNextSlide = (e) => {
  e.stopPropagation();
  e.preventDefault();
  let slide = nrOfSlide < nrOfItemsOfSlider ? nrOfSlide + 1 : 0;
  setNrOfSlide(slide);
};
```

If the number of the slide is less than the total number of items to be displayed in the carousel, add one to the slide number which allows us to go to the next slide; If this state is equal to the total number of items of the slide, it means that the current slide displayed is the last slide, so jump to the first slide. `slide = 0`.

B. We set the `goToPreviousSlide()` function that will allow us to go to the previous slide when we click on the previous button of the carousel:

```jsx
const goToPreviousSlide = (e) => {
  e.stopPropagation();
  e.preventDefault();
  let slide = nrOfSlide > 0 ? nrOfSlide - 1 : nrOfItemsOfSlider;
  setNrOfSlide(slide);
};
```

If the number of the slide is greater than zero, subtract one from the slide number; If this state is equal to zero, it means that the current slide displayed is the first slide, so go back to the last slide.

C. Add these two events to their respective next and previous buttons as follows:

```jsx
<div id="arrow-buttons-container">
  <button
    className="arrow-button"
    onTouchEnd={(e) => goToPreviousSlide(e)}
    onClick={(e) => goToPreviousSlide(e)}
  >
    &#8678;
  </button>

  <button
    className="arrow-button"
    onTouchEnd={(e) => goToNextSlide(e)}
    onClick={(e) => goToNextSlide(e)}
  >
    &#8680;
  </button>
</div>
```

Each button has two event handlers: `onClick` for clicking on the button in a desktop web app, and `onTouchEnd` for tapping on the button in a mobile web app.

### 3. Clicking on one of the dots below the carousel to go to its respective slide in the carousel.

A. We define a `gotToSlide()` function that allows to jump to a specific slide in the carousel as follows:

```jsx
const goToSlide = (slideNr) => {
  setNrOfSlide(slideNr);
};
```

B. In the `dots-container` container, we display the number of dots equivalent to the number of slides of carrousel as follows:

```jsx
<div id="dots-container">
  {slidesArray.map((slide) => (
    <div
      key={slide.id}
      className={nrOfSlide === slide.id ? "activeDot" : "dot"}
      onClick={() => {
        goToSlide(slide.id);
      }}
    ></div>
  ))}
</div>
```

The dots are `<div>` containers that are styled as circles by defining a className of `dot` that sets `border-radius: 50%;` as follows:

```css
.dot {
  width: 1em;
  height: 1em;
  background-color: #808080;
  border-radius: 50%;
}
```

If the dot number is not equivalent to the nrOfSlide (current number of the slide), it is styled as `.dot`. When the dot number is equivalent to the nrOfSlide, we set the className as `.activeDot` as follows:

```css
.activeDot {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #60bddf;
  transform: scale(1.2);
  transition: transform 1s;
}
```

When the dot is active, it has a different color than the other ones, and is larger in size. We added an expansion animation by using `transition: transform 1s;` where `transform: scale(1.2);`.

C. For each dot we set the `onClick` event handler to the `goToSlide()` function that we previously defined.

### 4. Swiping the carousel leftwards or rightwards to move to the previous or next slide respectively.

A. We define a `swipeToNextSlide()` and `swipeToPreviousSlide()` functiosn identical to the `goToNextSlide()` and `goToPreviousSlide()` functions with the difference that they do not take an event as a parameter.

```jsx
const swipeToNextSlide = () => {
  let slide = nrOfSlide < nrOfItemsOfSlider ? nrOfSlide + 1 : 0;
  setNrOfSlide(slide);
};

const swipeToPreviousSlide = () => {
  let slide = nrOfSlide > 0 ? nrOfSlide - 1 : nrOfItemsOfSlider;
  setNrOfSlide(slide);
};
```

B. We will use these two methods inside a `swipeSlider()` method. Here comes the role of the states `firstTouch` and `lastTouch`. We subtract the latter from the first. If the difference is positive, then the user has swiped from right to left and wants to go to the next slide by executing `swipeToNextSlide` function. If the difference is negative, then the user has swiped from left to right and wants to go to the previous slide by executing `swipeToPreviousSlide` function.

```jsx
const swipeSlider = (e) => {
  e.preventDefault();
  e.stopPropagation();
  let difference = firstTouch - lastTouch;
  if (difference > 0) {
    swipeToNextSlide();
  } else if (difference < 0) {
    swipeToPreviousSlide();
  }
};
```

C. In the `#slide` container (main container) of the carousel we need to define the event handlers as follows:

```jsx
    <div id="slide"
        onTouchStart={e=> setFirstTouch(e.touches[0].clientX)}
        onTouchMove={e=>  setLastTouch(e.touches[0].clientX)}
        onTouchEnd={e => swipeSlider(e)}
        onMouseDown={e => setFirstTouch(e.clientX)}
        onMouseMove={e => setLastTouch(e.clientX)}
        onMouseUp={e => swipeSlider(e)}
    >
```

In the `onTouchStart` and `onMouseDown` events, we set the value of the `firstTouch` state as shown above.

In the `onTouchMove` and `onMouseMove` events, we set the value of the `lastTouch` state as shown above.

In the `onTouchEnd` and `onMouseEnd` events, we execute the previously defined `swipeSlider()` function.

The `touch` event handlers correspond to mobile react web apps while the `mouse` events to desktop react web apps.

Our carousel is finally set.

---

# Multislide Carousel

The multislide carousel is a carousel that display more than one slide in the screen simultaneously. The multislide carousel coded here displays three slides:

! [Multislide Carousel](multislideCarousel.png "Multislide Carousel")

It is coded in the same way as a single slide carousel with the exception of these two options:

1. Since we are displaying three slides in the screen, each slide will have a width of 33.3% which is the quotient of 100% over 3 (number of slides in the screen); therefore, the `container` container now named as `container-small` will have the following style: `style={{transform: translateX(${(slide.id+1) * 33.3}%)}}` instead of `style={{transform: translateX(${(slide.id+1) * 100}%)}}`.

2. To the `carousel-content` container we add the following

```jsx
<div
  className={`carousel-content-small ${
    nrOfSlide === slide.id ? "activeSlide" : "unactiveSlide"
  }`}
></div>
```

If the slide is a current slide, we use the `activeSlide` className that has the following style

```css
.activeSlide {
  opacity: 1;
  animation: fadingout 1s;
}
```

If the slide is not the current slide (It is a previous or next slide), we use the `unactiveSlide` className as follows:

```css
.unactiveSlide {
  animation: fadingin 1s;
  opacity: 0.2;
}
```

The `fadingin` and `fadingout` animations were defined as follows:

```css
@keyframes fadingin {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}

@keyframes fadingout {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
```

When moving from `activeSlide` to `unactiveSlide`, apply the `fadingin` animation that decreases the opacity of the slide. When moving from `unactiveSlide` to `activeSlide`, apply the `fadingout` animation that increases the opacity of the slide back to 1.

The rest of the multislide carousel is identical to its singleside counterpart.

## Conclusion:

We created a singleslide and a multislide carousel that allow us to navigated to the previous or next slide either through swiping or pressing on a previous or next button or clicking on an indicator dot that corresponds to this slide or through automation by `setInterval` method.
