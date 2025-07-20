import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { loginSchema } from "../../schemas/UserSchema";
import { handleLogin } from "../../handlers/formHandlers";
import FormInput from "./FormInput";
import useStore from "../../store/store";

const LoginForm = () => {
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const initializeUserDoc = useStore((state) => state.initializeUserDoc);


  // const handleSignUp = async (event) => {

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       userEmail,
  //       userPassword
  //     );
  //     const user = userCredential.user;
  //     await updateProfile(user, {
  //       displayName: userName,
  //     });

  //     //create new document for the user
  //     createUser(user)

  //     //navigate to profile page
  //   } catch (error) {
  //     // const errorCode = error.code;
  //   }
  // };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleLogin(values, setErrors, navigate,setCurrentUser,initializeUserDoc);
          setSubmitting(false);
          console.log(values);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form
            className="flex flex-col items-center py-15 px-4 gap-2 
 bg-white rounded-xl shadow-lg sm:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/3 mx-auto  border border-solid border-zinc-300"
          >
            <div className="mb-5">
              <h1 className="font-bold text-2xl mb-3 text-primary">Log In</h1>
              <p className="text-neutral text-sm max-w-sm   ">
                By continuing, you agree to our User Agreement and acknowledge
                that you understand the Privacy Policy.
              </p>
            </div>
            {/*----------------------Inputs------------------- */}

            <div className="flex flex-col items-start">
              <FormInput
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs 
            focus:outline-none focus:ring-0 
            focus:border-primary"
              />
              <FormInput
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs 
            focus:outline-none focus:ring-0 
            focus:border-primary"
              />

              {/*----------------------Firebase error------------------- */}

              <p
                className={`text-error text-sm mb-2 h-5 ${
                  errors ? "block" : "hidden"
                }`}
              >
                {errors.general}
              </p>

              <p className=" font-light mt-8">
                Don't have an account ?{" "}
                <Link to={"/"} className="font-bold text-accent">
                  Create Account
                </Link>
              </p>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary mt-4 w-45  "
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
