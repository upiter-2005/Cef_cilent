import React, { useEffect, useRef, useState } from "react";

import axios from 'axios'
import moment from "moment";
import {useSelector} from 'react-redux'
import {selectUser} from '../../redux/slices/userSlice'
import { useAppDispatch } from '../../redux/store'
import styles from "./AccordionHistory.module.scss";

import close from "../../assets/img/close.svg"
import product from "../../assets/img/p1.png"

// @ts-ignore
const AccordionHistory: React.FC = () => {
  const [active, setActive] = useState<boolean>(true);
  const [orders, setOrders] = useState<[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  const {id} = useSelector(selectUser)


  const getOrders = async() => {

    await axios.get('http://localhost:5000/api/order/getOrders')
    .then((res) => {
      const tempArr = res.data.filter((el:any) => el.customer_id === id);
      setOrders(tempArr)
    }).catch(
      (err) => console.log(err)
    )
      
    
  }
  useEffect(() => {
    getOrders()
  }, []);
  useEffect(() => {
  
  }, [height]);

  function toggleAccordion() {
    setActive(!active);
    setHeight(!active ? "0px" : `${contentRef.current?.scrollHeight}px`);
  }
 
  console.log(orders);
  return (
    
    {orders} ? 
    ( orders.map( (el:any, i) => (
      <div className={styles.accordion__section} key={i}>
      <div
        className={!active ? 
        `${styles.active} ${styles.accordion} ` 
            : 
        `${styles.accordion} `}
        onClick={toggleAccordion}>

          <span>#{el.id}</span>
          <span>{el.status}</span>
          <span>{moment(el.date_created).format("DD/MM/YYYY")}</span>
          <span>{el.total} грн</span>



        <span style={{ marginLeft: "20px" }} className={styles.carret}>
        {active ? (
            <img
              src={close}
              className={`${styles.accordion__icon} ${styles.rotate}`}
              alt="FAQ - close icon"
              title="FAQ - close icon"
            />
          ) : (
            <img src={close} className={`${styles.accordion__icon}`} 
              alt="FAQ - open icon"
              title="FAQ - open icon" 
            />
          )}
        </span>
      </div>
      <div ref={contentRef} style={{ maxHeight: `${height}` }} className={styles.accordion__content}>
        <div className={styles.accordion__text} >
          <div className={styles.products}>


          {el.line_items && (el.line_items.map((item:any) => (
            <div className={styles.product_Item}>
              <img src={item.image.src} alt="" />
              <div className={styles.product_Item_second}>
                <p>{item.name}</p>
                  {/* <div className={styles.product_Item_data}>
                    <span>Об’єм:</span>
                    <span>100 мл</span>
                  </div> */}
                  <div className={styles.product_Item_data}>
                    <span>Кількість:</span>
                    <span>{item.quantity}шт</span>
                  </div>
                  <div className={styles.product_Item_data}>
                    <span>Артикул:</span>
                    <span>{item.sku}</span>
                  </div>
              </div>
              <div className={styles.product_Item_third}>
                
                  <div className={styles.product_Item_data}>
                    <span className={styles.product_Item_price}>{item.total} uah</span>
                  </div>
              </div>
            </div>
          ))) }
            




            <div className={styles.result}>
                {/* <div>
                  <span>Підсумок</span>
                  <span>{el.total} грн</span>
                </div> */}
                {/* <div>
                  <span>Доставка</span>
                  <span>60грн</span>
                </div> */}
                <div>
                  <span className={styles.span400}>Загалом</span>
                  <span className={styles.span500}>{el.total} грн</span>
                </div>
            </div>
            

          </div>

        </div>
      </div>
    </div>
    ))
     

    )
    :
    <p>no orders</p>
    
  );
}

export default AccordionHistory;
