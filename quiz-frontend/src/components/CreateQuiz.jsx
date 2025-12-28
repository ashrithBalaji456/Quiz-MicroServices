import { useState } from "react";
import { quizApi } from "../api/api";
import "./QuizForm.css";

const CreateQuiz = () => {
  const [formData, setFormData] = useState({
    category: "",
    num: 5,
    title: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createQuiz = async () => {
    try {
      setLoading(true);
      const res = await quizApi.post("/create", {
        categoryName: formData.category,
        numOfQuestion: formData.num,
        title: formData.title,
      });

      alert(res.data);
    } catch (error) {
      alert("Failed to create quiz");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-form">
      <h2>Create Quiz</h2>

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        name="num"
        type="number"
        min="1"
        value={formData.num}
        onChange={handleChange}
      />

      <input
        name="title"
        placeholder="Quiz Title"
        value={formData.title}
        onChange={handleChange}
      />

      <button onClick={createQuiz} disabled={loading}>
        {loading ? "Creating..." : "Create Quiz"}
      </button>
    </div>
  );
};

export default CreateQuiz;
