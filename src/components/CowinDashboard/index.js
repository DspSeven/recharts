// Write your code here
// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const covConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: covConstants.initial,
    days: [],
    age: [],
    gender: [],
  }

  componentDidMount() {
    this.getCovDetails()
  }

  getCovDetails = async () => {
    this.setState({apiStatus: covConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(vaccinationDataApiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const lastSevenDaysVaccination = data.last_7_days_vaccination.map(
        sevenDays => ({
          vaccineDate: sevenDays.vaccine_date,
          dose1: sevenDays.dose_1,
          dose2: sevenDays.dose_2,
        }),
      )
      const vaccinationByAge = data.vaccination_by_age.map(age => ({
        age: age.age,
        count: age.count,
      }))
      const vaccinationByGender = data.vaccination_by_gender.map(gender => ({
        count: gender.count,
        gender: gender.gender,
      }))
      this.setState({
        apiStatus: covConstants.success,
        days: lastSevenDaysVaccination,
        age: vaccinationByAge,
        gender: vaccinationByGender,
      })
    } else {
      this.setState({apiStatus: covConstants.failure})
    }
  }

  // success view
  renderThreeCharts = () => {
    const {days, age, gender} = this.state
    return (
      <div>
        <VaccinationCoverage days={days} />
        <VaccinationByGender gender={gender} />
        <VaccinationByAge age={age} />
      </div>
    )
  }

  // renderLoader
  renderLoader = () => {
    console.log('loader')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  // failure view
  failureView = () => {
    console.log('failure')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1>Something went wrong</h1>
      </div>
    )
  }

  startSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case covConstants.success:
        return this.renderThreeCharts()
      case covConstants.failure:
        return this.failureView()
      case covConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderCowin = () => {
    console.log('cov-19')
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p>Co-WIN</p>
        </div>
        <h1>CoWIN vaccination in india</h1>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderCowin()}
        {this.startSwitch()}
      </div>
    )
  }
}
export default CowinDashboard
