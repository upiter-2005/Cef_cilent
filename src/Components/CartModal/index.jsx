import {useEffect} from 'react'
import classes from "./CartModal.module.scss"
import {useSelector} from 'react-redux'
import {selectCart, minusItem, plusItem, removeItem} from '../../redux/slices/cartSlice'

import closeIco from '../../assets/img/closeModal.svg'

import del from '../../assets/img/delete.svg'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store'

 
export default function CartModal ({active, closeModal}) {
    const dispatch = useAppDispatch()

    const { items, totalPrice } = useSelector(selectCart)
    useEffect(() => {
        if(active){
        document.body.style.overflow = "hidden";
        }else{
        document.body.style.overflow = "scroll";
        }
   
    // document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "scroll"
    };
}, [active]);


  return (
    <div className={ active ? `${classes.modal}  ${classes.active}` :`${classes.modal}` } onClick={closeModal}>
      <div className={classes.modal__content} onClick={(e)=> e.stopPropagation()}>
     
        <img src={closeIco} className={classes.closeModal} onClick={closeModal} 
          alt="CEF - close icon"
          title="CEF - close icon"  
         />     
        <p className={classes.title}>Кошик</p>

    {items.length < 1 &&   <div className={classes.empty}>Кошик пустий. Буль ласка, додайте продукти.</div>}
      
        <div className={classes.cartBox}>
        {
        items?.map((obj, i) => <>
         <div className={classes.cartItem} key={i}>
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
                              <button onClick={()=>dispatch(plusItem(obj.id))} >+</button>
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
        {items.length > 0 &&  <Link to='/checkout' className={classes.black_btn}>оформити замовлення</Link>}
       

        <Link to='/cart' className={classes.white_btn}>переглянути корзину</Link>
      </div>
    </div>
  )
}
