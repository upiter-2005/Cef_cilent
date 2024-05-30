import React,{useState} from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import {Link, Navigate} from "react-router-dom"
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/userSlice';


interface NewPassForm {
    code: string;
    password: string;
    confirmPassword: string;
}

type RecoveryFormProps = {
    email: string
}
const RecoveryForm:React.FC<RecoveryFormProps> = ({email}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, watch, formState: {errors}} = useForm<NewPassForm>({})


    const changePass = async(data:NewPassForm) => {
      console.log(email);
        axios.post(`${process.env.REACT_APP_API_URL}/api/customers/resetCustomerPasswordWithCode/`, {email,
          code: data.code,
          newPassword: data.password}
        ).then(res => {         
            if( res.status === 200){
              toast("Password reset successfully");
              
              setTimeout(()=>{
                dispatch(logout())
             
                navigate('/login')
              }, 3000)
            }
          }).catch(err => console.log(err))
      }


      const submit: SubmitHandler<NewPassForm> = data => {
        console.log(data);
        changePass(data)
      }
    
      const error: SubmitErrorHandler<NewPassForm> = data => {
        console.log(data);
        
      }
  return (
    <form onSubmit={handleSubmit(submit, error)}>
       
        <div className="inputCEF">
            <span>Код верифіказії з email листа</span>
            <input 
            type="text"
             placeholder="" 
             {...register('code', {required: "Введіть код з листа на пошті"})}
             />
               <div className='errorInputCEF'>{errors?.code && (<p>*{errors?.code?.message}</p>) }</div>
        </div>
        <div className="inputCEF">
            <span>Новий пароль</span>
            <input
             type="password"
             placeholder=""
             {...register('password', 
                        {
                          required: "Введіть пароль"
                        }
                      )}
              />
              <div className='errorInputCEF'>{errors?.password && (<p>*{errors?.password?.message}</p>) }</div>
        </div>
        <div className="inputCEF">
            <span>Підтвердити новий пароль</span>
            <input 
            type="password" 
            placeholder=""
            {...register("confirmPassword", {
                required: "Введіть пароль аккаунту",
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return "Ваші паролі не співпадають";
                  }
                },
               })}
             />
            <div className='errorInputCEF'>{errors?.confirmPassword && (<p>*{errors?.confirmPassword?.message}</p>) }</div>
        {/* <p className="error_message">* Your password must contain at least 1 upper case, 1 lower case, numeric, and special character</p> */}
        </div>
        
            <button type='submit' className="blackBtn">змінити пароль</button> 
            
    </form> 
  )
}
export default RecoveryForm