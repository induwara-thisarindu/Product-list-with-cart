import { Component, ReactNode } from "react"

type Props = { children: ReactNode }
type State = { hasError: boolean }

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in the cart sidebar.</h2>
    }
    return this.props.children
  }
}

export default ErrorBoundary