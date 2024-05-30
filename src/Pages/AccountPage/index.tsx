import React, {useState, useEffect} from 'react'

import classes from './AccountPage.module.scss'
import {useSelector} from "react-redux"

import { selectUser } from '../../redux/slices/userSlice'
import { Breadcrumbs, EditProfile, OrderHistory, ExitModal } from '../../Components'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

const AccountPage:React.FC = () => {
    const {isAuth, token} = useSelector(selectUser)
    const [activeTab, setActiveTab] = useState<string>('profile')
    const [isAuthUser, setIsAuthUser] = useState<boolean>(false)
    const[activeBeltModal, setActiveBeltModal] = useState(false)

    useEffect(()=>{
        console.log(token);
        console.log(isAuth);
        if(token){
            setIsAuthUser(true)
        }else{
            setIsAuthUser(false)
        }
        console.log("isAuth " + isAuth);
    }, [token])

    return (
        <>
        <Helmet>
          <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
            <title>CEF LAB - Обліковий кабінет</title> 
            <meta name="description" content="CEF LAB - Обліковий кабінет" />
            <meta property="og:title" content="CEF LAB - Обліковий кабінет" data-react-helmet="true" />
            {/* <meta property="og:image" content={catImg} /> */}
            <meta property="og:description" content="CEF LAB - Обліковий кабінет" />
        </Helmet>
        <div className="container">
        <Breadcrumbs first_link='/' first_link_name='Акаунт' />
        {!isAuthUser && <Link to='/login' className="blackBtn">Увійти</Link>}
        {isAuthUser && ( 
            <div className={classes.account__wrapper}>
            <div className={classes.left}>
                <h1>Привіт {localStorage.getItem( 'user_nicename' )}!</h1>

                <div className={classes.account__nav}> 
                    <button className={activeTab === 'profile' ? `${classes.navLink} ${classes.navLinkActive}` : `${classes.navLink}` } onClick={()=>setActiveTab('profile')}>профіль</button>
                    <button className={activeTab === 'orders' ? `${classes.navLink} ${classes.navLinkActive}` : `${classes.navLink}` } onClick={()=>setActiveTab('orders')}>замовлення</button>
                    <button className={classes.navLink} onClick={()=>setActiveBeltModal(true)}>вихід</button>
                </div>
            </div>
            <div className={classes.right}>
                {activeTab === 'profile' && <EditProfile />}
                {activeTab === 'orders' && <OrderHistory />}
                {activeTab === 'edit' && <h2>Edit</h2>}
            </div>
            </div>
        )}
           

        </div>
        <ExitModal active={activeBeltModal} closeModal={()=>{setActiveBeltModal(false)}} />
        
        </>
        
      )

    

}
export default AccountPage;