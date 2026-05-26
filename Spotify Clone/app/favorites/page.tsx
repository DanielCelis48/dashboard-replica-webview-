"use client"

import {
useEffect,
useState
}
from "react"

import {
supabase
}
from "@/lib/supabaseClient"

export default function Favoritos(){

const[
favoritos,
setFavoritos
]=useState<any[]>([])

useEffect(()=>{

cargar()

},[])

async function cargar(){

const{

data:{
user

}

}=await

supabase

.auth

.getUser()

if(!user){

return

}

const{

data

}=await

supabase

.from(
"canciones"
)

.select("*")

.eq(
"usuario_id",
user.id
)

.eq(
"favorito",
true
)

setFavoritos(
data||[]
)

}

return(

<div
className="
min-h-screen
bg-black
text-white
p-8
"
>

<h1
className="
text-5xl
font-black
text-green-500
mb-8
"
>

Tus favoritos

</h1>

<div
className="
grid
grid-cols-2
md:grid-cols-4
gap-5
"
>

{

favoritos.map(

(f:any)=>(

<div

key={
f.id
}

className="
bg-zinc-900
rounded-xl
p-4
hover:bg-zinc-800
transition
"

>

<img

src={
f.imagen
}

alt=""

className="
rounded-lg
mb-4
"

/>

<h2
className="
font-bold
"
>

{

f.titulo

}

</h2>

<p
className="
text-zinc-400
"
>

{

f.artista

}

</p>

</div>

)

)

}

</div>

</div>

)

}