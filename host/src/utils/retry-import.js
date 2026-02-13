export async function retryImport(
  fn,
  retries = 3,
  delay = 1000
) {
  try {
    return await fn()
  } catch (err) {
    if (retries <= 0) throw err
    await new Promise((resolve) => setTimeout(resolve, delay))
    console.warn(`[Loader] Retry loading module... Attempts left: ${retries - 1}`)
    return retryImport(fn, retries - 1, delay)
  }
}
