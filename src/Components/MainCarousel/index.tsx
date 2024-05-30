import React, {useRef, useState} from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ln1 from "../../assets/img/ln1.jpg"
import ln2 from "../../assets/img/ln2.jpg"
import ln3 from "../../assets/img/ln3.jpg"

import prev from "../../assets/img/l_prod_slider.svg"
import next from "../../assets/img/r_prod_slider.svg"

import { CustomArrowProps, default as Slider } from "react-slick";
import { Link } from 'react-router-dom';

// import Slider from 'react-slick'





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
    adaptiveHeight?: false,
    className?: string,
    infinite?: boolean,
    dots?: boolean,
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

  


const MainCarousel:React.FC = () => {
    const [imageIndex, setImageIndex] = useState<number>(0);

    const sliderRef = React.useRef<Slider>(null);

    const settings:TSliderProps = {
        className: 'mainPage_carousel',
         infinite: true,
         dots: true,
         speed: 1000,
         autoplay: false,
         autoplaySpeed: 2500,
         slidesToShow: 3,
         slidesToScroll: 1,
         centerMode: false,
         nextArrow: <NextArrow />,
         prevArrow: <PrevArrow />,
         //beforeChange: (current, next) => setImageIndex(next),
         responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              adaptiveHeight: true,
              // className: "center",
              // slidesToShow: 1,
               centerPadding: "0",
               centerMode: true,
            },
          },
        ],
      };


  return (
   
        <Slider {...settings} ref={sliderRef} >
           
              <div className="unic__Item">
                <img src={ln1} alt="" />
                <p>ЛІНІЯ AQUA O2XY</p>
                <div>Oxygen Complex - синергетичний комплекс дріжджового екстракту, морського глікогену та похідного вітаміну С. Цей інноваційний продукт збільшує споживання кисню, тим самим стимулюючи вироблення енергії в клітинах шкіри.</div>
                <Link to='/' className="moreBtn">до ЛІНІЇ</Link>
              </div>
              <div className="unic__Item">
                
                <img src={ln2} alt="" />
                <p>ЛІНІЯ 3R CERAMIDE</p>
                <div>Ceramide Complex CLR™  містить ліпіди у ламелярній формі. Суміш ліпідів, виділена з рослин, складається з фосфоліпідів та сфінголіпідів. Цей продукт підтримує суху та потріскану/обвітрену шкіру.</div>
                <Link to='/' className="moreBtn">до ЛІНІЇ</Link>
              </div>
              <div className="unic__Item">
                
                <img src={ln3} alt="" />
                <p>ЛІНІЯ β-BIOTIC</p>
                <div>An introductory set of NIOD's An introductory set of NIOD's fundamental formulas. An introductory set of NIOD's fundamental formulas. An introductory set of NIOD's fundamental formulas. fundamental formulas. </div>
                <Link to='/' className="moreBtn">до ЛІНІЇ</Link>
              </div>
              
        </Slider>
  )
}
export default MainCarousel;