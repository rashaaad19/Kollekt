import EditPostForm from "../home/EditPostForm";
import PostDetails from "../home/PostDetails";
import CloseIcon from "../icons/CloseIcon";

const Modal = ({ modalItem, type }) => {
  return (
    <dialog id="my_modal_2" className="modal w-dvw">
      <div className="modal-box p-5 sm:p-6 max-w-5xl relative">
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          onClick={() => document.getElementById("my_modal_2").close()}
        >
          
          <CloseIcon strokeColor="gray"/>
        </button>

        {type === "edit" && <EditPostForm post={modalItem} />}
        {type === "comments" && <PostDetails post={modalItem} />}
      </div>

      {/* Backdrop click fallback */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
