import * as api from '../api/index'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData)
        dispatch({ type: "POST_QUESTION", payload: data})
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllQuestions = () => async (disptach) => {
    try {
        const { data } = await api.getAllQuestions()
        disptach({ type: 'FETCH_ALL_QUESTIONS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
    try {
        await api.deleteQuestion(id)
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const voteQuestion = (id, value) => async (dispatch) => {
    try {
        await api.voteQuestion(id, value)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { id, noOfAnswers, answerBody, userAnswered } = answerData;
        const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered )
        dispatch({ type: 'POST_ANSWER', payload: data})
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    try {
        await api.deleteAnswer(id, answerId, noOfAnswers)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
} 

export const commentQuestion = (commentData) => async (dispatch) => {
    try {
        const { id, noOfComments, commentBody, userCommented } = commentData;
        const { data } = await api.commentQuestion( id, noOfComments, commentBody, userCommented )
        dispatch({ type: 'POST_COMMENT', payload: data})
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = (id, commentId, noOfComments) => async (dispatch) => {
    try {
        await api.deleteComment(id, commentId, noOfComments)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const editComment = (id,commentId,commentBody) => async(dispatch) => {
    try{
        console.log(id);
        console.log(id.commentBody)
        console.log(id.commentId)
        const { data } = await api.editComment(id.id,id.commentId,id.commentBody)
        dispatch({type: 'EDIT_COMMENT', payload: data})
        dispatch(fetchAllQuestions())
    }catch(error){
        console.log(error)
    }
}

export const commentAnswer = (commentData) => async (dispatch) => {
    try {
        const { id, noOfAnsComments, anscommentBody, ansuserCommented } = commentData;
        const { data } = await api.commentAnswer( id, noOfAnsComments, anscommentBody, ansuserCommented )
        dispatch({ type: 'POST_ANSWER_COMMENT', payload: data})
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const deleteCommentans = (id, anscommentId, noOfAnsComments) => async (dispatch) => {
    try {
        await api.deleteCommentans(id, anscommentId, noOfAnsComments)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const editCommentans = (id,anscommentId,anscommentBody) => async(dispatch) => {
    try{
        console.log(id.anscommentId);
        const { data } = await api.editCommentans(id.id,id.anscommentId,id.anscommentBody)
        dispatch({type: 'EDIT_COMMENT_ANS', payload: data})
        dispatch(fetchAllQuestions())
    }catch(error){
        console.log(error)
    }
}

