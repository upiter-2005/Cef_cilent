import React, {useEffect, useState} from 'react'
import classes from './FilterButton.module.scss'
import { useSelector } from 'react-redux'
import {setActiveCategory, selectProducts} from '../../redux/slices/productsSlice'
import { useAppDispatch } from '../../redux/store'

import { useParams } from 'react-router-dom'

type FilterButtonProps = {
    name: string,
    slug: string,
    catId: number,
    changeCat: (id:number) => void
    
}
const FilterButton: React.FC<FilterButtonProps> = ({name, slug, catId, changeCat}) => {

    const dispatch = useAppDispatch()

    const {activeCategory} = useSelector(selectProducts)
   
const changeCatHandler = () =>{
    changeCat(catId)
    dispatch(setActiveCategory(slug))
}
  return (
    <button onClick={()=>changeCatHandler()} className={activeCategory !== slug ? `${classes.filterBtn}` : `${classes.filterBtn} ${classes.activeFilter}`} >
      {name}
    </button>
  )
}
export default FilterButton