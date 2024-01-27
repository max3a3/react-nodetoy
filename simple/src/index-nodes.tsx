import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
// import App from './Basic'
import App from './ThreeNodesMaterial'
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
function AppWrapper() {
  return (<div>
    <div>only work with three 131</div>
    <div>delete parent folder node_modules if __THREE__ version didn't change</div>
    <React.StrictMode>
    <ErrorBoundary>
     <App/>
    </ErrorBoundary>
   </React.StrictMode>
  </div>)
}
ReactDOM.createRoot(document.getElementById('root')!).render(<AppWrapper />)
