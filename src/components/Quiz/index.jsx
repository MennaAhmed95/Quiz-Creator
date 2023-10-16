import React, { useState } from "react";

export const Quiz = ({ quizData, onSave }) => {
  const [title, setTitle] = useState(quizData.title);
  const [description, setDescription] = useState(quizData.description);
  const [score, setScore] = useState(quizData.score);
  const [url, setUrl] = useState(quizData.url);
  const [questions, setQuestions] = useState(quizData.questions_answers);

  // Handle input changes
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      text: "",
      answers: [],
      feedback: {
        true: "",
        false: "",
      },
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = (questionIndex) => {
    const newAnswer = {
      text: "",
      isCorrect: false,
    };
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push(newAnswer);
    setQuestions(updatedQuestions);
  };

  const handleFeedbackChange = (event, questionIndex, isTrueFeedback) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].feedback[
      isTrueFeedback ? "true" : "false"
    ] = value;
    setQuestions(updatedQuestions);
  };

  // Save quiz data
  const handleSave = () => {
    const modifiedQuiz = {
      ...quizData,
      title: title,
      description: description,
      score: score,
      url: url,
      questions: questions,
    };
    onSave(modifiedQuiz);
  };

  return (
    <div>
      <h1>Quiz Creator/Editor</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={handleTitleChange} />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
      />
      <label>Final Score:</label>
      <input type="number" value={score} onChange={handleScoreChange} />
      <label>URL:</label>
      <input type="text" value={url} onChange={handleUrlChange} />
      <br />
      <h2>Questions:</h2>
      {questions?.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={(event) => handleQuestionChange(event, index)}
          />
          <br />
          <label>True Feedback:</label>
          <input
            type="text"
            name="true"
            value={question.feedback_true}
            onChange={(event) => handleFeedbackChange(event, index, true)}
          />
          <br />
          <label>False Feedback:</label>
          <input
            type="text"
            name="false"
            value={question.feedback_false}
            onChange={(event) => handleFeedbackChange(event, index, false)}
          />
          <br />
          <h3>Answers:</h3>
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <input
                type="text"
                name="text"
                value={answer.text}
                onChange={(event) =>
                  handleAnswerChange(event, index, answerIndex)
                }
              />
              <label>Is Correct:</label>
              <input
                type="checkbox"
                name="isCorrect"
                checked={answer.is_true}
                onChange={(event) =>
                  handleAnswerChange(event, index, answerIndex)
                }
              />
              <br />
            </div>
          ))}
          <button onClick={() => handleAddAnswer(index)}>Add Answer</button>
          <br />
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add New Question</button>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
