export const useField = ({ type }) => {
  const [val, setVal] = useState('')
  const onChange = (event) => {
    setVal(event.target.value)
  }
  return [type, val, onChange]
}