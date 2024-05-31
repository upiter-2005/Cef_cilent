import React from 'react'
import classes from './Breadcrumbs.module.scss'
import { Link } from 'react-router-dom'

type BreadcrumbsProps = {
  first_link: string,
  first_link_name?: string,
  second_link_name?: string,
  isWhite?: boolean
}
const Breadcrumbs:React.FC<BreadcrumbsProps> = ({first_link, first_link_name, second_link_name, isWhite}) => {
  return (
    <div className={isWhite ? `${classes.breadcrumbs} ${classes.breadcrumbsWhite}` : `${classes.breadcrumbs}` }>
      
      {second_link_name ? 
      (<>
        <Link to="/">Головна</Link>
        <Link to={first_link}>{first_link_name}</Link>
        <span>{second_link_name}</span>
      </>) 
      :
       (<>
          <Link to="/">Головна</Link>
          <span >{first_link_name}</span>
       </>)}
      
    </div>
  )
}
export default Breadcrumbs;
