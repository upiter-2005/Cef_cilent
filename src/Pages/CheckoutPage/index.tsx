import React, {useState} from 'react'

import classes from "./CheckoutPage.module.scss"
import '../../assets/css/RadioInputs.scss'


import { Breadcrumbs, NovaPoshta } from '../../Components'

import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'
import {selectCart, clearItems} from '../../redux/slices/cartSlice'
import {selectUser} from '../../redux/slices/userSlice'
import { useAppDispatch } from '../../redux/store'
import axios from 'axios'
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";

import pay from '../../assets/img/pay.svg'
import gpay from '../../assets/img/gpay.png'
import apay from '../../assets/img/apay.png'
import paypal from '../../assets/img/paypal.png'
import submit_arr from '../../assets/img/submit_arr.svg'



interface CheckoutFormForm {
    name: string;
    surname: string;
    phone: string;
    email: string;
}
 enum Delivery {
    UKRPOSHTA = 'Укр Пошта',
    NOVAPOSHTA = 'Нова Пошта',

}
const CheckoutPage:React.FC = () => {

    const [delivery, setDelivery] = useState<string>(Delivery.NOVAPOSHTA);
    const {register, handleSubmit, formState: {errors}} = useForm<CheckoutFormForm>({})
    const dispatch = useAppDispatch()
    const {items} = useSelector(selectCart)
    const {id} = useSelector(selectUser)
    const navigate = useNavigate()
   

    const checkoutProcess = async(data:CheckoutFormForm) => {
        // @ts-ignore
        const products = JSON.parse(localStorage.getItem('cart'));
        console.log(products);
        const productsArr:any = [];
        products.forEach((obj: any) => {
           let {id, count, price} = obj;
           productsArr.push({product_id: id,quantity: count, price: price })
        });


        const dataOrder = {
            payment_method: "bacs",
            payment_method_title: 'custom_payment',
            set_paid: true,
            billing: {
              first_name: data.name,
              last_name: data.surname,
              address_1: "in progress",
              address_2: "in progress",
              city: "in progress",
              state: "in progress",
              postcode: "--------",
              country: "in progress",
              email: data.email,
              phone: data.phone,
              
            },
            customer_id: id || 0,
            //customer_note: `promo code - ${promoName}` + comment,
            shipping: {
                first_name: data.name,
                last_name: data.surname,
                address_1: "in progress",
                address_2: "in progress",
                city: "in progress",
                state: "in progress",
                postcode: "in progress",
                country: "in progress",
            },
            line_items: productsArr,
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "0"
              }
            ],
            meta_data: [
              {promo: "promoCustomize"}
            ]
        };

        try {
            const {data} =  await axios.post(`${process.env.REACT_APP_API_URL}/api/order/createOrder`, dataOrder);
           //Payment function
             if(data !== undefined) {
              localStorage.removeItem('cart');
              console.log("DONE!!!!!!");
              console.log(data);
              dispatch(clearItems())
            toast.info("Ваше замовлення прийнято!");
            navigate('/thank')
            }
          //Payment function
          } catch (error) {
              
          }

    }
    const submit: SubmitHandler<CheckoutFormForm> = data => {
        console.log(data);
        checkoutProcess(data)
    }
    const error: SubmitErrorHandler<CheckoutFormForm> = data => {
        console.log(data);
    }
