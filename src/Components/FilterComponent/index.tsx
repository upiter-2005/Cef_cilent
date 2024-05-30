import React, {useEffect, useState} from 'react'

import classes from './FilterComponent.module.scss'

import {ProductCard, FilterButton} from "../../Components"

import {useParams} from 'react-router-dom'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import {setActiveCategory, selectProducts} from '../../redux/slices/productsSlice'

import { categoriesHome, categoriesProf, allCategories } from '../../util/categories'
import { isSet } from 'util/types';

type ProductItem = {
    id: string,
    title: string,
    img: string,
    price: number,
    ml: string,
    tip_shkiri: string,
    categories: []
}

type FilterComponentProps = {
    products: ProductItem[],
    isSetType: string
}


const FilterComponent:React.FC<FilterComponentProps> = ({products, isSetType}) => {
    console.log(isSetType)
    const dispatch = useAppDispatch()
    const [typeCat, setTypeCat] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([])
    const { id } = useParams() as any

    const findByCategory = (categiriesArr: any, catId: number) => {
        return categiriesArr.some((el: any) => el.id === catId);
    }
console.log(id);

    const createTabPanel = (id: number) => {
        const filtered_cat_items = products?.filter(obj=> findByCategory(obj.categories, id)) ;

        return <> 
               
                <TabPanel key={id}>test{id}
                    <div className="tabContent">
                        <div className={classes.filter_cat_descr}>Іноваційна антивікова процедура на основі високоефективних рослинних компонентів та біоміметичного ендорфінового пептиду з ботоксоподобною дією проти зморшок. Стимулює фактори росту і покращує текстуру шкіри.</div>
                    </div>   
                    <div className={classes.filter_cat_box}>
                    {filtered_cat_items?.map((el:any, i) =>  
                            <ProductCard 
                                id={el.id}
                                key={i}
                                sku={el.sku}
                                slug={el.slug}
                                name={el.name}
                                img={el.images[0].src}
                                description={el.description}
                                meta={el.meta_data}
                                price={el.price} 
                                type={isSetType}
                                topQuick={false}
                            />
                            )}
                    </div>        
                </TabPanel>
            </>
    }

    const createSetList = (id: number) => {
        const filtered_cat_items = products?.filter(obj=> findByCategory(obj.categories, 18)) ;
        console.log(filtered_cat_items);

        return <> 
            {filtered_cat_items?.map((el:any, i) =>  
                <ProductCard 
                    id={el.id}
                    key={i}
                    sku={el.sku}
                    slug={el.slug}
                    name={el.name}
                    img={el.images[0].src}
                    description={el.description}
                    meta={el.meta_data}
                    price={el.price} 
                    type={isSetType}
                    topQuick={false}
                />
            )}
        </>
    }

    useEffect(()=>{
        const result: any = allCategories.find(el=> el.slug === id)
        setTypeCat(result.type)
        const filtered_cat_items = products?.filter(obj=> findByCategory(obj.categories, result.id)) 
        console.log(filtered_cat_items)
        setFilteredProducts(filtered_cat_items)
        dispatch(setActiveCategory(result.slug))
    }, [products, id])


    const filterProduct = (catId: number) => {
        const filtered_cat_items = products?.filter(obj=> findByCategory(obj.categories, catId)) 
        setFilteredProducts(filtered_cat_items)
    }

  return (
    <div className="container">
        <div className={classes.filter_wrap}>
        {isSetType === 'profesijni-nabori' && (
        <div className={classes.filter_cat_box}>
           {createSetList(id)}
            
            </div>   
        ) }
        {isSetType !== 'profesijni-nabori' && (
            <>
                {typeCat === 'home' &&  (<p className={classes.filter_title}> <span>КОЛЕКЦІя</span> ЛІНІЙ ДОМАШНЬОГО ДОГЛЯДУ </p>)}
                {typeCat === 'profi' &&  (<p className={classes.filter_title}> <span>Базові препарати</span> ЛІНІЙ професійного ДОГЛЯДУ </p>)}

                <div className={classes.filterBtnBox}>
                    {typeCat === 'home'  && (categoriesHome.map((el, i) => <FilterButton key={i} changeCat={()=>filterProduct(el.id)} catId={el.id} name={el.name} slug={el.slug} /> ))}
                    {typeCat === 'profi' && (categoriesProf.map((el, i) => <FilterButton key={i} changeCat={()=>filterProduct(el.id)} catId={el.id} name={el.name} slug={el.slug} /> ))}
                    
                </div>

                <div className={classes.filter_cat_box}>
                    {filteredProducts?.map((el:any, i) =>  
                            <ProductCard 
                                
                                key={i}
                                id={el.id}
                                sku={el.sku}
                                slug={el.slug}
                                name={el.name}
                                img={el.images[0].src}
                                description={el.description}
                                meta={el.meta_data}
                                price={el.price} 
                                type={isSetType}
                                topQuick={false}
                            />
                            )}
                    </div> 
                
            </>
        
        ) }
            
        </div>
    </div>
  )
}
export default FilterComponent
