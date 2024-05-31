import React from 'react'

import classes from './CartPage.module.scss'

import {useSelector} from 'react-redux'
import {selectCart, minusItem, plusItem, removeItem} from '../../redux/slices/cartSlice'
import { useAppDispatch } from '../../redux/store'

import {Link} from "react-router-dom"
import {Helmet} from "react-helmet";
import del from '../../assets/img/delete.svg'
import submit_arr from '../../assets/img/submit_arr.svg'

import { Breadcrumbs } from '../../Components'

const CartPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const {items, totalPrice} = useSelector(selectCart)
  return (
    <>

        <Helmet>
          <link rel="canonical" href={`https://apicef.space${window.location.pathname}`} />
            <title>CEF LAB - Кошик</title> 
            <meta name="description" content="CEF LAB - Кошик" />
            <meta property="og:title" content="CEF LAB - Кошик" data-react-helmet="true" />
            {/* <meta property="og:image" content={catImg} /> */}
            <meta property="og:description" content="CEF LAB - Кошик" />
        </Helmet>
        <div className="container">
            <Breadcrumbs first_link='/contact' first_link_name='Кошик' />
        </div>

        <div className={classes.cartPage}>
            <div className={classes.left}>
                <h1>Кошик</h1>
                <div className={classes.cartBox}>
                   


                {items.length < 1 && <>
                    <div className={classes.empty}>Кошик пустий. Буль ласка, додайте продукти.</div>
                    <Link to='/login' className={classes.black_btn}>увійти</Link>
                    <Link to='/' className={classes.white_btn}>продовжити покупки</Link>
                </> }
        {items?.map((obj, i) => <>
         <div className={classes.cartItem}>
              <div className={classes.cartItem_img}>
                  <img src={obj.img} alt="" />
              </div>
              <div className={classes.cartItem_data}>
                  <p>{obj.title}</p>
                  <div className={classes.cartItem_stripe}>
                      <div className={classes.cartItem_el}>
                          <span className={classes.cartItem_el_bold}>Об’єм: </span>
                          <span>{obj.capacity} мл</span>
                      </div>
                      <div className={classes.cartItem_el}>
                          <span className={classes.cartItem_el_bold}>Артикул: </span>
                          <span>{obj.sku} </span>
                      </div>
                  </div>
                  <div className={classes.cartItem_stripe}>
                      <div className={classes.cartItem_el}>
                          <div className="qtyBoxMin">
                              <button onClick={()=>{obj.count !== 1 && dispatch(minusItem(obj.id))}}>--</button>
                              <span>{obj.count}</span>
                              <button onClick={()=>dispatch(plusItem(String(obj.id)))} >+</button>
                          </div>
                      </div>
                      <div className={classes.cartItem_el}>
                          <span className={classes.cartPrice}>{obj.price} uah</span>
                      </div>
                  </div>
                  <div className={classes.cartItem_stripe}>
                      <div className={classes.rightAlign}>
                          <button className={classes.cartItem_delete}>
                              <img src={del} alt="" onClick={()=>dispatch(removeItem(obj.id))} />
                          </button>
                      </div>
                  </div>

              </div>
          </div>
        </>)
      }


                </div>
            </div>
            <div className={classes.promo}>
                {/* <form className={classes.promo_form}>
                    <span>Промокод</span>
                    <input type="text" placeholder='Код' />
                    <button type="submit">Застосувати <img src={submit_arr} alt="" /></button>
                </form> */}

                <div className={classes.promo_result}>
                    {/* <div className={classes.row}>
                        <span>Разом (без знижки)</span>
                        <span>{totalPrice} uah</span>
                    </div>
                    <div className={classes.row_red}>
                    <span>Знижка</span>
                        <span>-250 uah</span>
                    </div> */}
                    <div className={classes.row_bold}>
                        <span>Загалом</span>
                        <span>{totalPrice} uah</span>
                    </div>
                </div>

                <div className={classes.cartPage_btn}>
                    <Link to='/checkout' className="blackBtn full">Оформити замовлення</Link>
                </div>
                <div className={classes.cartPage_btn}>
                    <Link to='/' className="inverseBtn full">повернутися до покупок</Link>
                </div>
              
                
            </div>
        </div>
    </>
    
  )
}
export default CartPage;
