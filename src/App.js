import React, {useEffect, useState} from 'react';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

function App() {
    const [search,setSearch] = useState('');
    const paramsSearch=(str)=>{
        setSearch(str);
    }
    useEffect(()=>{

    },[search])
  return (
    <div className="App">
        <SearchContainer paramsSearch={paramsSearch} />
        <MainContainer search={search} />
    </div>
  );
}

const SearchContainer = ({paramsSearch}) => {
    const [value,setValue] = useState('');
    const handleChange = (e)=>{
        setValue(e.target.value);
    };

    const handleClick = ()=>{
        if(value === null){
            paramsSearch('fail');
        }
        paramsSearch(value);
        setValue('');
    };


    return (
    <>

        <div className="w-75 mx-auto mb-5">
        <div className="input-group mt-5 mb-3 ">
            <input type="text" className="form-control" placeholder="Поиск"
                   aria-label="search" aria-describedby="basic-addon2" value={value} onChange={handleChange}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleClick}>Найти</button>
                </div>
        </div>
        </div>
    </>
    )
}


const MainContainer = ({search}) => {
    const [data,setData] = useState([]);
    const [load,setLoad] = useState(false);
    if(search === "fail") {
        console.log('om')
    }

    useEffect(()=>{
        const database = firebase.database();
        const data = database.ref();
        data.once('value', (list) => {
            list.forEach((list) => {
                let data = list.val();
                setData([...data]);
                setLoad(true);
            });
        });

    },[])

useEffect(()=>{
    if(search !== ''){
        setData([...data.filter(item=>item.name === search),...data.filter(item=>item.name !== search)]);
    } else {
        const database = firebase.database();
        const data = database.ref();
        data.once('value', (list) => {
            list.forEach((list) => {
                let data = list.val();
                setData([...data]);
                setLoad(true);
            });
        });
    }
},[search])


    const handleClick = (i)=>{
        console.log(i)
    }
    return (
        <>
            {load ?
            <table className="table w-75 mx-auto">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Имя клиента</th>
                    <th scope="col">Название магазина</th>
                    <th scope="col">Ссылка</th>
                    <th scope="col">Почта</th>
                    <th scope="col">Телефон</th>
                    <th scope="col">Статус</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item)=> (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name ? item.name : '—'}</td>
                        <td>{item.shop ? item.shop : '—'}</td>
                        <td>{item.url ? <a href={`${item.url}`}>{item.url}</a> : '—'}</td>
                        <td>{item.email ? item.email : '—'}</td>
                        <td>{item.phone ? item.phone.map((item,i)=><li style={{listStyle:'none'}} key={i}>
                            <a href={`tel:+${item}`}>+{item}</a></li>) : '—'}</td>
                        <td><ButtonItem status={item.status} handleClick={handleClick} id={item.id}/></td>
                    </tr>
                ))}

                </tbody>
            </table> : <Loader />}

        </>
    );
};

const Loader =()=>{
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', marginTop:"150px"}}>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
        )
}

const ButtonItem = ({status,handleClick,id})=>{
    const [value,setValue] = useState(status);
    const [ids,setId] = useState(id);
    let label = value ? 'Звонили' : 'Не звонили';
    let classStyle = value ? 'btn btn-success':'btn btn-warning'
    const setStatus = (ids)=>{
        setValue(prev=>!prev);
        handleClick(ids);
        firebase.database().ref(`data/${ids-1}/status`).set(!value);
    }
   useEffect(()=>{
       setId(id)
   },[id])
    return (
        <div>
          <button className={classStyle} onClick={()=>setStatus(ids)}>{label}</button>
        </div>
    )
}

export default App;
