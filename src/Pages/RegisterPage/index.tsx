import React, {useState} from 'react'

import {Link, useNavigate} from "react-router-dom"
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import classes from "./RegisterPage.module.scss"
import {registerUser} from '../../redux/slices/userSlice'
import { useAppDispatch } from '../../redux/store'
import { Breadcrumbs } from '../../Components'
import { toast } from 'react-toastify';
import check from '../../assets/img/w-check.svg'
import registerImg from '../../assets/img/register.jpg'


interface MyForm {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirm_password: string;
}
const RegisterPage:React.FC = () => {
    

    const {register, handleSubmit, formState: {errors}, watch} = useForm<MyForm>({})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const registerNewUser = async(data: MyForm) => {
        console.log('submit')
          
            const formData = {
                username: data.name,
                email: data.email,
                password: data.password,
                acf: {
                    user_phone: data.phone,
                    user_name : data.name
                }
              }
              
              dispatch(registerUser(formData));
              toast.info("Ви успішно були зареєстрований!");
              navigate('/login');
      }


    const [isCheck, setIsCheck] = useState<boolean>(true)

    const submit: SubmitHandler<MyForm> = data => {
        console.log(data);
        registerNewUser(data)
    }
    const error: SubmitErrorHandler<MyForm> = data => {
        console.log(data);
    }
  return (
    <div className="container">
        <Breadcrumbs first_link='/' first_link_name='Створити акаунт' />
        <div className={classes.register__wrapper}>
            <div className={classes.register__wrapper_left}>
                <h1>створити акаунт</h1>
                <form onSubmit={handleSubmit(submit, error)}>
                    <div className="inputCEF">
                        <span>Ім’я</span>
                        <input 
                        type="text"
                        {...register('name',
                            {
                                required: "Введіть Ваше ім'я або нікнейм",
                                minLength: {
                                    value: 3,
                                    message: "Занадто коротке ім'я (від 3х символів)"
                                }
                            }
                        )}
                         placeholder="Ніка"
                        // value={name} 
                        // onChange={(e)=> setName(e.target.value) } 
                        />
                          <div className='errorInputCEF'>{errors?.name && (<p>*{errors?.name?.message}</p>) }</div>
                    </div>
                    
                    <div className="inputCEF">
                        <span>Номер телефону</span>
                        <input 
                        type="tel"
                         placeholder="+80986745907"
                         {...register('phone',
                            {
                                required: "Введіть Ваш телефон",
                                minLength: {
                                    value: 10,
                                    message: "Недостатньо символів"
                                }
                            }
                        )}
                        // value={phone}
                        // onChange={(e)=> setPhone(e.target.value)} 
                         />
                           <div className='errorInputCEF'>{errors?.phone && (<p>*{errors?.phone?.message}</p>) }</div>
                    </div>
                    <div className="inputCEF">
                        <span>Email</span>
                        <input
                            type="mail"
                            placeholder="nika.romanenko@gmail.com" 
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
                    <div className="inputCEF">
                        <span>Пароль</span>
                        <input 
                        type="password"
                        {...register("password", {
                            required: "Введіть пароль аккаунту",
                            minLength: {
                                value: 8,
                                message: 'Занадто короткий пароль (не меньш ніж 8 символів)'
                            }
                           })}
                        // placeholder="nika1818"
                        // value={pass}
                        // onChange={(e)=> setPass(e.target.value)}
                         />
                         <div className='errorInputCEF'>{errors?.password && (<p>*{errors?.password?.message}</p>) }</div>
                    </div>
                    <div className="inputCEF">
                        <span>Підтвердити пароль</span>
                        <input type="password"
                         {...register("confirm_password", {
                            required: "Введіть пароль аккаунту",
                            validate: (val: string) => {
                              if (watch('password') !== val) {
                                return "Ваші паролі не співпадають";
                              }
                            },
                           })}
                        //  placeholder="nika1818"
                        //   value={repeatPass}
                        //    onChange={(e)=> setRepeatPass(e.target.value)}
                            />
                            <div className='errorInputCEF'>{errors?.confirm_password && (<p>*{errors?.confirm_password?.message}</p>) }</div>
                    </div>

                 
                        <div className={classes.register__servBox}>
                            <div className={classes.checkbox}>
                                <div className={classes.checkbox__squre} onClick={() => setIsCheck(!isCheck)}>
                                    {isCheck && <img src={check} alt="" />}    
                                </div>
                                Тримайте мене в курсі
                            </div>
                            <Link to="/recover" className={classes.formLink}>Забули пароль?</Link>
                        </div>

                        <div className={classes.mark}>*Поставивши прапорець вище, ви погоджуєтеся отримувати повідомлення електронною поштою від CEF LAB. Це можна змінити в будь-який час.</div>

                        <button type='submit' className="blackBtn">створити акаунт</button>
                  
                </form> 
                <div className={classes.noAccount}>
                    Натискаючи «Приєднатися зараз», ви погоджуєтеся з  <Link to='/register' className={classes.noAccount__link}>Політикою конфіденційності</Link>  та  <Link to='/register' className={classes.noAccount__link}>Умовами використання</Link> .
                </div>
                <div className={classes.noAccount}>
                    Вже є аккаунт?  <Link to='/login' className={classes.noAccount__link}>Увійти</Link> .
                </div>

            </div>
            <div className={classes.register__wrapper_right}>
                <img src={registerImg} alt="" />
            </div>
         
        </div>
    </div>
  )
}
export default RegisterPage;