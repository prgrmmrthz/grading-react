import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/supplier";

export default function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [auth.isAuthenticated, history]);

  const onSubmit = async ({ user, pword }) => {
    setLoading(true);
    const a = { fn: `login('${user}','${pword}')` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert(JSON.stringify(err.error));
    });
    const {res,idX,nameX} = response["data"][0];
    if (res === 1) {

      const a = {
        user: nameX,
        id: idX,
        isAuthenticated: true,
      };
      setAuth(a);
      history.push("/dashboard");
      setLoading(false);
    }else{
      alert('Authentication Failed!');
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label className="small mb-1">User</label>
                    <input
                      className="form-control py-4"
                      type="text"
                      placeholder="Enter User"
                      name="user"
                      autoComplete="username"
                      {...register("user", { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label className="small mb-1">Password</label>
                    <input
                      className="form-control py-4"
                      id="inputPassword"
                      type="password"
                      name="pword"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      {...register("pword", { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}
                  </div>
                  <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                    <a className="small" href="password.html">
                      Forgot Password?
                    </a>
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      {loading ? "  Loading..." : "  Submit"}
                    </Button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <button>Need an account? Sign up!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
