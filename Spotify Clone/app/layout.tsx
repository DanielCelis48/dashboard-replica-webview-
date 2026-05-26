import "./globals.css"
import Link from "next/link"

export default function RootLayout({
children
}:{
children:React.ReactNode
}){

return(

<html lang="es">

<body>

<div className="layout">

<aside className="sidebar">

<h1 className="logo">

Spotify

</h1>

<nav>

<Link href="/home">

🏠 Inicio

</Link>

<Link href="/favorites">

❤️ Favoritos

</Link>

<Link href="/user">

👤 Perfil

</Link>

</nav>

</aside>

<main className="contenido">

{children}

</main>

</div>

</body>

</html>

)

}