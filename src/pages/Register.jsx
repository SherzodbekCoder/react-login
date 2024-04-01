import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const username = useRef('');
  const email = useRef('');
  const password = useRef('');

  function validate() {
    return true;
  }

  function handleRegister(e) {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      setLoading(true);
      fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if (data.message === "User registered successfully!") {
          navigate('/login');
        }

        if (data.message === "Failed! Email is already in use!") {
          alert(data.message);
          email.current.focus()
        }

        if (data.message === "Failed! Username is already in use!") {
          alert(data.message);
          username.current.focus();
        }

        email.current.value = ''; 
        password.current.value = ''; 
        username.current.value = '';
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    }
  }

  return (
    <div>
      <h1 className="text-center fs-4 mt-5">Register page</h1>
      <form className="w-50 mx-auto d-flex flex-column gap-4" onSubmit={handleRegister}>
        <input ref={username} type="text" className="form-control" placeholder="Enter username" />
        <input ref={email} type="email" className="form-control" placeholder="Enter email" />
        <input ref={password} type="password" className="form-control" placeholder="Enter password" />
        <button disabled={loading} className="btn btn-success w-10">{loading ? "Loading.." : "Register"}</button>
        <Link to='/login'>Login</Link>
      </form>
    </div>
  )
}

export default Register;
