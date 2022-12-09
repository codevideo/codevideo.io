// contextualized call to a netlify endpoint
export const netlifyPost = async <T = undefined, U = undefined>(
  endpoint: string,
  success: (model: T) => void,
  failed: (status: number) => void,
  data?: U
): Promise<void> => {
  try {
    const response = await fetch(`/.netlify/functions${endpoint}?SYSTEM_CONTEXT=${process.env.GATSBY_SYSTEM_CONTEXT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    // if not an ok response, see if it was because their token is expired
    if (!response.ok) {
      console.log("response", response)
      try {
        const json = await response.json()
        console.log(json)
      } catch (e) {
        console.log(e)
      }
      // otherwise generic error
      return failed(response.status)
    }

    const json: T = await response.json()
    return success(json)
  } catch (error) {
    console.log(error)
  }
}
