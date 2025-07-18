import EditPostForm from "../home/EditPostForm";
import PostDetails from "../home/PostDetails";

const Modal = ({ modalItem, type }) => {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box p-5 sm:p-6 max-w-5xl ">
        {type==='edit'&&<EditPostForm post={modalItem} />}
        {type==='comments'&&<PostDetails post={modalItem}/>}

      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
