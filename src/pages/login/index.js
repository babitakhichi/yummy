import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, InputNumber } from "antd";
import { login } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // redirect to home if already logged in
    if (user?._id) {
      router.push("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let bodyData = {
        email: values?.email,
        password: values?.password,
      };
      let response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(bodyData),
      });

      // get the data
      let res = await response.json();

      if (res.success) {
        // reset the fields
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(login(res.data));

        router.push("/home");
      } else {
        // set the error
        setLoading(false);
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
                  <h2 className="text-uppercase text-center mb-5">Login</h2>
                  <Form
                    className="form"
                    name="nest-messages"
                    onFinish={onSubmit}
                  >
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
                      className="form-outline mb-3"
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
                    <div className="form-check d-flex justify-content-center mb-3">
                      <p className="text-center text-muted ">
                        <Link
                          href="/forgot-password"
                          className="fw-bold text-body"
                        >
                          <u> Forgot password?</u>
                        </Link>
                      </p>
                    </div>
                    <Form.Item className="d-flex justify-content-center">
                      <Button
                        className="btn  btn-dark btn-block btn-lg gradient-custom-4 text-body"
                        htmlType="submit"
                        loading={loading}
                      >
                        Login
                      </Button>
                    </Form.Item>

                    <p className="text-center text-muted mt-4 mb-0">
                      Don&apos;t have an account?{" "}
                      <Link href="/sign-up" className="fw-bold text-body">
                        <u>Sign Up</u>
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

export default Login;
