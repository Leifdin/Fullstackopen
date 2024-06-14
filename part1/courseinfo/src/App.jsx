const Header = (props) => {
  return(
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log("Rendering ", props.partName, props.exercisesCount)
  return(
    <p>{props.partName} has {props.exercisesCount} exercises</p>
  )
}

const Content = (props) => {
  return(
    <div>
    {props.course.parts.map((coursePart) => (
      <Part key={coursePart.name} partName={coursePart.name} exercisesCount={coursePart.exercises} />
    ))}
    </div>
    /*I didn't have to use iteration for this component, however, it felt right to do so. So I did. I also wanted to try map() function*/
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.course.parts[0].exercises + props.course.parts[0].exercises + props.course.parts[0].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
