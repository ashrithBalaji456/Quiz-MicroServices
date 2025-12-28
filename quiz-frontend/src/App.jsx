import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

/* ================= API ================= */
const quizApi = axios.create({
  baseURL: "http://localhost:8765/quiz-service/quiz",
});

/* ================= CREATE QUIZ ================= */
const CreateQuiz = () => {
  const [category, setCategory] = useState("");
  const [num, setNum] = useState(5);
  const [title, setTitle] = useState("");
  const [quizId, setQuizId] = useState(null);

  const createQuiz = async () => {
    try {
      const res = await quizApi.post("/create", {
        categoryName: category,
        numOfQuestion: num,
        title,
      });
      setQuizId(res.data);
    } catch {
      alert("Quiz creation failed");
    }
  };

  return (
    <div className="card">
      <h2>Create Quiz</h2>

      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input type="number" min="1" value={num} onChange={(e) => setNum(e.target.value)} />
      <input placeholder="Quiz Title" onChange={(e) => setTitle(e.target.value)} />

      <button onClick={createQuiz}>Create Quiz</button>

      {quizId && (
        <div className="quiz-id-box">
          <p><strong>Quiz ID:</strong> {quizId}</p>
          <code>http://localhost:5173/quiz/{quizId}</code>
        </div>
      )}
    </div>
  );
};

/* ================= START QUIZ ================= */
const StartQuiz = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  return (
    <div className="card">
      <h2>Attempt Quiz</h2>
      <input placeholder="Enter Quiz ID" onChange={(e) => setId(e.target.value)} />
      <button onClick={() => navigate(`/quiz/${id}`)}>Start Quiz</button>
    </div>
  );
};

/* ================= QUESTION ================= */
const Question = ({ q, selected, onAnswer }) => (
  <div className="question-card">
    <h4>{q.questionTitle}</h4>

    {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
      <label key={i} className="option">
        <input
          type="radio"
          name={`q-${q.id}`}
          checked={selected === opt}
          onChange={() => onAnswer(q.id, opt)}
        />
        {opt}
      </label>
    ))}
  </div>
);

/* ================= ATTEMPT QUIZ ================= */
const AttemptQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* FETCH QUESTIONS */
  useEffect(() => {
    setLoading(true);
    quizApi
      .post(`/get/${id}`)
      .then((res) => {
        if (!res.data || res.data.length === 0) {
          setError("No questions found");
        } else {
          setQuestions(res.data);
        }
      })
      .catch(() => setError("Invalid Quiz ID"))
      .finally(() => setLoading(false));
  }, [id]);

  /* TIMER LOGIC (FIXED) */
  useEffect(() => {
    if (submitted || loading || questions.length === 0) return;

    if (timeLeft === 0) {
      if (index === questions.length - 1) {
        submitQuiz(); // AUTO SUBMIT
      } else {
        setIndex((i) => i + 1);
        setTimeLeft(15);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, index, questions.length, submitted, loading]);

  const handleAnswer = (qid, answer) => {
    setResponses((prev) => {
      const filtered = prev.filter((r) => r.id !== qid);
      return [...filtered, { id: qid, response: answer }];
    });
  };

  const submitQuiz = async () => {
    if (submitted) return;
    setSubmitted(true);

    try {
      const res = await quizApi.post(`/score/${id}`, responses);
      const score = res.data;
      const total = questions.length;
      const percentage = Math.round((score / total) * 100);
      const result = percentage >= 50 ? "PASS" : "FAIL";

      navigate("/result", {
        state: { score, total, percentage, result, questions, responses },
      });
    } catch {
      alert("Submission failed");
    }
  };

  if (loading) return <p className="center">Loading quiz...</p>;
  if (error) return <p className="center">{error}</p>;

  const q = questions[index];
  const selected = responses.find((r) => r.id === q.id)?.response;
  const isLastQuestion = index === questions.length - 1;

  return (
    <div className="container">
      <h2>Attempt Quiz</h2>

      <div className="timer">⏱ {timeLeft}s</div>

      <Question q={q} selected={selected} onAnswer={handleAnswer} />

      {!isLastQuestion && (
        <button onClick={() => { setIndex(index + 1); setTimeLeft(15); }}>
          Next
        </button>
      )}

      {isLastQuestion && (
        <button className="submit-btn" onClick={submitQuiz}>
          Submit Quiz
        </button>
      )}
    </div>
  );
};

/* ================= RESULT ================= */
const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <p className="center">No result</p>;

  return (
    <div className="container result">
      <h2>Result</h2>
      <p>Score: {state.score} / {state.total}</p>
      <p>Percentage: {state.percentage}%</p>
      <p className={state.result === "PASS" ? "pass" : "fail"}>
        {state.result}
      </p>

      <button onClick={() => navigate("/review", { state })}>Review</button>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

/* ================= REVIEW ================= */
const ReviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="center">No review</p>;

  return (
    <div className="container">
      <h2>Review Answers</h2>

      {state.questions.map((q) => {
        const user = state.responses.find((r) => r.id === q.id)?.response;

        return (
          <div key={q.id} className="question-card">
            <h4>{q.questionTitle}</h4>
            <p>
              Your Answer:{" "}
              <strong>{user || "Not Answered"}</strong>
            </p>
            <p>
              Correct Answer:{" "}
              <strong>{q.correctAnswer}</strong>
            </p>
          </div>
        );
      })}

      {/* ✅ BACK TO HOME BUTTON */}
      <button
        className="submit-btn"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};


/* ================= HOME ================= */
const Home = () => (
  <div className="container">
    <h1>Quiz Application</h1>
    <CreateQuiz />
    <StartQuiz />
  </div>
);

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<AttemptQuiz />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
