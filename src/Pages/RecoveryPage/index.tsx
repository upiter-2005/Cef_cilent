import React, {useState, useEffect} from 'react'

import {Link, Navigate} from "react-router-dom"
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import classes from "./RecoveryPage.module.scss"
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import { Breadcrumbs, RecoveryForm } from '../../Components'
import axios from 'axios'
import recovery from '../../assets/img/recovery.jpg'

interface RecoverForm {
    email: string;
}
const RecoveryPage:React.FC = () => {
    const [codeRecieve, setCodeRecieve] = useState<boolean>(false);
     const [email, setEmail] = useState<string>('');

    const {register, handleSubmit, formState: {errors}} = useForm<RecoverForm>({})

    const sendCode = async(data:any) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/customers/sendCodeToEmail/`, {email: data.email}
        ).then(res => {
            console.log(res);
            toast("A password reset email has been sent to your email address.");
            setEmail(data.email)
            setCodeRecieve(true)
            
          }).catch(err => toast("Такий email не зареєстрований"))
      }

      const submit: SubmitHandler<RecoverForm> = data => {
        console.log(data);
        sendCode(data)
      }
    
      const error: SubmitErrorHandler<RecoverForm> = data => {
        console.log(data);
      }
      
  return (
    <div className="container">
             <Breadcrumbs first_link='/' first_link_name='Змінити пароль' />
        <div className={classes.recovery__wrapper}>
            <div className={classes.recovery__wrapper_left}>
                <h1>змінити пароль</h1>


            {codeRecieve ? (
                
                
                 <RecoveryForm email={email} />

            ) : (
                <form onSubmit={handleSubmit(submit, error)}>
                <div className="inputCEF">
                    <span>Email</span>
                    <input type="mail"
                     placeholder="Введіть ваш email"
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
                    <button type='submit' className="blackBtn">Ввести email</button> 
            </form> 
            
            )}
               
                

            </div>
            <div className={classes.recovery__wrapper_right}>
                <img src={recovery} alt="" />
            </div>
         
        </div>
    </div>
  )
}
export default RecoveryPage;