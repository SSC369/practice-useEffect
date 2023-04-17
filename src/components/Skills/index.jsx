import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const Skills = () => {
  const [skills, addSkills] = useState([])
  const [apiResponse, addResponse] = useState('')

  const fetchData = async () => {
    addResponse('LOADING')
    const response = await fetch('https://apis.ccbp.in/te/courses')

    if (response.ok) {
      addResponse('SUCCESS')
      const data = await response.json()
      const formattedData = data.courses.map(item => ({
        id: item.id,
        logo: item.logo_url,
        name: item.name,
      }))

      addSkills(formattedData)
    } else {
      addResponse('FAILURE')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderSuccessView = () => (
    <ul className="places-list-container">
      {skills.map(skill => (
        <li key={skill.id}>
          <Link to={`/courses/${skill.id}`} className="nav-link">
            <img src={skill.logo} alt={skill.name} />
            <p>{skill.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  )

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={() => fetchData()}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
    </div>
  )

  const renderData = () => {
    switch (apiResponse) {
      case 'SUCCESS':
        return renderSuccessView()
      case 'FAILURE':
        return renderFailureView()
      default:
        return renderLoadingView()
    }
  }

  return (
    <>
      <Header />

      <div className="main-container">
        <h1>Courses</h1>
        {renderData()}
      </div>
    </>
  )
}

export default Skills
