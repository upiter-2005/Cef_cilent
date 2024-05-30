import React, {useEffect, useState} from 'react'
import edit from '../../assets/img/edit.svg'

import back from '../../assets/img/arrow-right.svg'
import { toast } from 'react-toastify'
import { UseSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {selectUser, setUserPhone, setUserName} from '../../redux/slices/userSlice'
import axios from 'axios'
import classes from "./EditProfile.module.scss"
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'

const EditProfile:React.FC = () => {
    const dispatch = useAppDispatch()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editName, setEditName] = useState<string>('')
    const [editPhone, setEditPhone] = useState<string>('')
    const {token, user, id} = useSelector(selectUser)

useEffect(()=>{
    if(user){
        setEditName(user.user_nicename)
        setEditPhone(user.user_phone)
    }
}, [user])


    const updateUser = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
          "acf": {
            "user_phone" : editPhone,
            "user_name" : editName
          }
        };
        axios.post(`https://api.apicef.space/wp-json/wp/v2/users/${id}`, data, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        ).then(res => {
            console.log(res);
            toast.info("Ваш профіль оновлено успішно!");
             localStorage.setItem("user_nicename", editName );
             localStorage.setItem("user_phone", editPhone);

             dispatch(setUserPhone(res.data.acf.user_phone));
             dispatch(setUserName(res.data.acf.user_name));
            // localStorage.setItem("userLastName", lastName);
            // localStorage.setItem("userEmail", email);
  
            // dispatch(setAditionalDataUser(
            //   {
            //     user_phone: phone,
            //     user_last_name: lastName,
            //     id: res.data.id
            //   }
            // )
        //);
  
          }).catch(err => console.log(err))
        
      }


  return (
    <div className={classes.editProfile}>
      
      {isEdit ? 
      (<div className={classes.profileData}>
            <div className={classes.editDataRow}>
                <p className={classes.editDataRow_title}>профіль</p>
                <button className={classes.backToProfile} onClick={()=>setIsEdit(false)}><img src={back} alt="" /> Назад до профілю</button>
            </div>
       
        <form onSubmit={e => updateUser(e)}>
            <div className="inputCEF">
                <span>Ім’я</span>
                <input type="text" placeholder="Ніка" value={editName} onChange={(e)=>setEditName(e.target.value)} />
            </div>
           
            <div className="inputCEF">
                <span>Номер телефону</span>
                <input type="tel" placeholder="+80986745907" value={editPhone} onChange={(e)=>setEditPhone(e.target.value)} />
            </div>
            
                <button type='submit' className="blackBtn">зберегти зміни</button>
        </form>
         
      </div>) 
      :
       (<div className={classes.profileData}>
        <p className={classes.title}>профіль</p>
        <div className={classes.profileData_Row}>
            <div>
                <span>{localStorage.getItem( 'user_nicename' )}</span>
                <span>{localStorage.getItem( 'userEmail' )}</span>
                <span>{localStorage.getItem( 'user_phone' )}</span>
            </div>
            <div className={classes.edit} onClick={()=>setIsEdit(true)}>Редагувати <button><img src={edit} alt="" /></button></div>
        </div>
        <div className={classes.profileData_Row}>
            <div>
                <span>Пароль</span>
            </div>
            <Link to='/recover' className={classes.edit} >Редагувати <button><img src={edit} alt="" /></button></Link>
        </div>
    </div>)
       }
        
    </div>
  )
}
export default EditProfile
