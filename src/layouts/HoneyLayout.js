import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainCategory from '../pages/socializing/MainCategory';
import Pagination from '../pages/socializing/Pagination';
import Search from '../pages/socializing/Search';
import SubCategory from '../pages/socializing/SubCategory';
import Empty from '../pages/socializing/Empty';


export default function HoneyLayout(){

    const [categoryStatus, setCategoryStatus] = useState(1);
    const [list,setList] = useState([]);
    const [paginationList,setPaginationList] = useState([]);
    const [listCnt,setListCnt] = useState(0);

    useEffect(
        ()=>{

        }
        ,[list]
    )

    return(
        <>
            <MainCategory setCategoryStatus={setCategoryStatus}/>
            {categoryStatus === 1 && <Empty/>}
            {categoryStatus === 2 && <SubCategory/>}
            <Search/>
            <Outlet/>
            <Pagination list={list} paginationList={paginationList} setPaginationList={setPaginationList} listCnt={listCnt}/>
        </>
    );
}