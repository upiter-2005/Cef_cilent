import React,{useState} from 'react'

import classes from "./Header.module.scss"
import {Search,CartModal} from "../../Components";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {selectCart} from '../../redux/slices/cartSlice'


import prof1 from '../../assets/img/prof1.jpg'
import prof2 from '../../assets/img/prof2.jpg'
import prof3 from '../../assets/img/prof3.jpg'
import dom1 from '../../assets/img/dom1.jpg'
import dom2 from '../../assets/img/dom2.jpg'
import dom3 from '../../assets/img/dom3.jpg'
import dom4 from '../../assets/img/dom4.jpg'
import mobBut from '../../assets/img/mobMnu.svg'
import close from '../../assets/img/closeModal.svg'

import search from '../../assets/img/search.svg'

import cart from '../../assets/img/cart.svg'


import logo from '../../assets/img/logo.svg'

const Header: React.FC = () => {

    const [clicked, setClicked] = useState<boolean>(false)
    const[activeBeltModal, setActiveBeltModal] = useState<boolean>(false)
    const [isMobileActive, setIsMobileActive] = useState<boolean>(false)
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const {items} = useSelector(selectCart)

    return (
        <>
        <header className={classes.header}>
            <button className={classes.mobMnu} onClick={()=> setIsMobileActive(true)}>
                <span></span>
                <span></span>    
            </button>
            <Link to="/" className={classes.logo}><img src={logo}  alt="" /></Link>

            <nav>
                <ul>
                    <li className={classes.parent_mnu}>
                        <a href="#">професійний догляд</a>
                        <div className={classes.child_mnu}>
                            <div className={classes.child_mnu_wrapper}>
                                <div className={classes.child_mnu_Item}>
                                    <img src={prof1} alt="" />
                                    <a href="/category/profesijni-nabori">ПРОФЕСІЙНІ НАБОРИ</a>
                                    <p>Готові набори для проведення професійних процедур</p>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <img src={prof2} alt="" />
                                    <a href="/category/bazovi-preparati">БАЗОВІ ПРЕПАРАТИ</a>
                                    <p>Базові препарати для профедення професійних</p>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <img src={prof3} alt="" />
                                    <a href="#">АНТИОКСИДАНТНІ ПІЛІНГИ</a>
                                    <p>Новинка! Скоро в продажі</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className={classes.parent_mnu}>
                        <a href="#">домашній догляд</a>
                        <div className={classes.child_mnu}>
                            <div className={classes.child_mnu_wrapper}>
                                <div className={classes.child_mnu_Item}>
                                    <img src={dom1} alt="" />
                                    <a href="/category/liniya-renaissance">ЛІНІЯ RENAISSANCE</a>
                                    <p>Готові набори процедур для проведення </p>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <img src={dom2} alt="" />
                                    <a href="/category/liniya-3r-ceramide">ЛІНІЯ 3R CERAMIDE</a>
                                    <p>Базові препарати для профедення професійних</p>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <img src={dom3} alt="" />
                                    <a href="/category/liniya-b-biotic">ЛІНІЯ β-BIOTIC</a>
                                    <p>Новинка! Скоро в продажі</p>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <img src={dom4} alt="" />
                                    <a href="/category/liniya-aqya-o2xy">ЛІНІЯ AQYA O2XY</a>
                                    <p>Новинка! Скоро в продажі</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className={classes.parent_mnu}>
                        <Link to="/comunity">СEF комьюніті</Link>

                        {/* <div className={classes.child_mnu}>
                            <div className={classes.child_mnu_wrapper}>
                               
                                <div className={classes.child_mnu_Item}>
                                    <a href="/" className={classes.child_title_mnu}>ФІЛОСОФІЯ БРЕНДУ</a>
                                    <a href="/" className={classes.child_title_mnu}>УНІКАЛЬНА ТЕХНОЛОГІЯ</a>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <p className={classes.child_title_mnu}>ФІЛОСОФІЯ БРЕНДУ</p>
                                    <a href="/" className={classes.child_mini_link}>Співпраця з косметологами</a>
                                    <a href="/" className={classes.child_mini_link}>Співпраця з салонами</a>
                                    <a href="/" className={classes.child_mini_link}>Стати партнером</a>
                                    <a href="/" className={classes.child_mini_link}>Міждународна співпраця</a>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <p className={classes.child_title_mnu}>ЗАХОДИ</p>
                                    <a href="/" className={classes.child_mini_link}>Семінари</a>
                                    <a href="/" className={classes.child_mini_link}>Навчальні вебінари</a>
                                    <a href="/" className={classes.child_mini_link}>Івенти</a>
                                </div>
                                <div className={classes.child_mnu_Item}>
                                    <p className={classes.child_title_mnu}>БЛОГ</p>
                                    <a href="/" className={classes.child_mini_link}>Акції</a>
                                    <a href="/" className={classes.child_mini_link}>Новини</a>
                                </div>
                                
                            </div>
                        </div> */}


                    </li>
                    <li><Link to="/contact">контакти</Link></li>
                </ul>
            </nav>

            <div className={classes.header_icons}>
                <img src={search} alt="" onClick={()=>setShowSearch(true)} />
                <button className={classes.cart_ico} onClick={()=>setActiveBeltModal(true)}><img src={cart} alt="" /> <span>{items.length}</span></button>
            </div>
            
        </header>

        <CartModal active={activeBeltModal} closeModal={()=>{setActiveBeltModal(false)}} />
        
        
            <div className={isMobileActive ? `mobMnu mobMnuOpen` : `mobMnu`}>
                <img src={close} alt=""
                 className="mobMnu_close"
                 onClick={()=> setIsMobileActive(false)}
                  />
                <Link to="/"><img src={logo} alt="" /></Link>
                <ul>
                    <li><Link to='/category/profesijni-nabori' onClick={()=> setIsMobileActive(false)}>ПРОФЕСІЙНІ НАБОРИ</Link></li>
                    <li><Link to='/category/bazovi-preparati' onClick={()=> setIsMobileActive(false)}>БАЗОВІ ПРЕПАРАТИ</Link></li>
                    <li><Link to='/category/liniya-renaissance' onClick={()=> setIsMobileActive(false)}>ЛІНІЯ RENAISSANCE</Link></li>
                    <li><Link to='/category/liniya-3r-ceramide' onClick={()=> setIsMobileActive(false)}>ЛІНІЯ 3R CERAMIDE</Link></li>
                    <li><Link to='/category/liniya-b-biotic' onClick={()=> setIsMobileActive(false)}>ЛІНІЯ β-BIOTIC</Link></li>
                    <li><Link to='/category/liniya-aqya-o2xy' onClick={()=> setIsMobileActive(false)}>ЛІНІЯ AQYA O2XY</Link></li>
                    <li><Link to='/contact' onClick={()=> setIsMobileActive(false)}>контакти</Link></li>
                </ul>
            </div>
            {showSearch && <Search active={showSearch} closeModal={()=>{setShowSearch(false)}} />}
       
        </>
        
    )
}
export default Header;