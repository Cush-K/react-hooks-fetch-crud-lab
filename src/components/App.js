import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (page === "List") {
      fetch(`http://localhost:4000/questions`)
        .then((resp) => resp.json())
        .then((data) => setQuestions(data))
        .catch((error) => console.error(error));
    }
  }, [page]);

  // Handle deleting a question
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() =>
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      )
    );
  }

  // Handle updating the correct answer
  function handleUpdateCorrectIndex(id, correctIndex) {
    // Immediately update the state before the PATCH request to ensure the DOM reflects the change
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, correctIndex: parseInt(correctIndex) } : question
    );
    setQuestions(updatedQuestions);

    // Proceed with the PATCH request to update the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: parseInt(correctIndex) }),
    })
      .then((resp) => resp.json())
      .then((updatedQuestion) => {
        // Ensure the state is correctly updated again with the response
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm />
      ) : (
        <>
          <QuestionList
            questions={questions}
            onDelete={handleDelete}
            onUpdateCorrectIndex={handleUpdateCorrectIndex}
          />
        </>
      )}
    </main>
  );
}

export default App;
