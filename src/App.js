import React, { useState, useEffect } from "react";
import { initial_quizzes } from "./components/constants";
import "./App.css";
import { Quiz } from "./components/Quiz";

const App = () => {
  const [quizzes, setQuizzes] = useState(initial_quizzes);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Load quizzes from local storage
  useEffect(() => {
    const storedQuizzes = localStorage.getItem("quizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  // Save quizzes to local storage
  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  // Add a new quiz
  const handleAddQuiz = () => {
    const newQuiz = {
      created: new Date().toISOString(),
      description: "",
      id: null,
      modified: new Date().toISOString(),
      questions: [],
      score: null,
      title: "",
      url: "",
    };
    setSelectedQuiz(newQuiz);
  };

  // Edit an existing quiz
  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  // Save quiz
  const handleSaveQuiz = (modifiedQuiz) => {
    if (modifiedQuiz.id) {
      const updatedQuizzes = quizzes.map((quiz) =>
        quiz.id === modifiedQuiz.id ? modifiedQuiz : quiz
      );
      setQuizzes(updatedQuizzes);
    } else {
      const newQuiz = { ...modifiedQuiz, id: Math.random() };
      setQuizzes([...quizzes, newQuiz]);
    }
    setSelectedQuiz(null);
  };

  return (
    <div className="App">
      <h1>Quiz Creator/Editor Interface</h1>
      {selectedQuiz ? (
        <Quiz quizData={selectedQuiz} onSave={handleSaveQuiz} />
      ) : (
        <div>
          <h2>Quizzes List:</h2>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                {quiz.title}{" "}
                <button onClick={() => handleEditQuiz(quiz)}>Edit</button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddQuiz}>Add New Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
