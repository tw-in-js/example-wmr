import hydrate from 'preact-iso/hydrate'
import { LocationProvider, Router } from 'preact-iso/router'
import { ErrorBoundary } from 'preact-iso/lazy'

import { setup } from 'twind/shim'
import twindConfig from './twind.config'

if (typeof window !== 'undefined') {
  setup(twindConfig)
}

import Home from './pages/home/index.js'
import NotFound from './pages/_404.js'

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Home path="/" />
          <NotFound default />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}

hydrate(<App />)

export async function prerender(data) {
  const { default: prerender } = await import('./prerender')

  return prerender(<App {...data} />, { shim: true })
}
