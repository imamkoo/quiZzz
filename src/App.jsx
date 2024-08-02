import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";
import { auth } from "./firebase";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

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
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const handleSetResult = (resultData) => {
    setResult(resultData);
  };

  const handleResetResult = () => {
    setResult(null);
  };

  return (
    <Router>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/quiz" /> : <Login />}
          />
          <Route
            path="/quiz"
            element={
              user ? (
                <Quiz questions={questions} setResult={handleSetResult} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/result"
            element={
              user && result ? (
                <Result result={result} onTryAgain={handleResetResult} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
