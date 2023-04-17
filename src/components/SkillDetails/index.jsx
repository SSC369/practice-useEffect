import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const SkillDetails = props => {
  const [skillDetails, addSkillDetails] = useState({})
  const [apiResponse, addResponse] = useState('')

  const fetchSkillDetails = async () => {
    addResponse('LOADING')
    const {match} = props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    if (response.ok) {
      addResponse('SUCCESS')
      const data = await response.json()
      const details = data.course_details
      const formattedData = {
        id: details.id,
        name: details.name,
        description: details.description,
        url: details.image_url,
      }
      addSkillDetails(formattedData)
    } else {
      addResponse('FAILURE')
    }
  }

  useEffect(() => {
    fetchSkillDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderSuccessView = () => {
    const {url, name, description} = skillDetails
    return (
      <>
        <div className="skill-details-container">
          <img src={url} alt={name} />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </>
    )
  }

  const renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={() => fetchSkillDetails()}>
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
      <div className="skill-details-container">{renderData()}</div>
    </>
  )
}

export default SkillDetails
