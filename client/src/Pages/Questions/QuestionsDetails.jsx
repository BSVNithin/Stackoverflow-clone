import React, { useState} from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer, deleteQuestion, voteQuestion, commentQuestion, commentAnswer } from '../../actions/question'
import DisplayComment from './DisplayComment'
import DisplayCommentAnswer from './DisplayCommentAnswer'

const QuestionsDetails = () => {
    const { id } = useParams()
    const questionsList = useSelector(state => state.questionsReducer)
    const [Answer, setAnswer] = useState('')
    const [Comment, setComment] = useState('')
    const [AnsComment, setAnsComment] = useState('')
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = 'https://nithin-stackoverflow-clone.netlify.app'

    const handlePostAns = (e, answerLength) =>{
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to answer a question')
            Navigate('/Auth')
        }else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            } else{
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name }))
            }
        }
    }

    const handleShare = () => {
        copy(url+location.pathname)
        alert('Copied url : '+url+location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote'))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote'))
    }
    const handlePostComment= (e,commentsLength) => {
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to comment a question')
            Navigate('/Auth')
        }else{
            if(Comment === ''){
                alert('Enter a comment before submitting')
            } else{
                dispatch(commentQuestion({ id, noOfComments: commentsLength + 1, commentBody: Comment, userCommented: User.result.name }))
            }
        }
    }
    const handlePostCommentAns= (e,commentsLength,noOfAnswers) => {
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to comment an answer')
            Navigate('/Auth')
        }else{
            if(noOfAnswers===0){
                alert('First post an answer')
                return
            }
            if(AnsComment === ''){
                alert('Enter a comment before submitting')
            } else{
                dispatch(commentAnswer({ id, noOfAnsComments: commentsLength + 1, anscommentBody: AnsComment, ansuserCommented: User.result.name }))
            }
        }
    }

    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                <h1>Loading...</h1> :
                <>
                    {
                        questionsList.data.filter(question => question._id === id).map(question => (
                            <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className="question-votes">
                                            <img src={upvote} alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                            <p>{question.upVote.length - question.downVote.length}</p>
                                            <img src={downvote} alt="" width='18' className='votes-icon' onClick={handleDownVote}/>
                                        </div>
                                        <div style={{width: "100%"}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className="question-details-tags">
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className="question-actions-user">
                                                <div>
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {
                                                        User?.result?._id === question?.userId && (
                                                            <button type='button' onClick={handleDelete}>Delete</button>
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                        <Avatar backgroundColor="orange" px='8px' py='5px' borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {
                                    question.noOfComments !== 0 && (
                                        <section>
                                            <h3>{question.noOfComments} Comments</h3>
                                            <DisplayComment key={question._id} question={question} id={id} setComment={setComment}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Comment</h3>
                                    <form onSubmit={ (e) => { handlePostComment(e, question.comments.length) }}>
                                        <textarea name="" id="" cols="30" rows="5" onChange={e => setComment(e.target.value)}></textarea><br />
                                        <input type="Submit" className='post-ans-btn' value='Post Your Comment'/>
                                    </form>
                                </section>
                        
                                {
                                    question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} Answers</h3>
                                            <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Answer</h3>
                                    <form onSubmit={ (e) => { handlePostAns(e, question.answer.length) }}>
                                        <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br />
                                        <input type="Submit" className='post-ans-btn' value='Post Your Answer'/>
                                    </form>
                                </section>
                                {
                                    question.noOfAnsComments !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnsComments} Answer_Comments</h3>
                                            <DisplayCommentAnswer key={question._id} question={question} handleShare={handleShare}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Comment for answer</h3>
                                    <form onSubmit={ (e) => { handlePostCommentAns(e, question.answercomments.length,question.noOfAnswers) }}>
                                        <textarea name="" id="" cols="30" rows="5" onChange={e => setAnsComment(e.target.value)}></textarea><br />
                                        <input type="Submit" className='post-ans-btn' value='Post Your Comment for the answer'/>
                                    </form>
                                    <p>
                                        Browse other Question tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                            ))
                                        } or 
                                        <Link to='/AskQuestion' style={{textDecoration: "none", color:"#009dff"}}> ask your own question.</Link>
                                    </p>
                                </section>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default QuestionsDetails
