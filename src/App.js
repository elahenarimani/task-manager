import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { taskFetch } from "./redux/taskSlice";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import EditModal from "./component/editTask/editModal";
import DeleteModal from "./component/deleteTask/deleteModal";
import Button from "./component/button/button";
import AddModal from "./component/addTask/addModal";
function App() {
  const dispatch = useDispatch();
  let { task, status } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIDMode, setEditIDMode] = useState({ id: null });
  const [deleteModal, setDeleteModal] = useState(false);
  const [idMode, setIdMode] = useState({
    editIdMode: null,
    deleteId: null,
  });
  const filteredData = useMemo(() => {
    return task.map((item) => item);
  }, [task]);
  useEffect(() => {
    dispatch(taskFetch());
  }, []);
  if (status === "loading ...") {
    return <h3>loading ...</h3>;
  }
  if (status === "failed ...") {
    return <h3>failed ...</h3>;
  }
  function handlePrevPage() {
    console.log("hi");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNextPage() {
    if (currentPage < Math.ceil(filteredData.length / 20)) {
      setCurrentPage(currentPage + 1);
    }
  }
  function deleteHandler(deleteID) {
    setDeleteModal(true);
    setIdMode({
      editIdMode: null,
      deleteId: deleteID,
    });
  }
  function editHandler(editID) {
    setEditIDMode({ id: editID });
    setEditModalOpen(true);
  }
  console.log(task);
  console.log(status);
  return (
    <div className="App">
      <div className="hidden-header"></div>
      <header>
        <h1>Task Manager</h1>
        <div className="add-task-wrapper" onClick={() => setAddModalOpen(true)}>
          <MdAddTask className="add-task" />
        </div>
      </header>
      <main className="task-wrapper">
        {filteredData
          ?.slice(currentPage * 20 - 20, currentPage * 20)
          .map((item) => (
            <div key={item.id} className="task">
              <div className="button-wrapper">
                <button
                  className="close-wrapper"
                  onClick={() => deleteHandler(item.id)}
                >
                  
                  <MdClose className="close"/>
                </button>
                {/* <Button
                  className={"close-wrapper"}
                  onClickHandler={deleteHandler(item.id)}
                >
                  <MdClose className="close" />
                </Button> */}

                {/* <Button className={"edit-wrapper"} onClickHandler={editHandler(item.id)}><CiEdit className="edit" /></Button> */}

                <button
                  className="edit-wrapper"
                  onClick={() => editHandler(item.id)}
                >
                  <CiEdit className="edit" />
                </button>
              </div>
              <p className="title">{item.title}</p>
              <p className="task-description">{item.description}</p>
              <div className="img-wrapper">
                <img aria-label="nature" src={item.image} />
              </div>
            </div>
          ))}
      </main>
      <footer>
        <section className="button-wrapper">
          <Button
            className="icon-prev"
            onClickHandler={handlePrevPage}
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </Button>
          <Button
            className="icon-next"
            onClickHandler={handleNextPage}
            disabled={currentPage === Math.ceil(filteredData.length / 20)}
          >
            <GrFormNext />
          </Button>
        </section>
      </footer>
      {addModalOpen && (
        <AddModal
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
      )}
      {editModalOpen &&
        filteredData.map((item) => {
          if (item.id === editIDMode.id) {
            return (
              <EditModal
                editIDMode={editIDMode}
                editModalOpen={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                inpTitle={item.title}
                inpDescription={item.description}
              />
            );
          }
        })}
      {deleteModal && (
        <DeleteModal
          deleteId={idMode.deleteId}
          setDeleteModal={setDeleteModal}
        />
      )}
    </div>
  );
}
export default App;
