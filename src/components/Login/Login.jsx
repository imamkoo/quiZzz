import { signInWithPopup } from "firebase/auth";
import Jumping from "../../assets/jumping.svg";
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
    <section className="login-section">
      <div className="login-container">
        <div className="login-row">
          <div className="image-column">
            <img src={Jumping} className="login-image" alt="Jumping image" />
          </div>
          <div className="text-column">
            <button onClick={handleGoogleSignIn} className="sign-in-button">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
