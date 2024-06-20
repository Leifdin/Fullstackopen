const Header = (props) => {
  return(
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}

const Part = ({partName, exercisesCount}) => {


  return(
    <p>{partName} has {exercisesCount} exercises</p>
  )
}

const Content = (props) => {
  return(
    <div>
    {props.course.parts.map((coursePart) => {
      console.log('Rendering ', coursePart.name, coursePart.exercises)
      return (
        <Part key={coursePart.id} partName={coursePart.name} exercisesCount={coursePart.exercises} />
      )
    }
    )}
    </div>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((accumulator, currentValue) => {
    console.log('Accumulator: ', accumulator, 'currentValue: ', currentValue.exercises)
    return (accumulator + currentValue.exercises)
  }, 0)
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course course={course} />)}
    </div>
  )
}

export default App
