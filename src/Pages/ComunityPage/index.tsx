import React, {useEffect, useState} from 'react'

import classes from "./ComunityPage.module.scss"
import { Breadcrumbs } from '../../Components'

import {Helmet} from "react-helmet"
import axios from 'axios'

import c1 from "../../assets/img/comunity1.jpg"
import c2 from "../../assets/img/comunity2.jpg"




const ComunityPage: React.FC = () =>  {

  const [faq, setFaq] = useState<any>()
  const [seoText, setSeoText] = useState<string>('')
  const [seoTitle, setSeoTitle] = useState<string>('')
  const [seoDescr, setSeoDescr] = useState<string>('')

  const getApiDataPage = async() => {
    try {
      await axios.get('https://api.apicef.space/wp-json/wp/v2/pages/71')
      .then((res: any) => {
        setFaq(res.data.acf.faq)
        setSeoText(res.data.acf.seo_text)
        setSeoTitle(res.data.yoast_head_json.og_title)
        setSeoDescr(res.data.yoast_head_json.description)
        console.log(res.data);
      } )
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getApiDataPage()
  }, [])

  return (
    <>
    <Helmet>
      <link rel="canonical" href={`https://apicef.space${window.location.pathname}`} />
        <title>{seoTitle}</title> 
        <meta name="description" content={seoDescr} />
        <meta property="og:title" content={seoTitle} data-react-helmet="true" />
        {/* <meta property="og:image" content={catImg} /> */}
        <meta property="og:description" content={seoDescr} />
    </Helmet>

    <div className={classes.comunity_wrapper}>
      
      <div className="container">
      <Breadcrumbs first_link='/comunity' first_link_name='СEF комьюніті' isWhite={true} />
        <div className={classes.cm1}>
          <div className={classes.cm1_left}>
            <h1> Антиоксидантная космецевтика Точные решения</h1>
            <p>Цільові космецевтичні рішення клінічного рівня для кожної індивідуальної потреби шкіри. Українська антиоксидантна космецевтика створена на основі інкапсульованого в цитосфері вітаміну С, вітаміну Е та ферулової кислоти, які вивільняються за технологією SLOW RELEASE, відтворюючи структуру шарів шкіри. Цей «Голлівудський коктейль молодості», поєднавши в собі інноваційні та потужні інгредієнти та мікронізовані автентичні українські екстракти та олії, забезпечує видимі результати </p>
            <div className={classes.cm1_label}>МИ ОБ’ЄДНУЄМО ПРИСТРАСТЬ ДО НАУКИ ТА КРАСИ ДЛЯ ДОСЯГНЕННЯ ВРАЖАЮЧИХ РЕЗУЛЬТАТІВ</div>
          </div>
          <div className={classes.cm1_right}>
            <img src={c1} alt="" />
          </div>
        </div>

     
      </div>

      
        <div className={classes.cm2_wrapper}>
        <div className={classes.cm2}>
       
            <div className={classes.cm2_left}>
              <img src={c2} alt="" />
            </div>
            <div className={classes.cm2_right}>
              <h2>SCIENCE &RESULTS</h2>
              <div className={classes.List_cm}>
                  <div className={classes.List_cm_box}>
                      <div className={classes.List_cm_item}>Якість ISO 9001:2015, GMP ISO 22716:2015</div>
                      <div className={classes.List_cm_item}>Унікальні формули та клінічно перевірені інгредієнти </div>
                      <div className={classes.List_cm_item}>Безпечні та гіпоалергенні продукти</div>
                  </div>
                  <div className={classes.List_cm_box}>
                      <div className={classes.List_cm_item}>Поліпшення якості шкіри</div>
                      <div className={classes.List_cm_item}>Ліпосомована система СEF <span> ( вітамін С, Е, ферулова кислота)</span></div>
                      <div className={classes.List_cm_item}>Target action <span>(значек с коробки)</span></div>
                  </div>
              </div>
              <div className={classes.List_cm}>
                  <div className={classes.List_cm_box}>
                      <div className={classes.List_cm_item}>Он-лайн платформа </div>
                      <div className={classes.List_cm_item}>Тренінги та майстер класи </div>
                      <div className={classes.List_cm_item}>Готові протоколи</div>
                  </div>
               
              </div>
            </div>
         
          </div>
        </div>


    </div>

</>
    
  )
}
export default ComunityPage;
