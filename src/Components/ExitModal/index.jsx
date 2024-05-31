import {useEffect} from 'react'
import classes from "./ExitModal.module.scss"

import closeIco from '../../assets/img/closeModal.svg'
import pr1 from '../../assets/img/p1.png'
import arrow from '../../assets/img/arr_right.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store'
import {logout} from '../../redux/slices/userSlice'
import { toast } from 'react-toastify';
 
export default function ExitModal ({active, closeModal}) {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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

const exit = () => {
  dispatch(logout())
  navigate('/login')
  toast.info("Ви вийшли з облікового кабінету!");
}
  return (
    <div className={ active ? `${classes.modal}  ${classes.active}` :`${classes.modal}` } onClick={closeModal}>
      <div className={classes.modal__content} onClick={(e)=> e.stopPropagation()}>
     
        <img src={closeIco} className={classes.closeModal} onClick={closeModal} 
          alt="cef - close icon"
          title="cef - close icon"  
         />


      <div className={classes.product_wrapper}>
        <div className={classes.right}>
            <h1>вихід</h1>
            <p className={classes.text}>Ви впевнені що хочете вийти?</p>

            <div className={classes.exit}>
              <button className="inverseBtn " onClick={closeModal}>скасувати</button>
              <button className="blackBtn " onClick={exit}>вийти</button>
            </div>
            
            
        </div>
      </div>
     

    
        
        
      </div>
    </div>
  )
}
