import React, {useEffect, useState} from 'react'

import classes from "./ComunityPage.module.scss"

import {Helmet} from "react-helmet"
import axios from 'axios'

import logo from "../../assets/img/logo_footer.svg"




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
      <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
        <title>{seoTitle}</title> 
        <meta name="description" content={seoDescr} />
        <meta property="og:title" content={seoTitle} data-react-helmet="true" />
        {/* <meta property="og:image" content={catImg} /> */}
        <meta property="og:description" content={seoDescr} />
    </Helmet>

    

</>
    
  )
}
export default ComunityPage;
