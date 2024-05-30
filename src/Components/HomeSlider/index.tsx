import React, {useRef, useState} from 'react'

import classes from './HomeSlider.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sl1 from "../../assets/img/01.jpg"
import sl2 from "../../assets/img/02.jpg"
import sl3 from "../../assets/img/03.jpg"

import prev from "../../assets/img/prev.svg"
import next from "../../assets/img/next.svg"

import { CustomArrowProps, default as Slider, Settings } from "react-slick";
// import Slider from 'react-slick'

const slidersImg = [
    sl1,
    sl2,
    sl3
]
const NextArrow:React.FC<CustomArrowProps> = ({onClick}) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <img src={next} alt="" />
      </div>
    );
  };
  const PrevArrow:React.FC<CustomArrowProps> = ({onClick}) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src={prev} alt="" />
      </div>
    );
  };

  type TSliderProps = {
    className?: string,
    infinite?: boolean,
    autoplay?: boolean,
    centerMode?: boolean,
    centerPadding?: string,
    speed?: number,
    autoplaySpeed?: number,
    slidesToScroll?: number,
    slidesToShow?: number,
    nextArrow?: JSX.Element,
    prevArrow?: JSX.Element,
    beforeChange?: (currentSlide: number, nextSlide: number) => void,
    responsive?: { breakpoint: number; settings: any}[]

  }

  


const HomeSlider:React.FC = () => {
    const [imageIndex, setImageIndex] = useState<number>(0);

    const sliderRef = React.useRef<Slider>(null);

    const settings:TSliderProps = {
        className: 'homeSlickBaner',
         infinite: true,
         speed: 1000,
         autoplay: false,
         autoplaySpeed: 2500,
         slidesToShow: 2,
         slidesToScroll: 1,
         centerMode: false,
         nextArrow: <NextArrow />,
         prevArrow: <PrevArrow />,
         beforeChange: (current, next) => setImageIndex(next),
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1
            },
          },
        ],
      };


  return (
    <div className="home_Slider_wrapper">
        <Slider {...settings} ref={sliderRef} >
            {slidersImg?.map((img, idx) => (
                <div className={idx === imageIndex ? "custom_slide growSlide" : "custom_slide"} key={idx}>
                <img src={img} alt={img} />
                </div>
            ))}
        </Slider>
        <div className="count"><span>{imageIndex + 1}/</span>{slidersImg.length}</div>
    </div>
  
  )
}
export default HomeSlider;