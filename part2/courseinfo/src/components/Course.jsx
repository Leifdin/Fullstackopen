const Header = (props) => {
  return(
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}

const Part = ({partName, exercisesCount}) => {

  return(
    <>
    {console.log('Rendering ', partName, exercisesCount)}
    <p>{partName} has {exercisesCount} exercises</p>
    </>
  )
}

const Content = (props) => {
  return(
    <div>
    {props.course.parts.map((coursePart) => <Part key={coursePart.id} partName={coursePart.name} exercisesCount={coursePart.exercises} />
    )}
    </div>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((accumulator, currentValue) => {
    /*console.log('Accumulator: ', accumulator, 'currentValue: ', currentValue.exercises)*/
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

export default Course
