import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createNewTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


const NewTicket = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { isError, isLoading, isSuccess, message } = useSelector(state => state.tickets)
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [description, setDescription] = useState(user.description)
  const [product, setProduct] = useState('iPhone')

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/tickets')
      toast.success('Ticket was created')
    }
    dispatch(reset())

  }, [dispatch, navigate, isError, isSuccess, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createNewTicket({product, description}))
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
    <BackButton url='/'/>
      <section className="heading">
        <h1>Create a ticker</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className="form-group">
          <label htmlFor="name">Costumer Name</label>
          <input type="text" className='form-control' value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Costumer Email</label>
          <input type="email" className='form-control' value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select name="product" id="product" value={product} onChange={e => setProduct(e.target.value)} >
              <option value="iPhone">iPhone</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
              <option value="Macbook">Macbook</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              id="description"
              className='form-control'
              placeholder='Description'
              style={{ resize: 'none' }}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket