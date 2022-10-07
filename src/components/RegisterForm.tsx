import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useActions } from '../hooks/actions';

const RegisterForm = () => {
  const { register } = useActions();
  // const history = useHistory();

    type RegisterFormType = {
      username: string;
      password: string;
    };

    const registerFormValidate = (values: RegisterFormType) => {
      const errors = {};
      return errors;
    };

    const submit = async (
      values: RegisterFormType,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
      register(values.username, values.password);
      setSubmitting(false);

      setTimeout(() => {
        window.location.replace('/loginAsync');
      }, 500);
    };

    return (
      <>
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={registerFormValidate}
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="user"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={touched.username && errors.username ? 'error' : undefined}
                />
                {touched.username && errors.username ? (
                  <div className="error-message">{errors.username}</div>
                ) : null}
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
                  className={touched.password && errors.password ? 'error' : undefined}
                />
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </>
    );
};

export default RegisterForm;
