import { useDispatch, useSelector } from "react-redux"
import { filterObj } from "../reducers/filterReducer"

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    dispatch(filterObj(e.target.value))
  }

  return (
    <div>
      filter <input onChange={handleChange} value={filter}/>
    </div>
  )
}
export default Filter