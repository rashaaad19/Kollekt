import { Form, Formik } from "formik";
import { signupSchema } from "../../schemas/UserSchema";
import { Link, useNavigate } from "react-router-dom";
import { handleSignup } from "../../handlers/formHandlers";
import FormInput from "./FormInput";
import useStore from "../../store/store";

const SignupForm = () => {
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const initializeUserDoc = useStore((state) => state.initializeUserDoc);

  return (
    
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        handleSignup(values, setErrors, navigate,setCurrentUser, initializeUserDoc);
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
            <h1 className="font-bold text-2xl mb-3 text-primary">Sign Up</h1>
            <p className="text-neutral text-sm max-w-sm   ">
              By continuing, you agree to our User Agreement and acknowledge
              that you understand the Privacy Policy.
            </p>
          </div>
          <div className="flex flex-col items-start">

            {/*----------------------Inputs------------------- */}

            <FormInput
              name="name"
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs 
            focus:outline-none focus:ring-0 
            focus:border-primary"
            />
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
              Already a Kollektor?{" "}
              <Link to={"/login"} className="font-bold text-accent">
                Login
              </Link>
            </p>
          </div>{" "}
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary mt-4 w-45  "
          >
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
