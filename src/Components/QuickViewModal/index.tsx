import {useEffect, useState} from 'react'
import classes from "./QuickViewModal.module.scss"

import closeIco from '../../assets/img/closeModal.svg'
import pr1 from '../../assets/img/p1.png'
import arrow from '../../assets/img/arr_right.svg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { addToCard, minusItem, selectCartItemById } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify';

type Product = {
  id: number,
  sku: string,
  slug: string,
  name: string,
  img: string,
  description: string,
  ml: string,
  price?: number,
 
}

type QuickViewModalProps = {
  active: boolean,
  closeModal: () => void,
  product: Product
}
 const QuickViewModal:React.FC<QuickViewModalProps> = ({active, closeModal, product}) => {
  const dispatch = useAppDispatch()
  const [qty, setQty] = useState<number>(1)
  
  const countItem = useSelector(selectCartItemById(Number(product.id)))
  const addToCart = () => {
    dispatch(addToCard({
        id: product.id,
        title: product.name,
        img: product.img,
        capacity: product.ml,
        sku: product.sku,
        price: Number(product.price),
        count: qty,
   
    }))
    //toast.info("Товар доданий у кошик!");
}
const plusQty = () => {
    setQty(qty + 1)
}
const minusQty = () => {
    if(qty === 1){  return false; }
    setQty(qty - 1) 
}


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
useEffect(()=>{
  const count = countItem ? countItem.count : 1
  setQty(count);
 
},[countItem])

console.log(product);
  return (
    <div className={ active ? `${classes.modal}  ${classes.active}` :`${classes.modal}` } onClick={closeModal}>
      <div className={classes.modal__content} onClick={(e)=> e.stopPropagation()}>
     
        <img src={closeIco} className={classes.closeModal} onClick={closeModal} 
          alt="Sicvolo - close icon"
          title="Sicvolo - close icon"  
         />


      <div className={classes.product_wrapper}>
        
        <div className={classes.left}>
            <img src={product.img} alt="" />
            
        </div>
        <div className={classes.right}>
            <h1>{product.name}</h1>
            <div className={classes.product_description} dangerouslySetInnerHTML={{ __html: product.description }} />

            
            <div className={classes.sku_capacity}>
                <div className={classes.sku_capacity_Item}>
                    <span>Об‘єм:</span>
                    <span>{product.ml} мл.</span>
                </div>
                <div className={classes.sku_capacity_Item}>
                    <span>Артикул:</span>
                    <span>{product.sku}</span>
                </div>
            </div>
            <div className={classes.product_price}>{product.price} ₴</div>

            <div className={classes.product_action_block}>
                <div className="qtyBox">
                  <button onClick={() => minusQty()}>--</button>
                    <span>{qty}</span>
                    <button onClick={() => plusQty()}>+</button>
                </div>
                <button className="blackBtn" onClick={addToCart}>замовити</button>
            </div>

            <div className={classes.product_infoMessage}>
                Як дізнатись ціну на товар? <br />
                Переглядати ціни та здійснювати покупки препартів професійного догляду можуть лише косметологи
            </div>
            
            <div className={classes.quick_link}>
                <Link to={`/product/${product.slug}`}> Переглянути товар <img src={arrow} alt="" /> </Link>
            </div>
            
        </div>
      </div>
     

    
        
        
      </div>
    </div>
  )
}
export default QuickViewModal;