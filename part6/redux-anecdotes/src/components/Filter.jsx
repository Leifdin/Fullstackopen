import { useDispatch, useSelector } from "react-redux"
import { set } from "../reducers/filterReducer"

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    dispatch(set(e.target.value))
  }

  return (
    <div>
      filter <input onChange={handleChange} value={filter}/>
    </div>
  )
}
export default Filter