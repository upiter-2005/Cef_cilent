import React from 'react'

import classes from "./OrderHistory.module.scss"

import {AccordionHistory} from '../../Components'

const OrderHistory:React.FC = () => {
  return (
    <div className={classes.orderHistory}>
      <p className={classes.orderHistory_title}>історія замовленнь</p>
      <div className={classes.orderHistory_flex}>
          <span>№ Замовлення</span>
          <span>Статус</span>
          <span>Дата</span>
          <span>Всього</span>
      </div>
      <AccordionHistory  />
    </div>
  )
}
export default OrderHistory
