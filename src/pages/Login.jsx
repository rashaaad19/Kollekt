import backgroundImg from "../assets/register-background.png";
import LoginForm from "../components/register/LoginForm";
const Login = () => {
  return (
    <div
      className="p-3 h-[calc(100vh-67px)] "
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <LoginForm />
    </div>
  );
};

export default Login;
