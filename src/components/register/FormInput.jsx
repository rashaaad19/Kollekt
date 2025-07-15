import { useField } from "formik";

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-xs flex flex-col gap-1 items-start    ">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />

      <div
        className={`text-error text-sm h-10 text-left ${
          meta.touched && meta.error ? "visible" : "invisible"
        }`}
      >
        {meta.error}
      </div>
    </div>
  );
};

export default FormInput;