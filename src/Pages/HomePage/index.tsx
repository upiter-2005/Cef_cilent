import React, {useEffect, useState} from 'react'

import classes from "./Home.module.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet"
import axios from 'axios'
import { Accordion, HomeSlider, MainCarousel } from '../../Components'

import logo from "../../assets/img/logo_footer.svg"
import home3 from "../../assets/img/home3Mob.jpg"
import home4 from "../../assets/img/home4.jpg"
import home2 from "../../assets/img/mob2home.jpg"

import u1 from "../../assets/img/u1.jpg"
import u2 from "../../assets/img/u2.jpg"
import u3 from "../../assets/img/u3.jpg"
import u4 from "../../assets/img/u4.jpg"
import u5 from "../../assets/img/u5.jpg"



const Home: React.FC = () =>  {

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

    <div className={classes.home}>
      
      <div className="container">
          <div className={classes.firstHome}>
            <div className={classes.left}>
              <img src={logo} alt="" />
              <h2>ЦільовЕ РІШЕННЯ <br />в дермології </h2>
              <p>Цільові космецевтичні рішення клінічного рівня для кожної індивідуальної потреби шкіри.</p>
            </div>
           
           <div className={classes.right}>
              <HomeSlider />
           </div>
          </div>
      </div>

      <div className={classes.secondHome}>
        <div className="container">
          <div className={classes.info}>
              <span>скоро в продажі</span>
              <h2>пілінги  </h2>
              <p>Copper Peptides offer multiple benefits when applied to the skin, a few of which include reduced signs of aging and a visibly enhanced, smoother-looking appearance.</p>
              <img src={home2} alt="" className={classes.mobIMg2} />
            </div>
        </div>
      </div>
      <div className={classes.unic}>
        <div className="container">
          <div className={classes.unic_titleBox}>
            <h2>5 унікальних <span>професійних процедур</span></h2>
          </div>
          
          <div className={classes.unic__row}>

            <div className={classes.unic__Item}>
              <p>ГЛОБАЛЬНА ОМОЛОЖДУВАЛЬНА СИСТЕМА</p>
              <img src={u1} alt="" />
              <div>Ефективна 3-рівнева процедура для вираженого ліфтингу, миттєвої корекції проявів фото- та хроностаріння, гіперпігментації ...</div>
              <Link to='/' className={classes.moreBtn}>ДІЗНАТИСЬ БІЛЬШЕ</Link>
            </div>
            <div className={classes.unic__Item}>
              <p>ФІТОАКТИВНИЙ ОКСІПІЛІНГ</p>
              <img src={u2} alt="" />
              <div>Передова методика відновлення внутрішньотканинного дихання та функцій клітин шкіри спрямованої дії для корекції жирної та проблемної ...</div>
              <Link to='/' className={classes.moreBtn}>ДІЗНАТИСЬ БІЛЬШЕ</Link>
            </div>
            <div className={classes.unic__Item}>
              <p>КИСНЕВА ТЕРАПІЯ О2XY</p>
              <img src={u3} alt="" />
              <div>An innovative anti-aging treatment based on highly effective botanicals and biomimetic endorphin peptide with Botox-like anti-wrinkle effect</div>
              <Link to='/' className={classes.moreBtn}>ДІЗНАТИСЬ БІЛЬШЕ</Link>
            </div>


          </div>
          <div className={classes.unic__row}>

            <div className={classes.unic__Item}>
              <p>ЕКСПРЕС-ПРОЦЕДУРА РЕНЕСАНС</p>
              <img src={u4} alt="" />
              <div>Іноваційна антивікова процедура на основі високоефективних рослинних компонентів та біоміметичного ендорфінового пептиду з ботоксоподібною дією проти ...</div>
              <Link to='/' className={classes.moreBtn}>ДІЗНАТИСЬ БІЛЬШЕ</Link>
            </div>
            <div className={classes.unic__Item}>
              <p>КРИШТАЛЕВА ФЕРМЕНТНА ЧИСТКА</p>
              <img src={u5} alt="" />
              <div>Унікальна система ферментативної чистки в формі гелю поєднує в собі комплексну дію 7 ферментів для повноцінного і глибокого очищення шкіри...</div>
              <Link to='/' className={classes.moreBtn}>ДІЗНАТИСЬ БІЛЬШЕ</Link>
            </div>


          </div>

        </div>
      </div>

      <div className={classes.filosofia}>
        <div className={classes.info}>
            <h2>Філофія бренду</h2>
            <p>Copper Peptides offer multiple benefits when applied to the skin, a few of which include reduced signs of aging and a visibly enhanced, smoother-looking appearance.</p>
            <Link to="/" className={classes.infoMore}>ДІЗНАТИСЬ БІЛЬШЕ</Link>
            <img src={home3} className={classes.mobImg} alt="" />
        </div>
      </div>

      <div className={classes.home__carousel}>
        <h2>ДОМАШНІЙ ДОГЛЯД</h2>
        <MainCarousel />
      </div>

      <div className={classes.home__about}>
        <div className="container">
          <h2>cef lab </h2>
          <div className={classes.home__about_Row}>
            <div className={classes.home__about_Col}>
              <p>переваги СEF LAB</p>
              <div>Цільові космецевтичні рішення клінічного рівня для кожної індивідуальної потреби шкіри. Українська антиоксидантна космецевтика створена на основі інкапсульованого в цитосфері вітаміну С, вітаміну Е та ферулової кислоти, які вивільняються за технологією SLOW RELEASE, відтворюючи структуру шарів шкіри. Цей «Голлівудський коктейль молодості», поєднавши в собі інноваційні та потужні інгредієнти та мікронізовані автентичні українські екстракти та олії, забезпечує видимі результати навіть для найскладнішої шкіри.</div>
              <a href="#" className={classes.home__about_infoMore}>cef community</a>
            </div>
            <div className={classes.home__about_Col}>
              <p>співпрацяз СEF lab</p>
              <div>CEF Lab заключается в том, чтобы предлагать качественную косметику, соответствующую последним тенденциям в мире косметики. Мы активно исследуем рынок, применяя современные инновационные технологии и высококачественные ингредиенты для создания продуктов для вашей красоты. Предлагаем эффективные и практические решения, чтобы помочь вам достичь потрясающего результата. Мы верим, что наша миссия помогать людям достичь максимальной красоты и комфорта в использовании наших продуктов.</div>
              
            </div>
            <div className={classes.home__about_ColImg}>
              
              <div className={classes.home__about_Img}>
                <img src={home4} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.home__faq}>
        <div className="container">
          <h2>faq</h2>
          {faq?.map((el:any, i: number) => (
            <>
             <Accordion key={i} title={el.question} content={el.text} />
             </>
          ) )}
         
          <div className={classes.seoText} dangerouslySetInnerHTML={{ __html: seoText }}></div>
        </div>
      </div>
      
    </div>

</>
    
  )
}
export default Home;
