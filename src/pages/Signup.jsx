import SignupForm from "../components/register/SignupForm";
import backgroundImg from "../assets/register-background.png";

const Signup = () => {
  return (
      <div className="p-3 h-[calc(100vh-67px)] " style={{ backgroundImage: `url(${backgroundImg})` }}>
      <SignupForm />
    </div>
  );
};

export default Signup;
