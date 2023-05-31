import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {

  const [books,setBooks] = useState([])

  useEffect(()=> {

    const fetchBooks = async() =>{
      try {
        const res = await axios.get("https://books-site.herokuapp.com/books")
        setBooks(res.data)
        console.log("book data",res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBooks()
  },[])

  const handleDelete = async(id) => {

    if(window.confirm("Are you sure you want to delete this post.?")){
    try {
      const res = await axios.delete("https://books-site.herokuapp.com/books/"+id)
      alert(res.data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  }

  return (
    <div className='flex-col text-center pt-14 h-screen items-center bg-slate-50'>
      <div><Link to="/add"><button className='bg-green-600 text-white px-4 py-2 my-3 rounded-lg font-semibold hover:bg-green-700 duration-300 hover:shadow-lg'>Add Book</button></Link></div>
    <div className='flex justify-center mx-auto space-x-5 flex-wrap'>
      {books.map((book) =>(
        <div className='mb-10 flex  text-center flex-col space-y-1' key={book.id}>
          
          <img src={book.cover} alt="" className='h-72 w-48 bg-green-200 hover:scale-105 flex mx-auto duration-300 hover:shadow-lg'/>
          <h1 className='text-blue-900 text-2xl font-bold'>{book.title}</h1>
          <h1 className='text-blue-600 w-52 text-sm font-semibold flex-wrap'>{book.desc}</h1>
          <h1 className='font-semibold'>LKR {book.price}</h1>
          <div className='flex justify-center space-x-5'>
            <Link to={`/update/${book.id}`}><button className='bg-blue-500 hover:bg-blue-600 duration-300 shadow-md px-2 py-1 rounded-md text-xs font-semibold text-white'>Update</button></Link>
            <button className='bg-red-500 hover:bg-red-600 duration-300 shadow-md px-2 py-1 rounded-md text-xs font-semibold text-white' onClick={()=> {handleDelete(book.id)}}>Delete</button>
          </div>
          
        </div>
      ))}
    </div>
      
    </div>
  )
}
