/* eslint-disable no-lone-blocks */
import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss"

// const images = [
//     {
//       original: '/img/p1.png',
//       thumbnail: '/img/p1.png',
//     },
//     {
//       original: '/img/p2.png',
//       thumbnail: '/img/p2.png',
//     },
//     {
//       original: '/img/ln1.jpg',
//       thumbnail: '/img/ln1.jpg',
//     },
//   ];
 function VideoItem({video}){
  return (
   <video src={video} width="100%" height="100%" controls autoPlay></video>
  )
}
export default function ProductGallery({productImgs, video, poster}) {

    const [imgs, setImgs] = useState([])

    useEffect(()=> {
       console.log(productImgs);
        const imgObj = productImgs.map((obj)=>{
                return {
                    original: obj.src,
                    thumbnail: obj.src 
                } 
            })
            setImgs(imgObj)

           
            {video ? (setImgs([...imgObj, {
              original: "",
              thumbnail: poster ,
              //renderItem: () => {<video src={video} width="100%" height="100%" controls autoPlay></video>},
              renderItem: () => <VideoItem video={video} />,
             // renderThumbInner: () => <VideoItem />,
             }])) : (setImgs(imgObj)) }

            

    }, [productImgs, video, poster])
  return (
    <>
    <ImageGallery 
    additionalClass="productGallery"
    showBullets={false}
    showNav={false}
    infinite={true}
    disableThumbnailSwipe={true}
    disableThumbnailScroll={true}
    disableSwipe={true}
    useBrowserFullscreen={false}
    thumbnailPosition="left" 
    showPlayButton={false}
    slideOnThumbnailOver={false}
    items={imgs} />
    </>
  )
}