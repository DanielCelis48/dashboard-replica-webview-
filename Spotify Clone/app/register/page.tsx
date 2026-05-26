"use client"

import {
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

export default function Register(){

const router=
useRouter()

const[
nombre,
setNombre
]=useState("")

const[
correo,
setCorreo
]=useState("")

const[
password,
setPassword
]=useState("")

const[
msg,
setMsg
]=useState("")

const[
loading,
setLoading
]=useState(false)

async function crearCuenta(

e:any

){

e.preventDefault()

setLoading(true)

setMsg("")

const{

data,
error

}=await

supabase

.auth

.signUp({

email:correo,

password

})

if(error){

setMsg(
error.message
)

setLoading(false)

return

}

if(!data.user){

setMsg(
"No se creó usuario"
)

setLoading(false)

return

}

const{

error:db

}=await

supabase

.from(
"usuarios"
)

.insert({

id:
data.user.id,

nombre,

correo,

foto:null

})

setLoading(false)

if(db){

setMsg(
db.message
)

return

}

setMsg(
"Cuenta creada"
)

setTimeout(

()=>{

router.push(
"/login"
)

},

1200

)

}

return(

<div
style={{

display:"flex",

justifyContent:"center",

alignItems:"center",

height:"100vh"

}}
>

<form

onSubmit={
crearCuenta
}

style={{

width:"400px",

background:"#181818",

padding:"35px",

borderRadius:"20px",

display:"flex",

flexDirection:"column",

gap:"15px",

boxShadow:

"0 0 30px rgba(0,0,0,.5)"

}}

>

<h1
style={{

fontSize:"40px",

color:"#1DB954",

textAlign:"center"

}}
>

Spotify

</h1>

<p
style={{

textAlign:"center",

color:"#aaa"

}}
>

Crear cuenta

</p>

<input

placeholder="Nombre"

value={nombre}

onChange={
e=>

setNombre(
e.target.value
)

}

/>

<input

placeholder="Correo"

value={correo}

onChange={
e=>

setCorreo(
e.target.value
)

}

/>

<input

type="password"

placeholder="Contraseña"

value={password}

onChange={
e=>

setPassword(
e.target.value
)

}

/>

<button

className=
"botonSpotify"

disabled={
loading
}

>

{

loading

?

"Creando..."

:

"Crear Cuenta"

}

</button>

<button

type="button"

className=
"botonSpotify"

style={{

background:"#282828"

}}

onClick={
()=>

router.push(
"/login"
)

}

>

Volver al Login

</button>

<p
style={{

textAlign:"center",

color:"#ff5555"

}}
>

{

msg

}

</p>

</form>

</div>

)

}