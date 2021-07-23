import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const LoginForm = () => {
  const { login } = useActions();
  const history = useHistory();

    type LoginFormType = {
      username: string;
      password: string;
    };

    const loginFormValidate = (values: LoginFormType) => {
      const errors = {};
      return errors;
    };

    const submit = async (values: LoginFormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      login(values.username, values.password);
      setSubmitting(false);

      setTimeout(() => {
        window.location.replace('/tasks');
      }, 500);
    };

    return (
      <>
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={loginFormValidate}
          onSubmit={submit}
        >
          {({ isSubmitting, values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text" 
                  placeholder="user"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={touched.username && errors.username ? "error" : null}
                />
                {touched.username && errors.username ? (
                  <div className="error-message">{errors.username}</div>
                ): null}
              </Form.Group>
            
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={touched.password && errors.password ? "error" : null}
                />
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ): null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </>
    );
};

export default LoginForm;
