import prerender from 'preact-iso/prerender'

import { setup } from 'twind'
import { asyncVirtualSheet, shim, getStyleTagProperties } from 'twind/server'

import twindConfig from './twind.config'

const sheet = asyncVirtualSheet()

setup({ ...twindConfig, sheet })

export default async (app, options = {}) => {
  sheet.reset()
  
  const result = await prerender(app)
  
  if (options.shim) {
    result.html = shim(result.html)
  }
  
  const { id, textContent } = getStyleTagProperties(sheet)
  
  result.html = `<style id="${id}">${textContent}</style>${result.html}`
  
  return result
}

