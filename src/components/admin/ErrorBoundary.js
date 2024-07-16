import React, { Component } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Error404 from '../../pages/Error/Error404';
import Error500 from '../../pages/Error/Error500';
import Error400 from '../../pages/Error/Error400';
import Error403 from '../../pages/Error/Error403';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorStatus: null };
  }

  static getDerivedStateFromError(error) {
    let errorStatus = 500;
    if (error.message.includes("Not found")) errorStatus = 404;
    else if (error.message.includes("Bad request")) errorStatus = 400;
    else if (error.message.includes("Forbidden")) errorStatus = 403;

    return { hasError: true, errorStatus };
  }

  componentDidMount() {
    this.interceptor = axios.interceptors.response.use(
      response => {
        if (response.data.results && response.data.results.honeypot === null)  {
          this.setState({ hasError: true, errorStatus: 404 });
          this.props.navigate('/404');
        }
        return response;
      },
      error => {
        if (error.response) {
          const status = error.response.status;
          this.setState({ hasError: true, errorStatus: status });
          this.navigateToErrorPage(status);
        }
        return Promise.reject(error);
      }
    );
  }

  componentWillUnmount() {
    axios.interceptors.response.eject(this.interceptor);
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  navigateToErrorPage(status) {
    switch (status) {
      case 404:
        this.props.navigate('/404');
        break;
      case 500:
        this.props.navigate('/500');
        break;
      case 400:
        this.props.navigate('/400');
        break;
      case 403:
        this.props.navigate('/403');
        break;
      default:
        this.props.navigate('/500');
        break;
    }
  }

  render() {
    if (this.state.hasError) {
      const { errorStatus } = this.state;
      switch (errorStatus) {
        case 404:
          return <Error404 />;
        case 500:
          return <Error500 />;
        case 400:
          return <Error400 />;
        case 403:
          return <Error403 />;
        default:
          return <Error500 />;
      }
    }

    return this.props.children;
  }
}

const ErrorBoundaryWithNavigate = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return <ErrorBoundary {...props} navigate={navigate} location={location} />;
};

export default ErrorBoundaryWithNavigate;
