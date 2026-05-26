"use client"

import {
useEffect,
useState
}
from "react"

import {
useRouter
}
from "next/navigation"

import {
supabase
}
from "@/lib/supabaseClient"

export default function User(){

const router=
useRouter()

const[
loading,
setLoading
]=useState(true)

const[
usuario,
setUsuario
]=useState<any>(null)

const[
favoritos,
setFavoritos
]=useState(0)

useEffect(()=>{

cargar()

},[])

async function cargar(){

setLoading(true)

const{

data:{
user

}

}=await

supabase

.auth

.getUser()

if(!user){

setLoading(false)

return

}

let{

data

}=await

supabase

.from(
"usuarios"
)

.select("*")

.eq(
"id",
user.id
)

.maybeSingle()

if(!data){

await

supabase

.from(
"usuarios"
)

.insert({

id:user.id,

nombre:

user.email?.split(
"@"
)[0]

||

"Usuario",

correo:

user.email,

foto:null

})

const nuevo=

await

supabase

.from(
"usuarios"
)

.select("*")

.eq(
"id",
user.id
)

.single()

data=
nuevo.data

}

setUsuario(
data
)

const{

count

}=await

supabase

.from(
"canciones"
)

.select(
"*",
{
count:"exact",
head:true
}
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
count||0
)

setLoading(false)

}

async function salir(){

await

supabase

.auth

.signOut()

router.push(
"/login"
)

}

if(loading){

return(

<div
style={{

padding:"50px",

fontSize:"22px"

}}
>

Cargando...

</div>

)

}

if(!usuario){

return(

<div
style={{

padding:"40px"

}}
>

<h1>

No has iniciado sesión

</h1>

<button

className=

"botonSpotify"

onClick={

()=>

router.push(
"/login"
)

}

>

Ir Login

</button>

</div>

)

}

return(

<div>

<h1
style={{

fontSize:"45px",

fontWeight:"900",

marginBottom:"25px"

}}
>

Tu Perfil

</h1>

<div
className="card"
style={{

maxWidth:"500px"

}}
>

<div
style={{

fontSize:"80px"

}}
>

🎵

</div>

<h2>

{

usuario.nombre

}

</h2>

<p>

{

usuario.correo

}

</p>

<p>

Favoritos:

{

favoritos

}

</p>

<button

className=

"botonSpotify"

style={{

marginTop:"20px"

}}

onClick={
salir
}

>

Cerrar sesión

</button>

</div>

</div>

)

}