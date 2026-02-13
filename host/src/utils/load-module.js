import { retryImport } from './retry-import'

export async function loadModule(fn) {
  const mfe =  await retryImport(fn)
  return mfe.default
}
