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
      <Part partName={props.partName1} exercisesCount={props.exercisesCount1} />
      <Part partName={props.partName2} exercisesCount={props.exercisesCount2} />
      <Part partName={props.partName3} exercisesCount={props.exercisesCount3} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises: {props.exercisesTotal}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course} />
      <Content partName1={part1} exercisesCount1={exercises1} partName2={part2} exercisesCount2={exercises2} partName3={part3} exercisesCount3={exercises3} />
      <Total exercisesTotal={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
