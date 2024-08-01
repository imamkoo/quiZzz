import { useEffect, useState } from "react";
import "./App.scss";
import Quiz from "./components/Quiz/Quiz";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((question) => ({
          question: decodeHtmlEntities(question.question),
          correct_answer: decodeHtmlEntities(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(decodeHtmlEntities),
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  return loading ? (
    <div className="loading">Loading...</div>
  ) : (
    <Quiz questions={questions} />
  );
}

export default App;
