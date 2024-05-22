import Link from "next/link";
import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let bodyData = {
        email: email,
      };
      let response = await fetch("/api/forget-password", {
        method: "POST",
        body: JSON.stringify(bodyData),
      });

      // get the data
      let res = await response.json();

      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${email}`);
  };
  return (
    <section
      className="vh-100 bg-image"
      style={{
        "background-image": `url(
          "/assets/img/header-bg.jpg"
        )`,
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ "border-radius": "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-4">
                    Forgot Password?
                  </h2>
                  <p className="text-center text-muted mt-2 mb-4">
                    If you forgot your password, well, then we’ll email you
                    instructions to reset your password.
                  </p>
                  <form onSubmit={onSubmit}>
                    <div className="form-outline mb-2">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn  btn-dark btn-block btn-lg   gradient-custom-4 text-body"
                      >
                        Send
                      </button>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0">
                      <Link href="login" className="fw-bold text-body">
                        <u>Back to Sign In</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
