const Header = (props) => {
  return(
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = ({partName, exercisesCount}) => {
  /*console.log('Rendering ', partName, exercisesCount)*/

  return(
    <p>{partName} has {exercisesCount} exercises</p>
  )
}

const Content = (props) => {
  return(
    <div>
    {props.course.parts.map((coursePart) => (
      <Part key={coursePart.id} partName={coursePart.name} exercisesCount={coursePart.exercises} />
    ))}
    </div>
    /*I didn't have to use iteration for this component, however, it felt right to do so. So I did. I also wanted to try map() function*/
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((accumulator, currentValue) => {
    /*console.log('Accumulator: ', accumulator, 'currentValue: ', currentValue.exercises)*/
    return (accumulator + currentValue.exercises)
  }, 10)
  return(
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'JavaScript Arrays',
        exercises: 5,
        id: 4
      }
    ]
  }
  return (
    <Course course={course} />
  )
}

export default App
