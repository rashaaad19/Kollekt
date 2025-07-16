import * as Yup from "yup";

export const EditPostSchema = Yup.object().shape({
  postContent: Yup.string()
    .trim()
    .min(1, "Post content cannot be empty")
    .required("Post content cannot be empty"),

  image: Yup.string()
    .test(
      "is-valid-image",
      "Invalid image format",
      (value) => {
        return typeof value === "string" && value.startsWith("data:image/");
      }
    ),
});
