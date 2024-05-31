import React, {useState, useEffect} from 'react'
import classes from './ProductCard.module.scss'

import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import {QuickViewModal} from '../../Components'
import {openQuick, closeQuick, setQcard} from '../../redux/slices/userSlice'


type metaProps = {
  id: number,
  key: string,
  value: string,
}

type ProductCardProps = {
    id: number,
    sku: string,
    slug: string,
    name: string,
    img: string,
    description: string,
    meta: metaProps[],
    price: number,
    type?: string,
    topQuick: boolean
}


const ProductCard:React.FC<ProductCardProps> = ({id, sku, slug, name, img, description, meta, price, type, topQuick}) => {

  const[activeBeltModal, setActiveBeltModal] = useState<boolean>(false)
  const[ml, setMl] = useState<string>('')
  const[short, setShort] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const ml_value:any = meta?.find(obj => obj.key === 'obm')
    const short_value:any = meta?.find(obj => obj.key === 'osnovni_ingridinti')
    const product_type:any = meta?.find(obj => obj.key === 'tip_tovaru')
   
    setMl(ml_value?.value)
    setShort(short_value?.value)
  
  }, [])

  const callTopQuick = () =>{
    dispatch(setQcard({
      id,
      sku,
      slug,
      name,
      img,
      description,
      ml,
      price
      }))
      dispatch(openQuick())
  }
  

  return (
    <>
    <div className={classes.productCard}>
        <div className={classes.productCard_Img}>
            <img src={img} alt="" />
        </div>
        <Link to={`/product/${slug}`} className={classes.productCard_name}>{name}</Link>
        <div className={classes.productCard_description}>{short}</div>
        <div className={classes.productCard_ml}>{ml} ml</div>
      
        {(type !== 'profesijni-nabori' && type !== 'bazovi-preparati') ? (<div className={classes.productCard_price}>{price} uah</div>) : ''}

        <Link to={`/product/${slug}`} className="blackBtn addToCart">замовити</Link>
        {type !== 'profesijni-nabori' &&  <button className={classes.whiteBtn} onClick={()=>{topQuick ? callTopQuick() : setActiveBeltModal(true)}}>швидкий перегляд</button>}
       
    </div>

    
    <QuickViewModal active={activeBeltModal} closeModal={()=>{setActiveBeltModal(false)}} product={{id, sku, slug, name, img, description, ml, price}} />
    </>
    
  )
}
export default ProductCard; 
