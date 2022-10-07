import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useActions } from '../hooks/actions';
import { useLoginMutation } from '../store/api/auth.api';

const LoginForm = () => {
  const { setCredentials } = useActions();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  type LoginFormType = {
    email: string;
    password: string;
  };

  const loginFormValidate = (values: LoginFormType) => {
    const errors = {};
    return errors;
  };

  const submit = async (
    values: LoginFormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const loginData = {
      ...values
    };
    const credentials = await login(loginData).unwrap();
    setCredentials(credentials);
    setSubmitting(false);

    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={loginFormValidate}
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? 'error' : undefined}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
