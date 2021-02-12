/** @param {import('wmr').Options} config */
export default async function (config) {
  if (config.mode === 'build') {
    const { default: json } = await import('@rollup/plugin-json')
    config.plugins.push(json())
  }
}
