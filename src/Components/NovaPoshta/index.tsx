import React,{useEffect, useState, useRef, RefObject} from 'react'
import axios from 'axios';
import Select from 'react-select';
import '../../assets/css/Select.scss'

type NovaPoshtaTypesa = {
    apiKey: string,
    calledMethod: string,
    modelName: string,
    methodProperties: any
}

type DepartmentsType = {
    value: string,
    label: string
}

const NovaPoshta:React.FC = () => {
    
    const [cities, setCities] = useState<[]>([])
    const [citiesNP, setCitiesNP] = useState<DepartmentsType[]>([])
    const [departmentsNP, setDepartmentsNP] = useState<DepartmentsType[]>([])
    const [cityVal, setCityVal] = useState<string>('')
    const [department, setDepartment] = useState<string>('')



    
    const getCities = async() => {
        const param: NovaPoshtaTypesa = {
            apiKey: "ee8c3d42f9f5dfe39a3ad4c2636f747a",
            calledMethod: "getCities",
            modelName: "Address",
            methodProperties: {
                //FindByString: 'Бровари'
            }
        }
        try {
            axios.post('https://api.novaposhta.ua/v2.0/json/', param )
            .then(res => {
                setCities(res.data.data)
                const options: DepartmentsType[] = []
                res.data.data.forEach((el:any) => {
                    options.push({value: el.Description, label: el.Description});
                })
                
                setCitiesNP(options)
            })
        } catch (error) {
            
        }
    }


    const getWarehouses = async(query: string) => {
        const param: NovaPoshtaTypesa = {
            apiKey: "ee8c3d42f9f5dfe39a3ad4c2636f747a",
            calledMethod: "getWarehouses",
            modelName: "Address",
            methodProperties: {
                //SettlementRef: "7150812c-9b87-11de-822f-000c2965ae0e"
             
               CityName: query
            }
        }
        try {
            axios.post('https://api.novaposhta.ua/v2.0/json/', param )
            .then(res => {
                const options: DepartmentsType[] = []
                res.data.data.forEach((el:any) => {
                    options.push({value: el.Description, label: el.Description});
                })
                
                setDepartmentsNP(options)
            })
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        getCities()
       
    }, [])

    // const changeCity = (query: string) => {
    //     if(query.length < 2)  {setSearchedCities([]); setCityVal(query); return true;};
    //     const result = cities.filter((obj: any) => obj.Description.toLowerCase().includes(query.toLowerCase()))
    //     setSearchedCities(result)
    //     setCityVal(query)
        
    // }
    const setNPDepartment = (query: any) => {
        setDepartment(query)
    }
    console.log(cities);
 
    const dinamicDepartments = (value: any) => {
        console.log(value);
        setCityVal(value.value);getWarehouses(value.value);
    }
return (
    <div className="selectBox">
        {/* <div className="cefSelect">
            <input type="text"
                value={cityVal}
                onChange={e=>{changeCity(e.target.value); }}
                placeholder='Введіть назву міста (села)' 
                
            />
            <div className="selectItems">
                {searchedCities && searchedCities.map((el:any, i) => <div className="selectItems_el" key={i}
                onClick={()=>{setCityVal(el.Description);setSearchedCities([]);getWarehouses(el.Description) }}
                 >{el.Description}</div>)}

        
            </div>
        </div> */}
        <Select options={citiesNP}
            
            onChange={dinamicDepartments}
            className="np-department-select"
            placeholder={`Оберіть місто` || cityVal} 
           
          styles={{
            option: (provided, state) => ({
                ...provided,
                color: "#1e1e1e",
                fontSize: 16,
                backgroundColor: state.isFocused ? "#eee" : "#fff",
                cursor: "pointer",
                borderColor: "#333",
                outline: "none",
                border: "none"

            })

            
          }}
            classNamePrefix="react-select" />
        <Select  options={departmentsNP}
            
            onChange={setNPDepartment}
            className="np-department-select"
            placeholder={`Оберіть відділення Нової пошти` || cityVal} 
           
          styles={{
            option: (provided, state) => ({
                ...provided,
                color: "#1e1e1e",
                fontSize: 16,
                backgroundColor: state.isFocused ? "#eee" : "#fff",
                cursor: "pointer",
                borderColor: "#333",
                outline: "none",
                border: "none"

            })

            
          }}
            classNamePrefix="react-select" />
    </div>
  )
}
export default NovaPoshta