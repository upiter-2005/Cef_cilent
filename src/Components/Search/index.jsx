import {useEffect, useState} from 'react'
import classes from "./Search.module.scss"
import {selectProducts, fetchProducts} from "../../redux/slices/productsSlice"
import {useSelector} from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import {Link} from 'react-router-dom'


import closeIco from '../../assets/img/closeModal.svg'


 
export default function Search ({active, closeModal}) {
  const dispatch = useAppDispatch()
  const {items} = useSelector(selectProducts)
  const [query, setQuery] = useState('')
  const [queryProducts, setQueryProducts] = useState([])

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

useEffect(() => {
  if (items.length < 1) {
    dispatch(fetchProducts())
  }
}, [items, dispatch]);

const searchProducts = (q) => {
  setQuery(q);
  if(items && q.length>2){
    
    const filtered = items.filter(el => el.name.toLowerCase().includes(q.toLowerCase())) 
    console.log(filtered);
    setQueryProducts(filtered);
  }
  
}

  return (
    <div className={ active ? `${classes.modal}  ${classes.active}` :`${classes.modal}` } onClick={closeModal}>
      <div className={classes.modal__content} onClick={(e)=> e.stopPropagation()}>
     
        <img src={closeIco} className={classes.closeModal} onClick={closeModal} 
          alt="CEF LAB - close icon"
          title="CEF LAB - close icon"  
         />

      <div className={classes.product_wrapper}>
        <div className={classes.right}>
            <h3>Пошук товару</h3>
            <input type="text" placeholder='Пошук...' className={classes.inputSearch} value={query} onChange={(e) => searchProducts(e.target.value)} />
            {queryProducts && ( <div className={classes.search_results}>
                
                {  queryProducts?.map((el, i) => <Link to={`/product/${el.slug}`} key={i} className={classes.searchItem} onClick={closeModal}>{el.name}</Link>)}
              </div>)}
             
        </div>
      </div>
     

    
        
        
      </div>
    </div>
  )
}
