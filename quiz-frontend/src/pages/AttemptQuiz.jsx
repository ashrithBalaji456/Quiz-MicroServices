import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quizApi } from "../api/api";
import Question from "../components/Question";
import "./QuizPage.css";

const AttemptQuiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizApi.post(`/get/${id}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setResponses(prev => {
      const updated = prev.filter(r => r.id !== questionId);
      return [...updated, { id: questionId, response: answer }];
    });
  };

  const submitQuiz = async () => {
    try {
      const res = await quizApi.post(`/score/${id}`, responses);
      alert(`Your Score: ${res.data}`);
    } catch (err) {
      alert("Error submitting quiz");
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-page">
      <h2>Attempt Quiz</h2>

      {questions.map(q => (
        <Question key={q.id} data={q} onAnswer={handleAnswer} />
      ))}

      <button className="submit-btn" onClick={submitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
};

export default AttemptQuiz;
