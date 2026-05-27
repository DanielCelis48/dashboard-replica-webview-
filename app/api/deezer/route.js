export async function GET(req) {

  try {

    const { searchParams } =
      new URL(req.url)

    const q =
      searchParams.get("q")

    const type =
      searchParams.get("type")

    let url = ""

    if (type === "chart") {

      url =
        "https://api.deezer.com/chart"

    } else {

      url =
        `https://api.deezer.com/search?q=${encodeURIComponent(q)}`

    }

    const response =
      await fetch(url)

    const data =
      await response.json()

    return Response.json(data)

  } catch (error) {

    console.log(error)

    return Response.json(
      {
        error: "Error obteniendo datos"
      },
      {
        status: 500
      }
    )

  }

}