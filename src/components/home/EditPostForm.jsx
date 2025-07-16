import  { useRef } from "react";
import { handleEditPost } from "../../handlers/formHandlers";
import { Form, Formik } from "formik";
import FormInput from "../register/FormInput";
import CloseIcon from "../icons/CloseIcon";
import PhotoIcon from "../icons/PhotoIcon";
import { EditPostSchema } from "../../schemas/PostSchema";

const EditPostForm = ({ post }) => {
  const fileInputRef = useRef(null);
  
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleImageSelect = (event, setFieldValue, setTouched) => {
    const file = event.target.files[0];
    if (file) {
      setTouched({ image: true });
      if (!file.type.startsWith("image/")) {
        setFieldValue("image", "");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImg = (setFieldValue) => {
    setFieldValue("image", "");
  };

  return (
    <Formik
      initialValues={{
        postContent: post?.postContent,
        image: post?.image || "",
      }}
      validationSchema={EditPostSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        handleEditPost(values, setSubmitting, post?.id);
      }}
    >
      {({
        isSubmitting,
        errors,
        setFieldValue,
        values,
        touched,
        setTouched,
        setFieldError,
      }) => (
        <Form className="flex flex-col items-center">
          <div className="mb-5">
            <h1 className="font-bold text-2xl mb-3 text-primary">Edit Post</h1>
          </div>

          <div className="flex flex-col items-start w-full max-w-xs">
            {/* Post Content */}
            <FormInput
              name="postContent"
              type="text"
              placeholder="Post Content"
              className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary"
            />

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) =>
                handleImageSelect(e, setFieldValue, setTouched, setFieldError)
              }
              className="hidden"
            />

            {/* Image upload button */}
            <button
              type="button"
              onClick={handlePhotoClick}
              className="btn btn-sm btn-outline mt-3"
            >
              <PhotoIcon className="w-5 h-5 mr-2" />
              Select Image
            </button>

            {/* Image Preview */}
            {values.image && (
              <div className="relative w-full mt-3 max-w-sm p-2 rounded-xl bg-white border border-base-300 shadow">
                <img
                  src={values.image}
                  alt="Preview"
                  className="rounded-lg object-cover w-full max-h-48"
                />
                <button
                  type="button"
                  onClick={() => handleCancelImg(setFieldValue)}
                  className=" bg-secondary/80 p-1 rounded-2xl absolute top-2 right-2 m-2 cursor-pointer"
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {/* Image Error Message */}
            <p
              className={`text-error text-sm mb-2 h-5 ${
                errors.image && touched.image ? "visible" : "invisible"
              }`}
            >
              {errors.image}
            </p>
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary mt-4 w-45"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditPostForm;
