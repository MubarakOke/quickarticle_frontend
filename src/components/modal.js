import React, {useState, useEffect} from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";


const Modal = ({ setIsOpen, heading, type, user, mutationfunc, mutationtype, articles, setArticles, prefill}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  
  useEffect(()=>{
    if(mutationtype==="update"){
      setTitle(prefill.title)
      setDescription(prefill.description)
    }
  }, [mutationfunc])

  const handleClick= (e)=>{
    setIsOpen(false); 
    e.preventDefault();
    e.stopPropagation();
    if(mutationtype==="create"){
      mutationfunc({
        variables: {
          title,
          description
        }
      })
    }
    if(mutationtype==="update"){
      mutationfunc({
        variables: {
          id: prefill.id,
          title,
          description
        }
      })  
    }
    if(mutationtype==="destroy"){
      mutationfunc({
        variables: {
          id: prefill.id,
        }
      })
    }
  }

  const handleTitleChange= (e)=>{
    setTitle(e.target.value);
  }
  const handleDescriptionChange= (e)=>{
    setDescription(e.target.value);
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{heading||"Dialog"}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {type==='message'?"Are you sure you want to delete the item?":
            <div>
                <div className="rounded-[20px] flex flex-col px-6 pt-2">
                    <h1 className="text-[#8A8B8B] text-[15px] text-left opacity-80 font-semibold">Title</h1>
                    <input type="text" onChange={handleTitleChange} value={title} className="w-full mt-2 shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] h-10 text-sm peer rounded-[10px]  p-2"/>
                </div>
                <div className="rounded-[20px] flex flex-col px-6 py-3">
                    <h1 className="text-[#8A8B8B] text-[15px] text-left opacity-80 font-semibold">Description</h1>
                    <textarea cols="30" rows="3" onChange={handleDescriptionChange} value={description} className="shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[20px] mt-2 p-2"></textarea>
                </div>
            </div>
            }
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
                {type==='message'?<button className={styles.deleteBtn} onClick={handleClick}>
                    Delete
                </button>:
                <button className={styles.createBtn} onClick={handleClick}>
                    {type==="editform"?"Edit":"Create"}
                </button>} 
              <button
                className={styles.cancelBtn}
                onClick={handleClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;