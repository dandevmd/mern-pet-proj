import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

       

    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />Login
                    <p>Create an account</p>
                </h1>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                      
                        <input type="email" name="email" id="email" onChange={onChange} value={email} placeholder='Enter your Email' required />
                        <input type="password" name="password" id="password" onChange={onChange} value={password} placeholder='Enter your Password' required />
                       
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login