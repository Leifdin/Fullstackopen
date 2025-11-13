import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/useField"

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField()
  const { reset: resetAuthor, ...author } = useField()
  const { reset: resetInfo, ...info } = useField()

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/anecdotes')
  }
  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <input type='reset' value='Reset' />
      </form>
    </div>
  )

}
export default CreateNew