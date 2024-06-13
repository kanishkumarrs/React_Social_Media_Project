import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import EditPost from "./EditPost";
import PostLayout from "./PostLayout";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {format} from "date-fns"
import api from "./api/posts"
import data from './db.json';


function App () {
  const [posts,setPosts] = useState([])
  const [search,setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle]=useState('')
  const [postBody, setPostBody]=useState('')
  const [editTitle, setEditTitle]=useState('')
  const [editBody, setEditBody]=useState('')
  const navigate = useNavigate( )

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      }
      catch (err) {
        if(err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredResults=posts.filter((post) =>
    ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase()))  
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id=posts.length ? Number(posts[posts.length-1].id) + 1 : 1
    const datetime=format(new Date(),'MMMM dd, yyyy pp')
    try {
      const newPost = {id, title: postTitle, datetime, body:postBody}
      const response= await api.post('/posts',newPost)
      const allPosts=[...posts, response.data]
      setPosts(allPosts)
      setPostBody('')
      setPostTitle('')
      navigate('/React_Social_Media_Project/')
    } catch (err) {
      if(err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }
      else {
        console.log(`Error: ${err.message}`)
      }
    }
  }

  const handleEdit = async (id) => {
    const datetime = format (new Date(),'MMMM  dd, yyyy pp')
    const updatedPost = {id, title: editTitle, datetime, body: editBody}
    try {
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id===id ? {...response.data}:post))
      setEditTitle('')
      setEditBody('')
      navigate('/React_Social_Media_Project/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    navigate('/React_Social_Media_Project/')
  }

  return (
    <div className='App'>
      <Header title='Social Media App Sample' />
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/React_Social_Media_Project" element = {<Home posts = {searchResults}/>} />
        <Route path="/React_Social_Media_Project/post">
          <Route index element={<NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        </Route>
        <Route path="/edit/:id" element={<EditPost posts={posts}
            handleEdit={handleEdit}
            editBody={editBody}
            editTitle={editTitle}
            setEditBody={setEditBody}
            setEditTitle={setEditTitle}/>
          } />
        <Route path="React_Social_Media_Project/about" element = {<About />} />
        <Route path="*" element = {<Missing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
