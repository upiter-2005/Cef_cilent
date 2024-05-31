import {useEffect, useState, useRef} from 'react'
import classes from "./SetBuyModal.module.scss"
import '../../assets/css/RadioInputs.scss'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import closeIco from '../../assets/img/closeModal.svg'
import check from '../../assets/img/w-check.svg'

interface StepForm  {
  name: string;
  phone: string;
  product: string;
}
interface ContactForm {
  name: string;
  phone: string;
  product: string;
}
type QuickViewModalProps = {
  active: boolean,
  closeModal: () => void,
  title: string,
  steps: any
}
 const SetBuyModal:React.FC<QuickViewModalProps> = ({active, closeModal, title, steps}) => {
  const checkBocRef = useRef(null)
  const [indicate, setIndicate] = useState<boolean>(true)
  const [stepsArr, setStepsArr] = useState<string[]>([])
  const [isCheck, setIsCheck] = useState<boolean>(true)
  const {register, setValue , handleSubmit, formState: {errors}} = useForm<StepForm>({})
  const navigate =useNavigate()
  

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
  mailSubmit(data)
}
const error: SubmitErrorHandler<StepForm> = data => {
  console.log(data);
}

const checkBoxHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
  if(e.target.checked){
   
    if(e.target.value === title){
      setStepsArr([title])
      setIndicate(false)
    }else{
      setStepsArr([...stepsArr, e.target.value])
      setIndicate(true)
    }
    
    console.log(e.target.value);
  }else{
    console.log('check')
    const fArr = stepsArr.filter(el => el !== e.target.value)
    setStepsArr(fArr)
    setIndicate(true)
  }

}

const mailSubmit = async( data: ContactForm) => {
  const params = {name: data.name, phone: data.phone, product: data.product};
  console.log(params);
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/mail/sendMailPartner`, params);
  
    if(data.status === 200){
      navigate('/thank');
    }
    return data;
  } catch (e:any) {
    console.log(e.message);
  }
}

useEffect(()=>{
    console.log(stepsArr);
    setValue('product', stepsArr.join(), {shouldValidate: true})
}, [stepsArr]);

  return (
    <div className={ active ? `${classes.modal}  ${classes.active}` :`${classes.modal}` } onClick={closeModal}>
      <div className={classes.modal__content} onClick={(e)=> e.stopPropagation()}>
     
        <img src={closeIco} className={classes.closeModal} onClick={closeModal} 
          alt="cef - close icon"
          title="cef - close icon"
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
                             <input type="hidden"
                                {...register('product',
                                    {
                                        required: "Оберіть продукт",
                                      
                                    }
                                )}
                              
                              />
                               <div className='errorInputCEF'>{errors?.phone && (<p>*{errors?.phone?.message}</p>) }</div>
                         </div>

                       
                         
                  </div>

                  <div className="checkbox_Box" >
                        <input type="checkbox" name="step" onChange={(e) => checkBoxHandle(e)} ref={checkBocRef}   value={title} /> 
                        <label htmlFor="stepAll"><span>Набір</span>{title}</label>
                      </div>

                      <p className={classes.info}>Додатково є можливість вибрати кожний КРОК окремо</p>

                  {indicate && steps.map((el:any, i: number) => (
                      <div className="checkbox_Box" key={`step-${i}`}>
                        <input type="checkbox" name="step" onChange={(e) => checkBoxHandle(e)}  id={`step${i}`}  value={el.title} /> 
                        <label htmlFor={`step${i}`}><span>Крок {i +1}</span>{el.title}</label>
                      </div>
                  ))}   

                          <div className={classes.checkbox}>
                                <div className={classes.checkbox__squre} onClick={() => setIsCheck(!isCheck)}>
                                    {isCheck && <img src={check} alt="" />}    
                                </div>
                                Погоджуюсь з обробкою персональних даних
                                <div className='errorInputCEF'>{errors?.product && (<p>*{errors?.product?.message}</p>) }</div>
                            </div>     
                          
                            <button className={classes.black_btn}>оформити замовлення</button>
          </form>

      </div>
     

    
        
        
      </div>
    </div>
  )
}
export default SetBuyModal;