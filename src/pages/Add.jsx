import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from './firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'

export const Add = () => {

    const [books,setBooks] = useState({
        title: "",
        desc: "",
        price: "",
        cover: ""
    })

    const [img,setImg] = useState(null)
    const [loading,setLoading] = useState(false)

    const navigate =  useNavigate()

    const handleChange =(e) => {

        e.preventDefault()
        setBooks((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    
    useEffect(()=> {
        
        const uploadImage = async() => {
            if(img === null) return
            setLoading(true)
            const imageRef = ref(storage, `images/${img.name + v4()}`) 
            try {
                await uploadBytes(imageRef,img)
                const url = await getDownloadURL(imageRef)
                console.log(url)
                setBooks(pre => ({
                    ...pre,
                    cover: url
                }))
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        uploadImage()
    },[img])

    const handlClick = async(e) => {
        e.preventDefault()
        
             
            
            try {
                
                console.log("final console",books)
                await axios.post("https://books-site.herokuapp.com/createbooks", books)
                console.log("success")
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        
    }

  return (
    <div className='flex flex-col items-center space-y-5 h-screen justify-center bg-slate-50'>
        <div className='flex items-center space-x-3'>
        <Link to="/" className='flex '><UilArrowCircleLeft/></Link>
        <h1 className='text-2xl font-bold text-gray-600'>Add new book</h1>
      </div>
    <div className='flex space-x-5 md:space-x-10 bg-white p-5 md:p-16 rounded-lg shadow-lg'>
        <div className='flex flex-col space-y-6 font-bold text-gray-500'>
        <label className='mr-5'>Title</label>
        <label>Description</label>
        <label>Price</label>
        <label>Cover image</label>
        </div>
        
        <div>
        <div className='flex flex-col space-y-3'> 
        <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none' name='title' onChange={handleChange}/>
        <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none' name='desc' maxLength={60} onChange={handleChange}/>
        <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none ' name='price' onChange={handleChange}/>
        {/* <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none' name='cover' onChange={handleChange}/> */}
        <input type='file' onChange={e=> setImg(e.target.files[0])}/>
        </div>
        {loading && <h1 className={`text-sm text-gray-500`}>Uploading...</h1>}
        </div>
        
    
    </div>
        <div><button disabled={loading} className={`${loading ? 'cursor-not-allowed' : ''} bg-green-600 text-white px-4 py-2 my-3 rounded-lg font-semibold hover:bg-green-700 duration-300 hover:shadow-lg`} onClick={handlClick}>Add Book</button></div>
        
    </div>
  )
}
