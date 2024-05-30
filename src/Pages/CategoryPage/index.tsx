import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { selectProducts, fetchProducts  } from "../../redux/slices/productsSlice"
import {Helmet} from "react-helmet";
import axios from 'axios'
import classes from "./Category.module.scss"

import catImg from "../../assets/img/cat.jpg"

import { FilterComponent, Breadcrumbs } from '../../Components'
import { allCategories } from '../../util/categories'

const Category: React.FC = () =>  {

  const [products, setProducts] = useState([])
  const [crumbName, setCrumbName] = useState<string>('')
  const [activeCat, setActiveCat] = useState<string>('')
  const [productText, setProductText] = useState<string>('')
  const [catImg, setCatImg] = useState<string>('')
  const [catTitle, setCatTitle] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescr, setSeoDescr] = useState('')
  const dispatch = useAppDispatch()
  const { id } = useParams() as any
  const { items, status } = useSelector(selectProducts)
 
  
  useEffect(() => {
    if (items.length < 1) {
      dispatch(fetchProducts())
    
    } else {
      //const filterResult = items.filter((obj: any) => obj.acf.category[0] === id)
      //setProducts(filterResult);
      setProducts(items);

    }

  }, [items, dispatch]);

  useEffect(() => {
    const result: any = allCategories.find(el=> el.slug === id);
    setCrumbName(result.name)
    getCatApiData(result.id)
  }, [id])

  const pullCategory = (val: string) => {
    console.log(val);
  }

  const getCatApiData = async(idCat:number) => {
    console.log(id);
    try {
        await axios.get(`https://api.apicef.space/wp-json/wp/v2/product_cat/${idCat}`)
        .then((res:any) => {
          setProductText(res.data.description)

          setCatTitle(res.data?.acf?.category_page_title)
          setSeoTitle(res.data?.yoast_head_json?.og_title)
          setSeoDescr(res.data?.yoast_head_json?.og_description)
          if(res.data.acf.category_img){findAttachmentById(res.data?.acf?.category_img)}
      
          console.log(res.data.acf.category_img)
        } )
    } catch (error) {
      console.log('bad connection');
    }
  } 


  const findAttachmentById = async(imgId: string) =>{
    await axios(`https://api.apicef.space/wp-json/wp/v2/media/${imgId}`)
    .then((res: any) => setCatImg(res.data.source_url)) 
}
  //const skeleton = [...new Array(6)].map((item, i) => <Skeleton key={i} />)

  

console.log(seoDescr);
  return (
    <>
    <Helmet>
          <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
            <title>{seoTitle}</title> 
            <meta name="description" content={seoDescr} />
            <meta property="og:title" content={seoTitle} data-react-helmet="true" />
            <meta property="og:image" content={catImg} />
            <meta property="og:description" content={seoDescr} />
        </Helmet>
    <div className={classes.category_page}>
    <Breadcrumbs first_link='/' first_link_name={crumbName} />
      <div className={classes.category_page_top}>
        <div className={classes.left}>
          <span>НЕЩОДАВНО</span>
          <h1>{catTitle}</h1>
          <p className={classes.catDescription} dangerouslySetInnerHTML={{ __html: productText }}></p>
        </div>
        <div className={classes.right}> 
          <img src={catImg} alt="" />
        </div>
      </div>
      <FilterComponent  products={products} isSetType={id} />
    </div>
       
    </>
    
  )
}
export default Category;
