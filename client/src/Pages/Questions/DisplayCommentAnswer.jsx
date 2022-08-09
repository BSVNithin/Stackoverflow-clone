import React from 'react'
import moment from 'moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import { deleteCommentans, editCommentans } from '../../actions/question'
import { useState } from 'react'

const DisplayCommentAnswer = ({question}) => {

    const User = useSelector((state) => (state.currentUserReducer))
    const { id } = useParams()
    const [C,setC]=useState('');
    const Navigate = useNavigate()
    const [Edit,setEdit]=useState(false)
    const dispatch = useDispatch()
    const handleDelete = (anscommentId, noOfAnsComments) => {
        dispatch(deleteCommentans(id, anscommentId, noOfAnsComments - 1))
    }
    const editHandler=()=>{
        setEdit(true);
    }
    const EditHandler=()=>{
        setEdit(false);
    }
    function refreshPage() {
    window.location.reload(false);
  }
    const handlePostComment3= async (e,anscommentId) => {
        e.preventDefault()
        console.log(C)
        if(User === null){
            alert('Login or Signup to comment a question')
            Navigate('/Auth')
        }else{
            if(C === ''){
                alert('Enter a comment before submitting')
            } else{
                console.log(id);
                console.log(anscommentId)
                dispatch(editCommentans({ id, anscommentId:anscommentId , anscommentBody: C,}))
            }
        }
        EditHandler()
    }
    return (
        <div>
            {
                question.answercomments.map((com) => (!Edit?
                (<div className="display-ans" key={com._id}>
                        <p>{com.anscommentBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={editHandler}>Edit</button>
                                {
                                    User?.result?._id === com?.ansuserId && (
                                        <button type='button' onClick={() => handleDelete(com._id, question.noOfAnsComments )}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>commented {moment(com.anscommentedOn).fromNow()}</p>
                                <Link to={`/Users/${com.ansuserId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{com.ansuserCommented.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {com.ansuserCommented}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>):(<section className='post-ans-container'>
                                    <h3>Edit Ans Comment</h3>
                                    <form onSubmit={ async (e) => { 
                                        await handlePostComment3(e,com.anscommentId);
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

export default DisplayCommentAnswer
