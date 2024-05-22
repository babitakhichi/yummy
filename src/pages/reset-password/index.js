import Link from "next/link";
import React from "react";

function VerifyCode() {
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
                    Reset New Password
                  </h2>
                  <p className="text-center text-muted mt-2 mb-4">
                    Please enter your new password
                  </p>
                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form3Example4cg">
                        New Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form3Example4cdg">
                        Confirm Password
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn  btn-dark btn-block btn-lg   gradient-custom-4 text-body"
                      >
                        Reset
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

export default VerifyCode;
