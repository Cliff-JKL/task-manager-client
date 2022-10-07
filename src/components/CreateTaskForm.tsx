import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useActions } from '../hooks/actions';
import { useCreateTaskAsyncMutation } from '../store/api/task.api';

interface ICreateTaskFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const CreateTaskForm = (props: ICreateTaskFormProps) => {
  const { createTask } = useActions();
  const [createTaskAsync, { isLoading, data: createdTaskData }] = useCreateTaskAsyncMutation();

    type CreateTaskFormType = {
      text: string;
      isFinished?: boolean;
    };

    const CreateTaskFormValidate = (values: CreateTaskFormType) => {
      const errors = {};
      return errors;
    };

    const submit = async (
      values: CreateTaskFormType,
      { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
      const createdTask = await createTaskAsync(values).unwrap();
      createTask(createdTask);
      setSubmitting(false);
      resetForm({ values: { text: '', isFinished: false } });
    };

    return (
      <div style={props.style}>
        <Formik
          initialValues={{ text: '', isFinished: false }}
          validate={CreateTaskFormValidate}
          onSubmit={submit}
        >
          {({
            isSubmitting,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicTaskName">
                {/* <Form.Label>Task</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="what to do"
                  name="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.text}
                  className={touched.text && errors.text ? 'error' : undefined}
                />
                {touched.text && errors.text ? (
                  <div className="error-message">{errors.text}</div>
                ) : null}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {
                  isLoading
                    ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                      </>
                    )
                    : <span>Add</span>
                }
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
};

export default CreateTaskForm;
