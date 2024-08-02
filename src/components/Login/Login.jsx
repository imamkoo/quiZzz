import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import "./Login.scss";

const Login = () => {
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Signed in with Google:", user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome</h2>
        <button onClick={handleGoogleSignIn} className="google-signin-button">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
