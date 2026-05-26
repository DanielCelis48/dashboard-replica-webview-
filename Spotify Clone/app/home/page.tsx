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

interface Cancion{

title:string

preview:string

artist:{

name:string

}

album:{

title:string

cover_medium:string

}

}

export default function Home(){

const[
buscar,
setBuscar
]=useState("")

const[
canciones,
setCanciones
]=useState<Cancion[]>([])

const[
msg,
setMsg
]=useState("")

const[
favoritos,
setFavoritos
]=useState<string[]>([])

useEffect(()=>{

inicio()

cargarFavoritos()

},[])

async function cargarFavoritos(){

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

.select(
"titulo"
)

.eq(
"usuario_id",
user.id
)

.eq(
"favorito",
true
)

setFavoritos(

data?.map(

x=>

x.titulo

)||[]

)

}

async function inicio(){

const r=

await fetch(

"https://corsproxy.io/?https://api.deezer.com/chart"

)

const d=

await r.json()

setCanciones(

d.tracks?.data||

[]

)

}

async function buscarCanciones(){

if(!buscar){

inicio()

return

}

const r=

await fetch(

`https://corsproxy.io/?https://api.deezer.com/search?q=${buscar}`

)

const d=

await r.json()

setCanciones(

d.data||

[]

)

}

async function favorito(

c:Cancion

){

const{

data:{
user

}

}=await

supabase

.auth

.getUser()

if(!user){

setMsg(

"Inicia sesión"

)

return

}

if(

favoritos.includes(

c.title

)

){

setMsg(

"Ya está ❤️"

)

return

}

const{

error

}=await

supabase

.from(
"canciones"
)

.insert({

usuario_id:
user.id,

titulo:
c.title,

artista:
c.artist.name,

album:
c.album.title,

imagen:
c.album.cover_medium,

preview:
c.preview,

favorito:true

})

if(error){

setMsg(

error.message

)

return

}

setFavoritos(

prev=>

[

...prev,

c.title

]

)

setMsg(

"Agregado favoritos ❤️"

)

}

return(

<div>

<h1
style={{

fontSize:"42px",

fontWeight:"900",

marginBottom:"25px"

}}
>

Buenas noches

</h1>

<div
style={{

display:"flex",

gap:"10px",

marginBottom:"20px"

}}
>

<input

placeholder=

"¿Qué quieres escuchar?"

value={

buscar

}

onChange={

e=>

setBuscar(

e.target.value

)

}

/>

<button

className=

"botonSpotify"

style={{

width:"140px"

}}

onClick={

buscarCanciones

}

>

Buscar

</button>

</div>

{

msg&&(

<div
style={{

marginBottom:"20px",

background:"#1DB954",

padding:"12px",

borderRadius:"12px",

fontWeight:"700"

}}
>

{

msg

}

</div>

)

}

<div
className="gridSpotify"
>

{

canciones.map(

(c,i)=>(

<div

key={i}

className="card"

>

<img

src={

c.album.cover_medium

}

/>

<div
className="titulo"
>

{

c.title

}

</div>

<div
className="artista"
>

{

c.artist.name

}

</div>

<audio

controls

src={

c.preview

}

/>

<button

onClick={

()=>

favorito(c)

}

className=

"botonSpotify"

style={{

background:

favoritos.includes(

c.title

)

?

"#16a34a"

:

undefined

}}

>

{

favoritos.includes(

c.title

)

?

"❤️ Guardado"

:

"🤍 Favorito"

}

</button>

</div>

)

)

}

</div>

</div>

)

}