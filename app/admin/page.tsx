"use client"

import{
useEffect,
useState
}
from"react"

import{
supabase
}
from"@/lib/supabaseClient"

export default function Admin(){

const[
usuarios,
setUsuarios
]=useState<any[]>([])

const[
canciones,
setCanciones
]=useState<any[]>([])

useEffect(()=>{

cargar()

},[])

async function cargar(){

const{

data:u

}=await

supabase

.from(
"usuarios"
)

.select()

const{

data:c

}=await

supabase

.from(
"canciones"
)

.select()

setUsuarios(
u||[]
)

setCanciones(
c||[]
)

}

return(

<div>

<h1>

Admin Spotify

</h1>

<h2>

Usuarios

</h2>

{

usuarios.map(

u=>(

<div
key={
u.id
}
>

{

u.nombre

}

</div>

)

)

}

<h2>

Canciones favoritas

</h2>

{

canciones.map(

c=>(

<div
key={
c.id
}
>

{

c.titulo

}

-

{

c.artista

}

</div>

)

)

}

</div>

)

}