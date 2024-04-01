import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const username = useRef('');
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
        password: password.current.value,
      }
      setLoading(true);
      fetch("https://auth-rg69.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {

        if (data.id) {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/')
        }

        if (data.message == "User not found.") {
          alert(data.message)
          username.current.focus();
        }

        if (data.message == "Invalid Password!") {
          alert(data.message)
          password.current.focus();
        }

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
      <h1 className="text-center fs-4 mt-5">Login page</h1>
      <form className="w-50 mx-auto d-flex flex-column gap-4" onSubmit={handleRegister}>
        <input ref={username} type="text" className="form-control" placeholder="Enter username" />
        <input ref={password} type="password" className="form-control" placeholder="Enter password" />
        <button disabled={loading} className="btn btn-success w-10">{loading ? "Loading.." : "Login"}</button>
        <Link to='/register'>Register</Link>
      </form>
    </div>
  )
}

export default Register;
