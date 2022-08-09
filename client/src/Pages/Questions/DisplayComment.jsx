import React, { useState } from 'react'
import moment from 'moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import { deleteComment, editComment } from '../../actions/question'

const DisplayComment = ({question,setComment}) => {
    const User = useSelector((state) => (state.currentUserReducer))
    const { id } = useParams()
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [C,setC]=useState('');
    const handleDelete = (commentId, noOfComments) => {
        dispatch(deleteComment(id, commentId, noOfComments - 1))
    }
    const [Edit, setEdit] = useState(false);
    const editHandler=()=>{
        setEdit(true);
    }
    const EditHandler=()=>{
        setEdit(false);
    }
    function refreshPage() {
    window.location.reload(false);
  }
    const handlePostComment2= async (e,commentId) => {
        e.preventDefault()
        console.log(C)
        if(User === null){
            alert('Login or Signup to comment a question')
            Navigate('/Auth')
        }else{
            if(C === ''){
                alert('Enter a comment before submitting')
            } else{
                // console.log(id);
                // console.log(commentId)
                dispatch(editComment({ id, commentId:commentId , commentBody: C,}))
                setComment(C);
            }
        }
        EditHandler()
    }
    return (
        <div>
            {
                question.comments.map((com) => (!Edit?
                    (<div className="display-ans" key={com._id}>
                        <p>{com.commentBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={editHandler}>Edit</button>
                                {
                                    User?.result?._id === com?.userId && (
                                        <button type='button' onClick={() => handleDelete(com._id, question.noOfComments )}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>commented {moment(com.commentedOn).fromNow()}</p>
                                <Link to={`/Users/${com.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{com.userCommented.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {com.userCommented}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>):(<section className='post-ans-container'>
                                    <h3>Edit Comment</h3>
                                    <form onSubmit={ async (e) => { 
                                        await handlePostComment2(e,com.commentId);
                                        refreshPage()
                                        }
                                    } >
                                        <input type="text" onChange={e=>{setC(e.target.value)}}/><br />
                                        <input type="Submit" className='post-ans-btn' value='Post Your Edited Comment'/>
                                    </form>
                                </section>)
                ))
            }
        </div>
    )
}

export default DisplayComment