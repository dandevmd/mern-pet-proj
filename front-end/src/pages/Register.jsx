import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData


    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if (isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, isLoading, message, dispatch, navigate])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }

    }

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Register
                    <p>Create an account</p>
                </h1>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" id="name" onChange={onChange} value={name} placeholder='Enter your Name' required />
                        <input type="email" name="email" id="email" onChange={onChange} value={email} placeholder='Enter your Email' required />
                        <input type="password" name="password" id="password" onChange={onChange} value={password} placeholder='Enter your Password' required />
                        <input type="password" name="password2" id="password2" onChange={onChange} value={password2} placeholder='Confirm your Password' required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register