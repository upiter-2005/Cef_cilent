import React from 'react'

import classes from "./NotFound.module.scss"

import {Link} from "react-router-dom"

import img_404 from "../../assets/img/404.jpg"

const NotFound:React.FC = () => {
  return (
    <div className={classes.notFound}>
        <div className={classes.left}>
          <img src={img_404} alt="" />
        </div>
        <div className={classes.right}>
            <h1>404</h1>
            <p>Are you lost? This page is on vacation. Try searching on our homepage instead.</p>
            <Link to='/' className={classes.toMain}>на головну</Link>
        </div>
    </div>
  )
}
export default NotFound;
