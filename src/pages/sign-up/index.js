import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let bodyData = {
        email: values?.email,
        name: values?.name,
        password: values?.password,
        createdAt: new Date().toISOString(),
        order: [],
      };
      let response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(bodyData),
      });

      // get the data
      let data = await response.json();

      if (data.success) {
        // reset the fields
        router.push("/home");
      } else {
        // set the error
        return console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <section className="vh-100 bg-image login">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ "border-radius": "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  <Form
                    className="form"
                    name="nest-messages"
                    onFinish={onSubmit}
                  >
                    <label className="form-label" for="form3Example1cg">
                      Your Name
                    </label>
                    <Form.Item
                      name="name"
                      className="form-outline mb-4"
                      rules={[
                        {
                          message: "Name is required",
                          required: true,
                        },
                      ]}
                    >
                      <Input className="form-control form-control-lg" />
                    </Form.Item>
                    <label className="form-label" for="form3Example3cg">
                      Your Email
                    </label>
                    <Form.Item
                      name="email"
                      id="email"
                      className="form-outline mb-4"
                      // label="Name"
                      rules={[
                        {
                          message: "Email is required",
                          required: true,
                        },
                        {
                          type: "email",
                          message: "Please enter valid email",
                        },
                      ]}
                    >
                      <Input className="form-control form-control-lg" />
                    </Form.Item>
                    <label className="form-label" for="form3Example4cg">
                      Password
                    </label>
                    <Form.Item
                      className="form-outline mb-2"
                      name="password"
                      rules={[
                        {
                          message: "Password is required",
                          required: true,
                        },
                        {
                          pattern: new RegExp(
                            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                          ),
                          message:
                            "Password must contain atleast 6 characters, including UPPPER/lowercase, numbers and special characters",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password className="form-control-lg" />
                    </Form.Item>
                    <label className="form-label" for="form3Example4cg">
                      Confirm password
                    </label>
                    <Form.Item
                      className="form-outline mb-2"
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          message: "Confirm password is required",
                          required: true,
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Password and Confirm password do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                      hasFeedback
                    >
                      <Input.Password className="form-control-lg" />
                    </Form.Item>
                    <Form.Item
                      className="form-check d-flex justify-content-center mb-5"
                      name="agreement"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Should accept agreement")
                                ),
                        },
                      ]}
                    >
                      <Checkbox className="me-2">
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item className="d-flex justify-content-center">
                      <Button
                        className="btn  btn-dark btn-block btn-lg gradient-custom-4 text-body"
                        htmlType="submit"
                        loading={loading}
                      >
                        Register
                      </Button>
                    </Form.Item>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link href="/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
