import React, {useState, useEffect} from 'react'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import {setAuth, setToken, setUser, setUserId, setUserPhone, setUserName} from '../../redux/slices/userSlice'
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/store'
import {useSelector} from 'react-redux'
import {selectUser} from '../../redux/slices/userSlice'

import classes from "./LoginPage.module.scss"

import { Breadcrumbs } from '../../Components'

import check from '../../assets/img/w-check.svg'


interface MyForm {
  nameLogin: string;
  password: string;
}
const LoginPage:React.FC = () => {

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: {errors}
  } = useForm<MyForm>({});

    const dispatch = useAppDispatch()
    const {isAuth, user} = useSelector(selectUser);
    const [isCheck, setIsCheck] = useState<boolean>(true)
    const navigate = useNavigate();

    const loginAccount = async() => {
      const token = localStorage.getItem('token');
      axios.get( `${process.env.REACT_APP_SITE_URL}/wp-json/wp/v2/users/me`, 
                  {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  } 
     ).then((res: any)=>{
          console.log(res.data); 
          localStorage.setItem( 'user_phone', res.data.acf.user_phone );      
          localStorage.setItem( 'user_nicename', res.data.acf.user_name );      
          dispatch(setUserPhone(res.data.acf.user_phone));
          dispatch(setUserName(res.data.acf.user_name));
          
          dispatch(setUserId(res.data.id));
          navigate('/account');
          toast.info("Ви увійшли в обліковий кабінет!");
        }
      ).catch(err => console.log(err))
    }
  
  const loginSubmit  = async(dataForm: any) =>{
    const data = {
      username: dataForm.nameLogin, 
      password: dataForm.password
    }
  
    axios.post( `${process.env.REACT_APP_SITE_URL}/wp-json/jwt-auth/v1/token`, data )
        .then( (res: any) => {
            // if ( undefined === res.data.token ) {
            //     console.log( { error: res.data.message, loading: false } );
            //     return;
            // }
            if(res){
                console.log(res.data);
                const { token, user_nicename, user_email } = res.data;
                localStorage.setItem( 'token', token );
                localStorage.setItem( 'userEmail', user_email );
                //localStorage.setItem( 'user_nicename', user_nicename );
                //localStorage.setItem( 'user_phone', acf.user_phone );
    
                dispatch(setAuth(true));
                dispatch(setToken(token));
                dispatch(setUser({ token, user_nicename, user_email}));
              
                loginAccount();
            }
          
        } )
        .catch( (err: any) => {
          console.log('error login');
           
        } 
    )
  }

  const submit: SubmitHandler<MyForm> = data => {
    console.log(data);
    loginSubmit(data)
  }

  const error: SubmitErrorHandler<MyForm> = data => {
    console.log(data);
    
  }

  useEffect(()=>{
      if(isAuth) navigate('/account');
  }, [isAuth])
  return (
    <div className="container">
             <Breadcrumbs first_link='/' first_link_name='Увійти' />
        <div className={classes.login__wrapper}>
            <div className={classes.login__wrapper_left}>
                <h1>увійти</h1>
                <form onSubmit={handleSubmit(submit, error)}>
                    <div className="inputCEF">
                        <span>Email</span>
                        <input type="text"
                       {...register('nameLogin', {required: "Введіть пошту",
                              pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Невірний формат пошти!"
                            }
                     
                          }
                        )
                      }
                       aria-invalid={errors.nameLogin ? true : false}
                        />
                         
                        <div className='errorInputCEF'>{errors?.nameLogin && (<p>*{errors?.nameLogin?.message}</p>) }</div>
                    </div>

                    <div className="inputCEF">
                        <span>Пароль</span>
                        <input type="password"
                        {...register('password', 
                        {
                          required: "Введіть пароль"
                        }
                      )}
                          />
                          <div className='errorInputCEF'>{errors?.password && (<p>*{errors?.password?.message}</p>) }</div>
                    </div>

                 
                        <div className={classes.login__servBox}>
                            <div className={classes.checkbox}>
                                <div className={classes.checkbox__squre} onClick={() => setIsCheck(!isCheck)}>
                                    {isCheck && <img src={check} alt="" />}    
                                </div>
                                Запам’ятати мене
                            </div>
                            <Link to="/recover" className={classes.formLink}>Забули пароль?</Link>
                        </div>

                        <button type='submit' className="blackBtn">Увійти</button>
                  
                </form> 
                <div className={classes.noAccount}>
                    Немає облікового запису? <Link to='/register' className={classes.noAccount__link}>Створити аккаунт?</Link> 
                </div>
            </div>
            <div className={classes.login__wrapper_right}>
                <div className={classes.login__right_inner}>
                    <h2>зареєструватися</h2>
                    <p>Налаштуйте обліковий запис, щоб ми могли запам’ятати ваші дані та пришвидшити ваш наступний візит.</p>
                    <Link to="/register" className='registerBtn'>створити новий акаунт</Link>
                </div>
            </div>
         
        </div>
    </div>
  )
}
export default LoginPage;