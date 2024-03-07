// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    // lastSevenDaysCoverage: [],
    // vaccinationByAgeCount: [],
    // vaccinationByGenderCount: [],
    vaccinationData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    const data = await response.json()
    if (response.ok) {
      const vaccinationData = data
      //   console.log(vaccinationData)
      this.setState({vaccinationData, apiStatus: apiStatusConstants.success})
      //   const lastSevenDaysCoverage = data.last_7_days_vaccination.map(
      //     eachItem => ({
      //       doseOne: eachItem.dose_1,
      //       doseTwo: eachItem.dose_2,
      //       vaccineDate: eachItem.vaccine_date,
      //     }),
      //   )
      //   const vaccinationByAgeCount = data.vaccination_by_age
      //   const vaccinationByGenderCount = data.vaccination_by_gender
      //   this.setState({
      //     lastSevenDaysCoverage,
      //     vaccinationByAgeCount,
      //     vaccinationByGenderCount,
      //     apiStatus: apiStatusConstants.success,
      //   })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      //   lastSevenDaysCoverage,
      //   vaccinationByGenderCount,
      //   vaccinationByAgeCount,
      vaccinationData,
    } = this.state
    return (
      <>
        <VaccinationCoverage
          lastSevenDaysCoverage={vaccinationData.last_7_days_vaccination}
        />
        <VaccinationByGender
          vaccinationByGenderCount={vaccinationData.vaccination_by_gender}
        />
        <VaccinationByAge
          vaccinationByAgeCount={vaccinationData.vaccination_by_age}
        />
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderCowinDashBoard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoaderView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1 className="description">CoWIN Vaccination in India</h1>
        {this.renderCowinDashBoard()}
      </div>
    )
  }
}

export default CowinDashboard