console.log(delivery);
  return (
    <>
    <Helmet>
          <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
            <title>CEF LAB - оформити замовлення</title> 
            <meta name="description" content="CEF LAB - оформити замовлення" />
            <meta property="og:title" content="CEF LAB - оформити замовлення" data-react-helmet="true" />
            {/* <meta property="og:image" content={catImg} /> */}
            <meta property="og:description" content="CEF LAB - оформити замовлення" />
        </Helmet>
        <div className="container">
        
        <Breadcrumbs first_link='/contact' first_link_name='Оформити замовлення' />
         <div className={classes.checkout}>
             <div className={classes.left}>
                 <h1>оформити замовлення</h1>
                 <form onSubmit={handleSubmit(submit, error)}>
 
                     <p className={classes.subtitle_form}>1. контактні дані</p>
                     <p className={classes.text_form}>Введіть контактні дані або <Link to="/login">ввійдіть в акаунт</Link> </p>
                     <div className={classes.form_row}>
                         <div className="inputCEFBlack">
                             <span>Ваше ім'я</span>
                             <input type="text"
                                 placeholder='Петро'
                                 {...register('name',
                                     {
                                         required: "Введіть Ваше ім'я",
                                         minLength: {
                                             value: 3,
                                             message: "Занадто коротке ім'я "
                                         }
                                     }
                                 )}
                               />
                               <div className='errorInputCEF'>{errors?.name && (<p>*{errors?.name?.message}</p>) }</div>
                         </div>
                         <div className="inputCEFBlack">
                             <span>Прізвище</span>
                             <input type="name"
                              placeholder='Іванов'
                              {...register('surname',
                                     {
                                         required: "Введіть Ваше прізвище",
                                         minLength: {
                                             value: 3,
                                             message: "Занадто коротке прізвище"
                                         }
                                     }
                                 )}
                               />
                               <div className='errorInputCEF'>{errors?.surname && (<p>*{errors?.surname?.message}</p>) }</div>
                         </div>
                         
                      </div>
                     <div className={classes.form_row}>
                         <div className="inputCEFBlack">
                             <span>Номер телефону</span>
                             <input 
                             type="tel"
                              placeholder='380935677444'
                              {...register('phone',
                             {
                                 required: "Введіть Ваш телефон",
                                 minLength: {
                                     value: 10,
                                     message: "Недостатньо символів"
                                 }
                             }
                         )}
                               />
                                <div className='errorInputCEF'>{errors?.phone && (<p>*{errors?.phone?.message}</p>) }</div>
                         </div>
                         <div className="inputCEFBlack">
                             <span>E-mail</span>
                             <input
                              type="email"
                               placeholder='p.ivanov@gmail.com'
                               {...register('email', {required: "Введіть Ваш email",
                               pattern: {
                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                               message: "Невірний формат пошти!"
                                     }
                                 }
                                 )
                             }
                                />
                                <div className='errorInputCEF'>{errors?.email && (<p>*{errors?.email?.message}</p>) }</div>
                         </div>
                      </div>
 
                     <div className={classes.divider}></div>
                      <p className={classes.subtitle_form}>2. спосіб доставки</p>
 
                      {/* <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="delivery" type="radio" id="del1" value="Укр Пошта" onChange={(e) => setDelivery(e.target.value)} defaultChecked />
                         <label htmlFor="del1">Доставка «Укр Пошта» - 100.00 грн.</label>
                      </div> */}
                      <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="delivery" type="radio" id="del2" value="Нова Пошта" onChange={(e) => setDelivery(e.target.value)} defaultChecked />
                         <label htmlFor="del2">Доставка «Нова Пошта» - 60.00 грн.</label>
                      </div>
                     {delivery === Delivery.NOVAPOSHTA && <NovaPoshta />} 
                      {/* <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="delivery" type="radio" id="del3" value="Кур'єрська доставка" onChange={(e) => setDelivery(e.target.value)} />
                         <label htmlFor="del3">Кур'єрська доставка - безкоштовно</label>
                      </div> */}
 
                      <div className={classes.divider}></div>
 
                      <p className={classes.subtitle_form}>3. спосіб оплати</p>
 
                     {/* <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="pay" type="radio" id="pay1" value="Оплата картою" />
                         <label htmlFor="pay1">Оплата картою <img src={pay} alt="" /></label>
                     </div>
                     <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="pay" type="radio" id="pay2" value="Google Pay" />
                         <label htmlFor="pay2">Google Pay <img src={gpay} alt="" /></label>
                     </div>
                     <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="pay" type="radio" id="pay3" value="Apple Pay" />
                         <label htmlFor="pay3">Apple Pay <img src={apay} alt="" /></label>
                     </div>
                     <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="pay" type="radio" id="pay4" value="PayPal" />
                         <label htmlFor="pay4">PayPal <img src={paypal} alt="" /></label>
                     </div> */}
 
                     <div className={classes.form_checkboxRow}>
                         <input className="custom-radio" name="pay" type="radio" id="pay5" value="Готівка" defaultChecked />
                         <label htmlFor="pay5">Готівкою або картою при отриманні </label>
                     </div>
 
                     <button type="submit" className={classes.checkout_submit}>підтвердити замовлення</button>
                 </form>
             </div> 
             
             <div className={classes.promo}>
                 <p className={classes.title}>ПІДСУМОК ЗАМОВЛЕННЯ</p>
                   <form className={classes.promo_form}>
                     <span>Промокод</span>
                     <input type="text" placeholder='Код' />
                     <button type="submit">Застосувати <img src={submit_arr} alt="" /></button>
                 </form>
                 <div className={classes.promo_result}>
                     <div className={classes.row}>
                         <span>Разом (без знижки)</span>
                         <span>4400 uah</span>
                     </div>
                     <div className={classes.row_red}>
                     <span>Знижка</span>
                         <span>-250 uah</span>
                     </div>
                     <div className={classes.row}>
                         <span>Доставка</span>
                         <span>70 uah</span>
                     </div>
                 </div>
 
                 <div className={classes.promo_result}>
                     <div className={classes.row_bold}>
                         <span>Загалом</span>
                         <span>4400 uah</span>
                     </div>
                 </div>
 
                 <div className={classes.promo_result}>
                     <div className={classes.row}>
                         <span>Кількість позицій</span>
                         <span>1 шт.</span>
                     </div>
                 </div>
 
                 <div className={classes.cartBox}>
                    
 
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
                       {/* <div className={classes.cartItem_el}>
                           <div className="qtyBoxMin">
                               <button onClick={()=>{obj.count !== 1 && dispatch(minusItem(obj.id))}}>--</button>
                               <span>{obj.count}</span>
                               <button onClick={()=>dispatch(plusItem(String(obj.id)))} >+</button>
                           </div>
                       </div> */}
                       <div className={classes.cartItem_el}>
                           <span className={classes.cartPrice}>{obj.price * obj.count} uah</span>
                       </div>
                   </div>
                  
 
               </div>
           </div>
         </>)
       }
 
 
 
                 </div>
               
                 
             </div>
         </div>
     </div>
        </>
   
  )
}
export default CheckoutPage;