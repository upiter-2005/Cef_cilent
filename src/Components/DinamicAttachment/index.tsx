import React, {useEffect, useState} from 'react'
import classes from './DinamicAttachment.module.scss'
import axios from 'axios'

type DinamicAttachmentType = {
    imgId: string
}



const DinamicAttachment:React.FC<DinamicAttachmentType> = ({imgId}) => {
    const [src, setSrc] = useState<string>('');

    const findAttachmentById = async(img: string) =>{
        await axios(`https://api.apicef.space/wp-json/wp/v2/media/${imgId}`)
        .then((res: any) => setSrc(res.data.source_url)) 
    }

    useEffect(()=>{
        findAttachmentById(imgId)
    }, [imgId])

console.log(src);
  return (
    <div>
      {src && <img className={classes.steps_Item__img} src={src} alt='' />}
       
    </div>
  )
}
export default DinamicAttachment