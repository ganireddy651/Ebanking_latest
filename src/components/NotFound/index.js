import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const NotFound = props => {
  const jwtToken = Cookies.get('jwt_token')
  const {history} = props
  //   if (jwtToken === undefined) {
  //     history.replace('/ebank/login')
  //   }
  return (
    <div className="notfound-container">
      <img
        className="notfound-image"
        src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png "
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  )
}

export default withRouter(NotFound)
