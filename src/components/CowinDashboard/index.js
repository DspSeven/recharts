// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'

const covidConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: covidConstants.initial,
    days: [],
    age: [],
    gender: [],
  }

  componentDidMount() {
    this.getCovidDetails()
  }

  getCovidDetails = async () => {
    this.setState({apiStatus: covidConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
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
        apiStatus: covidConstants.success,
        days: lastSevenDaysVaccination,
        age: vaccinationByAge,
        gender: vaccinationByGender,
      })
    }
  }

  // success view
  renderThreeCharts = () => {
    const {days} = this.state
    return (
      <div>
        <VaccinationCoverage days={days} />
      </div>
    )
  }

  // renderLoader
  renderLoader = () => {
    console.log('loader')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#000000" height={80} width={80} />
      </div>
    )
  }

  startSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case covidConstants.success:
        return this.renderThreeCharts()
      case covidConstants.failure:
        return this.failureView()
      case covidConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderCowin = () => {
    console.log('covid-19')
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p>Co-WIN</p>
        </div>
        <p>CoWIN vaccination in india</p>
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
