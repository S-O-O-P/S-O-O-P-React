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
    return { hasError: true };
  }

  componentDidMount() {
    this.setupAxiosInterceptors();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.resetError();
    }
  }

  setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
      response => {
        if (
          response.data.results && response.data.results.honeypot === null
        ) {
          if (!this.state.hasError) {
            this.setState({ hasError: true, errorStatus: 404 });
          }
        }
        return response;
      },
      error => {
        if (error.response) {
          const status = error.response.status;
          if (!this.state.hasError) {
            this.setState({ hasError: true, errorStatus: status });
          }
        }
        return Promise.reject(error);
      }
    );
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    if (!this.state.hasError) {
      let errorStatus = 500;
      if (
        error.message.includes("Not found") || 
        error.message.includes("Cannot read properties of undefined") ||
        error.message.includes("null")
      ) {
        errorStatus = 404;
      } else if (error.message.includes("Bad request")) {
        errorStatus = 400;
      } else if (error.message.includes("Forbidden")) {
        errorStatus = 403;
      }

      this.setState({ hasError: true, errorStatus });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, errorStatus: null });
  }

  render() {
    if (this.state.hasError) {
      const { errorStatus } = this.state;
      switch (errorStatus) {
        case 404:
          return <Error404 resetError={this.resetError} />;
        case 500:
          return <Error500 resetError={this.resetError} />;
        case 400:
          return <Error400 resetError={this.resetError} />;
        case 403:
          return <Error403 resetError={this.resetError} />;
        default:
          return <Error500 resetError={this.resetError} />;
      }
    }

    const { location } = this.props;

    // Check if `location.state` is null or invalid for specific routes
    if (location.pathname.startsWith('/cultureinfo/detail/')) {
      if (!location.state || !location.state.earlyCheck) {
        return <Error404 />;
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
