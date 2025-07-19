import { Form, Formik } from "formik";
import SendIcon from "../icons/SendIcon";
import CommentInput from "../post/CommentInput";
import useStore from "../../store/store";
import { addComment } from "../../services/firestore_service";

const AddCommentForm = ({ postID }) => {
  const currentUser = useStore((state) => state.currentUser);
  console.log(currentUser);
  const handleAddComment = (values, setSubmitting, resetForm) => {
    console.log(values, postID);
    addComment(
      {
        uid: currentUser.uid,
        userName: currentUser.displayName,
        comment: values.comment,
      },
      postID
    );
    setSubmitting(false);
    resetForm();
  };
  return (
    <Formik
      initialValues={{ comment: "" }}
      enableReinitialize
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleAddComment(values, setSubmitting, resetForm);
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form className="flex flex-row flex-1 gap-2">
          <CommentInput
            name="comment"
            type="text"
            placeholder="Add a comment..."
            className="input input-bordered input-sm flex-1 focus:outline-none focus:ring-0 focus:border-primary"
          />
          <button
            className="btn btn-sm btn-primary"
            disabled={!dirty || isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <SendIcon />
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCommentForm;
