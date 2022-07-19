import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { GoPencil, GoTrashcan } from 'react-icons/go';
import { useQuery} from '@apollo/client';
import { useMutation } from "@apollo/client";
import {allArticles} from '../GraphQL/queries';
import Modal from '../components/modal';
import { CREATEARTICLE, UPDATEARTICLE, DELETEARTICLE } from "../GraphQL/mutations";

function Article({user}){
  const [articles, setArticles]= useState("");
  const [queryError, setQueryerror]= useState("");
  const {data, error}= useQuery(allArticles);
  const [isOpen, setIsOpen] = useState(false);
  const [modaltype, setModaltype]= useState(false);
  const [mutationfunc, setMutationfunc]= useState("");
  const [mutationtype, setMutationtype]= useState("");
  const [modalheading, setModalheading]= useState(false);
  const [prefill, setPrefill]= useState("");
  const [createArticle]= useMutation(CREATEARTICLE, {
                            refetchQueries: [{ query: allArticles }],
                            });

  const [updateArticle]= useMutation(UPDATEARTICLE, {
                            refetchQueries: [{ query: allArticles }],
                            });
  const [deleteArticle]= useMutation(DELETEARTICLE, {
                            refetchQueries: [{ query: allArticles }],
                            });
  const navigate = useNavigate();

  useEffect(()=>{
    if(data){
      setArticles(data.allArticles)
    }
    if(error){
      setQueryerror(error)
    }
  }, [data, error])

  const handleLogout= ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleCreateArticle= ()=>{
    setIsOpen(true)
    setModaltype("createform")
    setModalheading("Create Article")
    setMutationtype("create")
    setMutationfunc(()=>createArticle)
  }

  const handleEditArticle= (item)=>{
    setIsOpen(true)
    setModaltype("editform")
    setModalheading("Edit Article")
    setPrefill(item)
    setMutationtype("update")
    setMutationfunc(()=>updateArticle)
  }

  const handleDeleteArticle= (item)=>{
    setIsOpen(true)
    setModaltype("message")
    setModalheading("Delete Article")
    setMutationtype("destroy")
    setPrefill(item)
    setMutationfunc(()=>deleteArticle)
  }

  const content= ()=>{
    if(!articles){
      return <div>No Article</div>
    }
    return articles.map((item)=>{
      return (<div className='my-2 flex justify-between items-center py-2 border-b-2 border-black-600' key={item.id}>
              {/* -----------content Begins--------------- */}
              <div>
              <div className='text-[25px] font-medium'>
              {item.title}
              </div>
              <div>
              {item.description}
              </div>
              </div>
              {/* -----------content Stop--------------- */}
              {/* -----------symbols begin--------------- */}
              { 
                user.user.id===item.userId? (<div className="flex">
                <GoPencil className='cursor-pointer' onClick={()=>handleEditArticle(item)} color='#0E4E48' size='22'/>
                <GoTrashcan className='cursor-pointer mx-3' onClick={()=>handleDeleteArticle(item)} color='red' size='22'/> 
              </div>):("")
              }
              {/* -----------symbols stop--------------- */}
              </div>
      )
    })
  }
  return (
    <div className='mx-[10%] my-[15px]' >
      <nav className="flex justify-between mb-[25px]  items-center border-b-4 border-black-600 pb-2">
        <div className='text-[25px]'>Welcome {user.user.firstName}</div>
        <div className='flex'>
        <button className='text-[18px] p-3' onClick={handleLogout}>Logout</button>
        <button className='text-[18px] bg-[#0E4E48] rounded-5 p-3 text-[#fff]' onClick={handleCreateArticle}>Create Article</button>
        </div>
      </nav>
      {isOpen && <Modal setIsOpen={setIsOpen} type={modaltype} mutationtype={mutationtype} heading={modalheading} user={user} mutationfunc={mutationfunc} articles={articles} setArticles={setArticles} prefill={prefill}/>}
      <div className='text-[20px] font-bold '>Articles</div>
      {content()}
    </div>
  )
}

export default Article