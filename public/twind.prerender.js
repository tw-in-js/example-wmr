import { setup } from 'twind'

// twind/server has currently only a CJS bundle
// which available as the default export
import twind from 'twind/server'

import twindConfig from './twind.config'

const { asyncVirtualSheet, getStyleTagProperties } = twind

const sheet = asyncVirtualSheet()

setup({ ...twindConfig, sheet })

export { sheet, getStyleTagProperties }
