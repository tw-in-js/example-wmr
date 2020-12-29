import hydrate from 'preact-iso/hydrate'
import { LocationProvider, Router } from 'preact-iso/router'
import { ErrorBoundary } from 'preact-iso/lazy'

import { setup } from 'twind'
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
  const { default: prerender } = await import('preact-iso/prerender')

  const { sheet, getStyleTagProperties } = await import('./twind.prerender')

  sheet.reset()

  const result = await prerender(<App {...data} />)

  const { id, textContent } = getStyleTagProperties(sheet)

  result.html = `<style id="${id}">${textContent}</style>${result.html}`

  return result
}
