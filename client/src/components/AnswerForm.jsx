import React, {useState} from "react";
import '../stylesheets/Form.css';
import axios from 'axios';
function AnswerForm({qid, showQuestionAndAnswersFunc, user}) {
    const [answerText, setAnswerText] = useState('');
    const handdleSubmit = (e) => {
        e.preventDefault();
        const hyperlinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        const invalidHyperlinkRegex = /\[([^\]]*)\]\((?!https?:\/\/[^\s)]+).*?\)/g;

        if (invalidHyperlinkRegex.test(answerText)) {
        alert('The hyperlink must begin with "https://" or "http://".');
        return;
        }

        if (answerText.indexOf('](') !== -1 && !hyperlinkRegex.test(answerText)) {
        alert('There is an incorrectly formatted hyperlink in your text.');
        return;
        }
        addNewAnswer(answerText, user.email);
    }
    const addNewAnswer = async (text, username) => {
        text = text.trim();
        username = username.trim();
        if (!text || !username) {
            alert('Please fill in all required fields.');
            return;
          }
        try {
            await axios.post(`http://localhost:8000/answer/${qid}`, {
                text: text,
                ans_by: username,
                questionId: qid
            });
            setAnswerText('');
            showQuestionAndAnswersFunc();
        } catch (error) {
            console.error('Failed to post the answer:', error);
            alert('Error posting answer: ' + (error.response?.data?.message || error.message));
        }
    }
    return(
        <div className="answerForm"> 
            <form id="newAnswerForm" onSubmit={handdleSubmit}>
                <label htmlFor="answerText">Answer Text*</label>
                <textarea 
                    id="answerText" 
                    name="answerText" 
                    placeholder="Add details" 
                    required
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                />
                
                <div className="post-box">
                <button type="submit" id="postAnswer" >Post Answer</button>
                <span className="required-text">* indicates mandatory fields</span>
                </div>
            </form>
        </div>
    )


}
export default AnswerForm;