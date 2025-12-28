const Question = ({ data, onAnswer }) => {
  return (
    <div className="question-card">
      <h4>{data.questionTitle}</h4>

      {[data.option1, data.option2, data.option3, data.option4].map((opt, index) => (
        <label key={index} className="option">
          <input
            type="radio"
            name={`question-${data.id}`}
            onChange={() => onAnswer(data.id, opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
};

export default Question;

