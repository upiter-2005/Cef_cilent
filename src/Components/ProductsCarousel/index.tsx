import React, {useEffect, useState} from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import prev from "../../assets/img/l_prod_slider.svg"
import next from "../../assets/img/r_prod_slider.svg"

import { CustomArrowProps, default as Slider } from "react-slick"
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slices/productsSlice'
import {ProductCard} from '../../Components'


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

  
type ProductsCarouselTypes = {
  itemsRelative?: number[]
}

const ProductsCarousel:React.FC<ProductsCarouselTypes> = ({itemsRelative}) => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const {items} = useSelector(selectProducts)

    useEffect(()=>{
      itemsRelative?.forEach((id,i) => {
        const tempProduct:any = items.find((el:any) => el.id === id)
        setRelatedProducts(prevRelatedProducts => [...prevRelatedProducts, tempProduct])
      })
    }, [items,itemsRelative])

    console.log(relatedProducts);
    const sliderRef = React.useRef<Slider>(null);

    const settings:TSliderProps = {
        className: 'product-slider',
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
            breakpoint: 992,
            settings: {
             
              adaptiveHeight: true,
              // className: "center",
               slidesToShow: 1,
               centerPadding: "0",
               centerMode: true,
            },
          },
        ],
      };


  return (
   
    

        <Slider {...settings} ref={sliderRef} >
            {relatedProducts?.map((el:any, i) =>  
              <ProductCard 
                  key={i}
                  id={el.id}
                  sku={el.sku}
                  slug={el.slug}
                  name={el.name}
                  img={el.images[0].src}
                  description={el.description}
                  meta={el.meta_data}
                  price={el.price} 
                  topQuick={true}
              />
              )}
        </Slider>
  
  )
}
export default ProductsCarousel;