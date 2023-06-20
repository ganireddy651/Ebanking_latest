import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class EbankLogIn extends Component {
  state = {
    userId: '',
    pin: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  onChangeUserID = event => {
    console.log(event.target.value)
    this.setState({userId: event.target.value})
  }

  onChangePIN = event => {
    console.log(event.target.value)
    this.setState({pin: event.target.value})
  }

  onSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureView = errorMessage => {
    this.setState({showErrorMessage: true, errorMessage})
  }

  onFormSubmit = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    console.log(userDetails)

    if (userId === '' && pin === '') {
      this.setState({showErrorMessage: true, errorMessage: 'Invalid User'})
    } else if (pin === '') {
      this.setState({showErrorMessage: true, errorMessage: 'Invalid Pin'})
    } else if (pin.length < 6) {
      this.setState({
        showErrorMessage: true,
        errorMessage: 'User ID and Pin did not match',
      })
    } else {
      const option = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch('https://apis.ccbp.in/ebank/login', option)
      const data = await response.json()

      if (response.ok === true) {
        this.onSuccessView(data.jwt_token)
      } else {
        this.onFailureView(data.error_msg)
      }
    }
  }

  render() {
    const {userId, pin, errorMessage, showErrorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            className="login-image"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form onSubmit={this.onFormSubmit} className="form-container">
            <h1 className="form-heading">Welcome Back</h1>
            <div className="input-container">
              <label className="label-text" htmlFor="userId">
                User ID
              </label>
              <br />
              <input
                onChange={this.onChangeUserID}
                value={userId}
                className="input-field"
                placeholder="Enter User ID"
                type="text"
                id="userId"
              />
            </div>
            <div className="input-container">
              <label className="label-text" htmlFor="password">
                PIN
              </label>
              <br />
              <input
                onChange={this.onChangePIN}
                value={pin}
                className="input-field"
                placeholder="Enter PIN"
                type="password"
                id="password"
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showErrorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default EbankLogIn
