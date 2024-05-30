import React, {useState, useEffect} from 'react'

import classes from './ProductTabs.module.scss'

import infoImg from '../../assets/img/color_img.jpg'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import axios from 'axios'

type ProductTabsType = {
    type: string,
    opis: string,
    sposib_zastosuvannya?: string,
    aktivni_ingredinti?: string,
    rezultat_dlya_setiv?: string,
    protokol_proczeduri?: string,
    content_image?: string,
}
const ProductTabs:React.FC<ProductTabsType> = ({type, opis, sposib_zastosuvannya, aktivni_ingredinti, rezultat_dlya_setiv, protokol_proczeduri, content_image}) => {
    const [contentImg, setContentImg] = useState<string>('')
    
    const findCopntentAttachment = async() =>{
        await axios(`https://api.apicef.space/wp-json/wp/v2/media/${content_image}`)
        .then((res: any) => {setContentImg(res.data.source_url) }) 
    }
    useEffect(()=>{
        findCopntentAttachment()
    }, [content_image])
    
  return (
    <div className={classes.product_color_Info}>
        <div className="container">
        <div className={classes.product_color_InfoBox}>
            <div className={classes.color_Info_left}>
                <h2>огляд</h2>
                <div className={classes.product_tabs}>
                <Tabs>
                    <TabList>
                    <Tab>Опис</Tab>
                        {type !== 'set' &&
                            (<>
                                <Tab>Спосіб застосування</Tab>
                                <Tab>Активні інгредієнти</Tab>
                            </>)
                        } 
                        {type === 'set' &&
                            (<>
                                <Tab>результат</Tab>
                                <Tab>протокол процедури </Tab>
                            </>)
                        } 
                     
                        
                    </TabList>

                    <TabPanel>
                        <div className="tabContent">
                            {opis}
                        </div>
                    </TabPanel>

                    {sposib_zastosuvannya && (<TabPanel>
                        <div className="tabContent">{sposib_zastosuvannya}</div>
                    </TabPanel>)}
                    {aktivni_ingredinti && (<TabPanel>
                        <div className="tabContent">{aktivni_ingredinti}</div>
                    </TabPanel>)}
                    {rezultat_dlya_setiv && (<TabPanel>
                        <div className="tabContent">{rezultat_dlya_setiv}</div>
                    </TabPanel>)}
                    {protokol_proczeduri && (<TabPanel>
                        <div className="tabContent">{protokol_proczeduri}</div>
                    </TabPanel>)}
                    
                    
                </Tabs>
                </div>
            </div>
            <div className={classes.color_Info_right}>
                <img src={contentImg} alt="" />
            </div>
        </div>
    </div>
    </div>
  )
}
export default ProductTabs;