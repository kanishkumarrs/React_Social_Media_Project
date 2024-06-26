import {useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'

const EditPost = ({
    posts, handleEdit, editBody, setEditBody,
    editTitle, setEditTitle
}) => {
    const {id}= useParams()
    const post = posts.find(post=>(post.id).toString()===id)

    useEffect(()=>{
        if(post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditBody, setEditTitle])

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                        <label htmlFor='postTitle'>Title: </label>
                        <textarea id='postBody' required value={editBody} onChange={(e) =>
                            setEditBody(e.target.value)
                        }/>
                        <button type='submit' onClick={()=>handleEdit(post.id)}>
                            Submit
                        </button>
                    </form>
                </>
            }
            {
                !editTitle&&
                <>
                    <h2>Post not found</h2>
                    <p>That's disappointing</p>
                    <p>
                        <Link to='/React_Social_Media_Project/'>Visit Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost