import { useField } from "formik";

const CommentInput = ({...props }) => {
  const [field] = useField(props);
  return (
      <input {...field} {...props} />
  );
};

export default CommentInput;