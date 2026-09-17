import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: '#050505',
          color: '#fff'
        }}>
          <div>
            <h1 style={{ marginBottom: '1rem' }}>Wales Wrap</h1>
            <p style={{ color: '#888' }}>Recarga la página o usa otro navegador</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
