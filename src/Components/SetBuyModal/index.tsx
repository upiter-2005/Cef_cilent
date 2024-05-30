import {useEffect, useState} from 'react'
import classes from "./SetBuyModal.module.scss"

import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import closeIco from '../../assets/img/closeModal.svg'


interface StepForm  {
  name: string;
  phone: string;
}

type QuickViewModalProps = {
  active: boolean,
  closeModal: () => void,
  title: string,
  steps: any
}
 const SetBuyModal:React.FC<QuickViewModalProps> = ({active, closeModal, title, steps}) => {

  const {register, handleSubmit, formState: {errors}} = useForm<StepForm>({})
  



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

const submit: SubmitHandler<StepForm> = data => {
  console.log(data);
  
}
const error: SubmitErrorHandler<StepForm> = data => {
  console.log(data);
}

  return (
    <div className={ active ? `${classes.modal}  ${classes.active}` :`${classes.modal}` } onClick={closeModal}>
      <div className={classes.modal__content} onClick={(e)=> e.stopPropagation()}>
     
        <img src={closeIco} className={classes.closeModal} onClick={closeModal} 
          alt="Sicvolo - close icon"
          title="Sicvolo - close icon"  
         />


      <div className={classes.stepOrder_wrapper}>
          <h3 className={classes.stepOrder_title}>Оформити заявку</h3>
          <p>Вкажіть свій номер телефону і наш менеджер зв`яжеться з вами в найближчий робочий час</p>

          <form onSubmit={handleSubmit(submit, error)}>
          <div className={classes.form_row}>
                         <div className="inputCEFBlack">
                             <span>Ваше ім'я</span>
                             <input type="text"
                                 placeholder='Ваше ім’я'
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
                             <input type="tel"
                              placeholder='Номер телефону'
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
          </form>

      </div>
     

    
        
        
      </div>
    </div>
  )
}
export default SetBuyModal;