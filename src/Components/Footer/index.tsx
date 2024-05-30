import React from 'react'

import classes from './Footer.module.scss'
import {Link} from 'react-router-dom'
import logo from '../../assets/img/logo_footer.svg'
import fb from '../../assets/img/fb.svg'
import insta from '../../assets/img/insta.svg'
import tg from '../../assets/img/tg.svg'
import tiktok from '../../assets/img/tiktok.svg'
import youtube from '../../assets/img/youtube.svg'
import submit from '../../assets/img/submit_arrow.svg'

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={classes.footer}>
      <div className={`${classes.col} ${classes.col_f_1}`}>
        <a href="#"><img src={logo} alt="" className={classes.footer_logo} /></a>
        <p className={classes.copyright}>© Copyright CEF LAB 2024. All rights reserved. </p>
      </div>
      <div className={`${classes.col} ${classes.col_f_2}`}>
        <p className={classes.footer_capture}>Професійний догляд</p>
        <ul>
          <li><Link to="/category/profesijni-nabori">професійні набори</Link></li>
          <li><Link to="/category/bazovi-preparati">базові препарти</Link></li>
       
          
          <li><a href="#">антиоксидантні пілінги</a></li>
        </ul>

        <p className={classes.footer_capture}>домашній догляд</p>
        <ul>
          <li> <Link to="/category/liniya-aqya-o2xy">Лінія <span>AQUA O2XY</span> </Link></li>
          <li><Link to="/category/liniya-3r-ceramide">лінія <span>3R CERAMIDE</span></Link></li>
          <li><Link to="/category/liniya-b-biotic">лінія <span>β-BIOTIC</span></Link></li>
          <li><Link to="/category/liniya-renaissance">лінія <span>RENAISSANCЕ</span></Link></li>
          
        </ul>

        <div className={classes.socsMob}>
          <a href="#"><img src={insta} alt="" /></a>
          <a href="#"><img src={fb} alt="" /></a>
          <a href="#"><img src={tg} alt="" /></a>
          <a href="#"><img src={youtube} alt="" /></a>
          <a href="#"><img src={tiktok} alt="" /></a>
        </div>
        <p className={classes.copyrightMob}>© Copyright CEF LAB 2024. All rights reserved. </p>
      </div>
      <div className={`${classes.col} ${classes.col_f_3}`}>
        <p className={classes.footer_capture}>cef комьюніті</p>
        <ul>
          <li><a href="#">філософія бренду</a></li>
          <li><a href="#">Партнерська програма</a></li>
          <li><a href="#">контакти</a></li>
        </ul>
      </div>
      <div className={`${classes.col} ${classes.col_f_4}`}>
        <p className={classes.footer_capture}>Залишайтесь на зв'язку</p>
        <form className={classes.footer_form}> 
          <span>Номер телефону</span>
          <input type="tel" placeholder='380935677444' />
          <button type='submit'><img src={submit} alt="" /></button>
        </form>

        <div className={classes.footer_descr}>*By checking the above box you are agreeing to receive email communications from DECIEM Inc., it affiliates, brands (The Ordinary and NIOD) and/or marketing partners. This can be changed at any time. Please refer to our Privacy Policy and Terms of Use for more details or Contact Us</div>

        <div className={classes.socs}>
          <a href="#"><img src={insta} alt="" /></a>
          <a href="#"><img src={fb} alt="" /></a>
          <a href="#"><img src={tg} alt="" /></a>
          <a href="#"><img src={youtube} alt="" /></a>
          <a href="#"><img src={tiktok} alt="" /></a>
        </div>
      </div>
    </div>

    </footer>
    
  )
}
export default Footer;