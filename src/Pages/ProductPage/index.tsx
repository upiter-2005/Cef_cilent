import React, {useState, useEffect} from 'react'
import classes from './Product.module.scss'
import {useParams} from 'react-router-dom'

import { Breadcrumbs, ProductTabs, FilterComponent, ProductGalleryMobile, ProductsCarousel, ProductGallery, DinamicAttachment, TopQuickViewModal, SetBuyModal } from '../../Components'
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { selectProducts } from '../../redux/slices/productsSlice'
import { addToCard, minusItem, selectCartItemById } from '../../redux/slices/cartSlice'
import {fetchProducts} from '../../redux/slices/productsSlice'


import {closeQuick, selectUser} from '../../redux/slices/userSlice'


import {allCategories} from '../../util/categories'
import label_set from '../../assets/img/label_set.png'
import label_acz from '../../assets/img/label_acz.png'
 //type StepType = {id?: number, key?: string, value?: string}

 type NewStepType = {
    img: string,
    title: string,
    text_1: string,
    text_2: string,
    obm: string,
    artikul: string
     
}

const Product:React. FC = () => {
    const [isSetOpen, setIsSetOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<any>({});
    const [qty, setQty] = useState<number>(1)
    const [cartImg, setCartImg] = useState<string>('')
    const [breadcrumbCat, setBreadcrumbCat] = useState<string>('')
    const [breadcrumbCatLink, setBreadcrumbCatLink] = useState<string>('')

    const [steps, setSteps] = useState<NewStepType[]>([])

    const [productId, setProductId] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [images, setImages] = useState()
    const [topDesriotion, setTopDesriotion] = useState<string>('')
    const [cat, setCat] = useState<string>('')
    const [tipCat, setTipCat] = useState<string>('')
    const [form, setForm] = useState<string>('')
    const [ingridienty, setIngridienty] = useState<string>('')
    const [obm, setObm] = useState<string>('')
    const [sku, setSku] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [productType, setProductType] = useState<string>('')

    const [opys, setOpys] = useState<string>('')
    const [sposob, setSposob] = useState<string>('')
    const [activeIngridient, setActiveIngridient] = useState<string>('')

    const [result, setResult] = useState<string>('')
    const [protokol, setProtokol] = useState<string>('')
    const [contentImg, setContentImg] = useState<string>('')
    
    const[relative, setRealtive] = useState<number[]>([])

    
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const {items} = useSelector(selectProducts)
    const {isOpenQuick} = useSelector(selectUser)
     const countItem = useSelector(selectCartItemById(Number(productId)))
  
    const addToCart = () => {
        if(productType === 'set'){
            setIsSetOpen(true);
            return false;
        }
        dispatch(addToCard({
            id: productId,
            title: name,
            img: cartImg,
            capacity: obm,
            sku,
            price: Number(price),
            count: qty
        }))
       // toast.info("Товар доданий у кошик!");
    }
    const plusQty = () => {
        setQty(qty + 1)
    }
    const minusQty = () => {
        if(qty === 1){  return false; }
        setQty(qty - 1) 
    }

    const findCategoryFormBreadcrumb = (product: any) => {
        if(product){
            let catId: number = product.categories[0].id
            const catObj = allCategories.find((el: any) => el.id === catId)
            if(catObj){
                let n1: string = catObj.name ;
                let n2: string = catObj.slug ;
                setBreadcrumbCat(n1)
                setBreadcrumbCatLink(n2)
            }
        }
       
    }

    const settingProduct = (el: any) =>{
        console.log(countItem);
        //setQty(countItem)
        setProductId(el.id);
        setName(el.name);
        setImages(el.images);
        setTopDesriotion(el.description)
        
        const osnovni_ingridinti:any = el.meta_data?.find((obj: any) => obj.key === 'osnovni_ingridinti')
        const kategori:any = el.meta_data?.find((obj: any) => obj.key === 'kategori')
        const tip_shkiri:any = el.meta_data?.find((obj: any) => obj.key === 'tip_shkiri')
        const forma_vipuku:any = el.meta_data?.find((obj: any) => obj.key === 'forma_vipuku')

        const ml_value:any = el.meta_data?.find((obj: any) => obj.key === 'obm')
        setIngridienty(osnovni_ingridinti?.value)
        setCat(kategori?.value)
        setTipCat(tip_shkiri?.value)
        setForm(forma_vipuku?.value)
        setObm(ml_value?.value)

        setSku(el.sku)
        setPrice(el.price)

        const tip_tovaru:any = el.meta_data?.find((obj: any) => obj.key === 'tip_tovaru')
        const opis:any = el.meta_data?.find((obj: any) => obj.key === 'opis')
        const sposib_zastosuvannya:any = el.meta_data?.find((obj: any) => obj.key === 'sposib_zastosuvannya')
        const aktivni_ingredinti:any = el.meta_data?.find((obj: any) => obj.key === 'aktivni_ingredinti')
        const rezultat_dlya_setiv:any = el.meta_data?.find((obj: any) => obj.key === 'rezultat_dlya_setiv')
        const protokol_proczeduri:any = el.meta_data?.find((obj: any) => obj.key === 'protokol_proczeduri')
        const kontent_zobrazhennya:any = el.meta_data?.find((obj: any) => obj.key === 'kontent_zobrazhennya')

        setContentImg(kontent_zobrazhennya?.value)
        setProductType(tip_tovaru?.value)
        setOpys(opis?.value)
        setSposob(sposib_zastosuvannya?.value)
        setActiveIngridient(aktivni_ingredinti?.value)
        setResult(rezultat_dlya_setiv?.value)
        setProtokol(protokol_proczeduri?.value)
        setCartImg(el.images[0].src);
        setRealtive(el.upsell_ids);
        findCategoryFormBreadcrumb(el)  
        findSteps(el)
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
        if(items.length > 0 ){
            const found_result = items?.find((el: any, i) => el.slug === id)
            if(found_result) {
                settingProduct(found_result)
                setProduct(found_result)
            }       
        } else{
            dispatch(fetchProducts());
        }
    },[items, id, dispatch])

    useEffect(()=>{
        const count = countItem ? countItem.count : 1
        setQty(count);
       
    },[countItem])

   const findSteps = async(el: any) =>{
    
    [...new Array(10)].forEach((item, i) => {
        const image:any = el?.meta_data?.find((obj: any) => obj.key === `kroki_${i}_image`)
        if(image){
            const title:any = el?.meta_data?.find((obj: any) => obj.key === `kroki_${i}_title`)
            const text1:any = el?.meta_data?.find((obj: any) => obj.key === `kroki_${i}_text_1`)
            const text2:any = el?.meta_data?.find((obj: any) => obj.key === `kroki_${i}_text_2`)
            const obm:any = el?.meta_data?.find((obj: any) => obj.key === `kroki_${i}_obm`)
            const artikul:any = el?.meta_data?.find((obj: any) => obj.key === `kroki_${i}_artikul`)
    
            const newStep: NewStepType = {
               img:  image.value,
               title: title.value,
               text_1: text1.value,
               text_2: text2.value,
               obm: obm.value,
               artikul: artikul.value 
            }
            setSteps(prevSteps => [...prevSteps, newStep]);
        }
    })
   }
      
        useEffect(()=>{
            console.log(steps);
        },[steps])
   console.log(product);
  return (
    <>
     <Helmet> 
            <link rel="canonical" href={`sicvolo.com${window.location.pathname}`} />
            <title>{`${product?.yoast_head_json?.title} `}</title>
            <meta name='description' content={product?.yoast_head_json?.og_description} />
        </Helmet>
    <div className="container">
      
      <div className={classes.product_wrapper}>
      <Breadcrumbs 
            first_link={`/category/${breadcrumbCatLink}`} 
            first_link_name={breadcrumbCat}
            second_link_name={name} 
        />
      
        <div className={classes.left}>
            <p className={classes.mob_title}>{name}</p>
            <div className={classes.gallery_mob}> 
                {productType === 'set' && (<img src={label_set} alt="" className={classes.label} />)}
                
                {images && <ProductGalleryMobile productImgs={images} />}
            </div>
            <div className={classes.gallery_desktop}>
                {productType === 'set' && (<img src={label_set} alt="" className={classes.label} />)}
                {/* <img src={label_acz} alt="" className={classes.label} /> */}
                {images && <ProductGallery productImgs={images} />}
            </div>
            
        </div>
        <div className={classes.right}>
            <h1>{name}</h1>
            <div className={classes.product_description} dangerouslySetInnerHTML={{ __html: topDesriotion }} />

            <div className={classes.product_props}>
                <div className={classes.product_props_Item}>
                    <span>Категорії:</span>
                    <span>{cat}</span>
                </div>
                <div className={classes.product_props_Item}>
                    <span>Тип шкіри:</span>
                    <span>{tipCat}</span>
                </div>
                <div className={classes.product_props_Item}>
                    <span>Форма випуску:</span>
                    <span>{form}</span>
                </div>
                <div className={classes.product_props_Item}>
                    <span>Основні інгрідієнти:</span>
                    <span>{ingridienty}</span>
                </div> 
            </div>
            <div className={classes.sku_capacity}>
                <div className={classes.sku_capacity_Item}>
                    <span>Об‘єм:</span>
                    <span>{obm} мл.</span>
                </div>
                <div className={classes.sku_capacity_Item}>
                    <span>Артикул:</span>
                    <span>{sku}</span>
                </div>
            </div>
            

    {productType === 'set' ? (
        <div className={classes.steps_product_wrap}>
            <span className={classes.consist}>Містить {steps.length} продукти:</span>
            <div>
                {steps && steps.map((el,i) => (
                <div className={classes.steps_product} key={`steps${i}`}>
                    
                    <div className={classes.steps_Item__data}>
                        <p className={classes.steps_Item__title}>КРОК {i + 1}. {el.title.substring(0, 10)}, {el.obm} мл <div className={classes.art}><span>Артикул:</span> {el.artikul}</div></p>
                    </div>
                </div>
            ) )}
            </div>
        
    </div>

    ) : (
        <div className={classes.product_price}>{price} ₴</div>
  )}

            <div className={classes.product_action_block}>
                <div className="qtyBox">
                    <button onClick={() => minusQty()}>--</button>
                    <span>{qty}</span>
                    <button onClick={() => plusQty()}>+</button>
                </div>
                <button className="blackBtn " onClick={addToCart}>замовити</button>
            </div>

            <div className={classes.product_infoMessage}>
                Як дізнатись ціну на товар? <br />
                Переглядати ціни та здійснювати покупки препартів професійного догляду можуть лише косметологи
            </div>
            
        </div>
      </div>
    </div>

    <ProductTabs 
        type={productType} 
        opis={opys}
        sposib_zastosuvannya={sposob}
        aktivni_ingredinti={activeIngridient}
        rezultat_dlya_setiv={result}
        protokol_proczeduri={protokol}
        content_image={contentImg}
     />
    {/* <FilterComponent /> */}

    {productType === 'set' && (
        <div className={classes.steps}>
        
           
        <div className="container">
            <h2>детальний огляд препартів що входять в набір:</h2>
        </div>

        {steps && steps.map((el,i) => (

            <div className={classes.steps_Item} key={`steps${i}`}>
                
            <div className={classes.steps_Item_container}>
                <DinamicAttachment imgId={el.img} />
                <div className={classes.steps_Item__data}>
                    <p className={classes.steps_Item__title}>КРОК {i + 1}. <br /> {el.title}</p>
                    <div className={classes.steps_Item__descr}>{el.text_1}</div>
                    <div className={classes.steps_Item__descr}>{el.text_2}</div>
                    <div className={classes.steps_props}>
                        <div className={classes.steps_props_Item}>
                            <span>Об‘єм:</span>
                            <span>{el.obm} мл</span>
                        </div>
                        <div className={classes.steps_props_Item}>
                            <span>Артикул:</span>
                            <span>{el.artikul}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
        ) )}
    </div>

    )}
    

    <div className="container">
        
        <h2 className={classes.relative_title}>Що ми рекомендуємо з цим...</h2>
        {relative && <ProductsCarousel itemsRelative={relative}/>}
        
        </div>

        {console.log(isOpenQuick)}
        <TopQuickViewModal active={isOpenQuick} closeModal={()=>{dispatch(closeQuick())}} />
        <SetBuyModal active={isSetOpen} closeModal={()=>{setIsSetOpen(false)}} title="test" steps={steps} />
    </>
    
  )
}


export default Product