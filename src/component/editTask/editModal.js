import React from "react";
import "../styles/modal.scss";
// import "./editModal.scss"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editFetch } from "../../redux/taskSlice";
const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(5, "Too Short!")
    .max(800, "Too Long!")
    .required("Required"),
});
function EditModal({
  editIDMode,
  editModalOpen,
  setEditModalOpen,
  inpTitle,
  inpDescription,
}) {
  const dispatch = useDispatch();
  let { status } = useSelector((state) => state);
  if (status === "loading ...") {
    return <h3>loading ...</h3>;
  }
  if (status === "failed ...") {
    return <h3>failed ...</h3>;
  }
  function handleeditTask(values) {
    dispatch(editFetch({ ...values, id: editIDMode.id }));
    setEditModalOpen(false);
  }
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        {console.log("add")}
        <h1>Edit Task</h1>
        <Formik
          initialValues={{
            title: inpTitle || "",
            description: inpDescription || "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleeditTask}
        >
          {({ errors, touched, validateField, validateForm }) => (
            <Form className="form-wrapper">
              <div className="field-wrapper">
                <Field name="title" />
                {errors.title && touched.title ? (
                  <div className="error">{errors.title}</div>
                ) : null}
              </div>
              <div className="field-wrapper">
                <Field
                  name="description"
                  as="textarea"
                />
                {errors.description && touched.description ? (
                  <div className="error">{errors.description}</div>
                ) : null}
              </div>
              <div className="button-wrapper">
                <button type="submit" className="submit-btn ">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-btn "
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default EditModal;
