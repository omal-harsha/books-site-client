import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UilArrowCircleLeft } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import { storage } from './firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'


export const Update = () => {

  const [book,setBook] = useState(
    {
      title: "",
      desc: "",
      cover: "",
      price: 0
    }
  )

  const [img,setImg] = useState(null)
  const [loading,setLoading] = useState(false)

  const location =  useLocation()
  const bookId = location.pathname.split("/")[2]

  const navigate = useNavigate()

  useEffect(()=> {

    const uploadImage = async() => {
      
        if(img === null) return
        setLoading(true)
        const imageRef = ref(storage, `images/${img.name + v4()}`) 
        try {
            await uploadBytes(imageRef,img)
            const url = await getDownloadURL(imageRef)
            console.log(url)
            setBook(pre => ({
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

  useEffect(()=> {

    const fetchBook = async() => {

      try {    
        const res = await axios.get("https://books-site.herokuapp.com/getbook/" + bookId)
        setBook({...res.data[0]})
        console.log(book)
      } catch (error) {
        console.log(error)
      }

    }
    fetchBook()
  },[])

  const handleChange = (e) => {
    e.preventDefault()
    setBook((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleClick = async(e) => {

    e.preventDefault()
    try {
      await axios.put("https://books-site.herokuapp.com/update/"+ bookId, book)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col items-center space-y-5 h-screen justify-center  bg-slate-50'>
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
          <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none' value={book.title} name='title' onChange={handleChange}/>
          <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none' value={book.desc} name='desc' maxLength={60} onChange={handleChange}/>
          <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none' value={book.price} name='price' onChange={handleChange}/>
          {/* <input type="text" className='border py-1 px-1 md:w-64 focus:outline-none' value={book.cover} name='cover' onChange={handleChange}/> */}
          <input type='file' onChange={e=> setImg(e.target.files[0])}/>
          </div>
          {loading && <h1 className={`text-sm text-gray-500`}>Uploading...</h1>}
        </div>
        
        </div>

        
        <div><button disabled={loading} className={`${loading ? 'cursor-not-allowed' : ''} bg-orange-500 text-white px-4 py-2 my-3 rounded-lg font-semibold hover:bg-orange-700 duration-300 hover:shadow-lg`} onClick={handleClick}>Update</button></div>
    </div>

  )
}
