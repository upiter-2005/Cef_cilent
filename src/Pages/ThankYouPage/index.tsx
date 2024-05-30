import React from 'react'

import classes from "./ThankYouPage.module.scss"

import {Link} from 'react-router-dom'


import { Breadcrumbs } from '../../Components'

import logo from "../../assets/img/logo_footer.svg"
import thankyou from "../../assets/img/thnkyou.jpg"



const ThankYouPage: React.FC = () =>  {
  return (
    <div className={classes.home}>
      
      <div className="container">
      <Breadcrumbs first_link='/contact' first_link_name='Дякуємо за покупку' />
          <div className={classes.firstHome}>
            <div className={classes.left}>
              <img src={logo} alt="" />
              <h2>Дякуємо за  <br /> покупку! </h2>
              <p>Ваше замовлення успішно оформлено і скоро буде відправлене до вас.</p>
              <Link to='/' className="blackBtn">повернутися на головну</Link>
            </div>
           
           <div className={classes.right}>
            <div className={classes.imgBox}>  <img src={thankyou} alt="" /></div>
            
           </div>
          </div>
      </div>

    

      
      
    </div>
  )
}
export default ThankYouPage;
