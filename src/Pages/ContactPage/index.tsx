import React, {useState} from 'react'

import classes from './ContactPage.module.scss'

import { Breadcrumbs } from '../../Components'
import axios from 'axios'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'
import fb from '../../assets/img/fb.svg'
import insta from '../../assets/img/insta.svg'
import tg from '../../assets/img/tg.svg'
import check from '../../assets/img/check.svg'


interface ContactForm {
    name: string;
    phone: string;
}
const ContactPage:React.FC = () => {
    const [isCheck, setIsCheck] = useState<boolean>(true)
    const navigate =useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<ContactForm>({})


    const mailSubmit = async( data: ContactForm) => {
        const params = {name: data.name, phone: data.phone};
        console.log(params);
        try {
          const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/mail/sendMail`, params);
        
          if(data.status === 200){
            navigate('/thank');
          }
          return data;
        } catch (e:any) {
          console.log(e.message);
        }
    }

    const submit: SubmitHandler<ContactForm> = data => {
        console.log(data);
        mailSubmit(data)
    }
    const error: SubmitErrorHandler<ContactForm> = data => {
        console.log(data);
    }
  return (
    <div className="container">
        <Breadcrumbs first_link='/contact' first_link_name='Контакти'  />
        <div className={classes.contact__wrapper}>
            <div className={classes.contact__wrapper_left}>
                <h1>контакти</h1>
                
                <div className={classes.contact__stripe}>
                    <div className={classes.contact__stripe_Item50}>
                        <p>Номери телефонів</p>
                        <a href="tel:+380931312456">+380 93 13 12 456</a>
                    </div>
                    <div className={classes.contact__stripe_Item50}>
                        <p>Наша пошта</p>
                        <a href="mailto:Lab@gmail.com">Lab@gmail.com</a>
                    </div>
                </div>
                <div className={classes.contact__stripe}>
                    <div className={classes.contact__stripe_Item}>
                        <p>Адреса</p>
                        <a href="#">Київ вул. Євгена Коновальця, 32, Б</a>
                    </div>
                    <div className={classes.contact__stripe_Soc}>
                        <p>Соц мережі</p>
                        <div className={classes.contact__soc}>
                            <a href="#"><img src={insta} alt="" /></a>
                            <a href="#"><img src={fb} alt="" /></a>
                            <a href="#"><img src={tg} alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.contact__wrapper_right}>
                <h2>Оформити заявку</h2>
                <form onSubmit={handleSubmit(submit, error)}>
                     <p>Вкажіть свій номер телефону і наш менеджер зв`яжеться з вами в найближчий робочий час</p>
                     <div className={classes.form_row}>
                        <div className="inputCEFBlack">
                            <span>Ваше ім'я</span>
                            <input type="text"
                             placeholder='Петро Іванов'
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
                            <span>Номер телефону</span>
                            <input type="tel"
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
                     </div>
                     <div className={classes.checkbox}>
                         <div className={classes.checkbox__squre} onClick={() => setIsCheck(!isCheck)}>
                            {isCheck && <img src={check} alt="" />}    
                         </div>
                         Погоджуюсь з обробкою персональних даних
                    </div>
                     <button type="submit" className="inverseBtn">залишити заявку</button>
                </form>
                

            </div>
        </div>
    </div>
    
  )
}
export default ContactPage;