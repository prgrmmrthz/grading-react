import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom';
import {
    Button
  } from "react-bootstrap";
import { useEffect } from "react";

export default function Login({history}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const auth=JSON.parse(localStorage.getItem('auth'));
    if(auth.isAuthenticated){
      history.push("/dashboard")
    }
  }, [])

  const onSubmit = ({user}) => {
      const a = {
          user,
          id: 1,
          isAuthenticated: true
      }
    localStorage.setItem('auth', JSON.stringify(a));
  }

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
                    <label className="small mb-1">
                      User
                    </label>
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
                    <label className="small mb-1" for="inputPassword">
                      Password
                    </label>
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
                    <Button type="submit" className="btn btn-primary">
                      Login
                    </Button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <a href="#">Need an account? Sign up!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
