export default async function handler(req, res) {
  try {
    const { q } = req.query;

    const response = await fetch(
      `https://api.deezer.com/search?q=${q}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error obteniendo datos de Deezer",
    });
  }
}