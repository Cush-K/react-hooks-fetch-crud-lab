// QuestionList.js
import React from "react";

function QuestionList({ questions, onDelete, onUpdateCorrectIndex }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <ul>
              {question.answers.map((answer, index) => (
                <li 
                  key={index} 
                  style={{ color: index === question.correctIndex ? "green" : "black" }}
                >
                  {answer}
                </li>
              ))}
            </ul>
            {/* Dropdown for selecting the correct answer */}
            <label>
              Correct Answer:
              <select
                aria-label="Correct Answer"
                value={question.correctIndex}
                onChange={(e) => onUpdateCorrectIndex(question.id, e.target.value)}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => onDelete(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
