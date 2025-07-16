import EditPostForm from "../home/EditPostForm";

const Modal = ({ modalItem }) => {
  console.log(modalItem);
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box p-5 sm:p-6 ">
        <EditPostForm post={modalItem} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
