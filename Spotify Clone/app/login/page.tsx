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

export default function Login(){

const router=
useRouter()

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

async function entrar(

e:any

){

e.preventDefault()

setLoading(true)

setMsg("")

const{

error

}=await

supabase

.auth

.signInWithPassword({

email:correo,

password

})

setLoading(false)

if(error){

setMsg(

error.message

)

return

}

router.push(

"/home"

)

router.refresh()

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

entrar

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

"0 0 30px rgba(0,0,0,.45)"

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

Inicia sesión

</p>

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

"Entrando..."

:

"Entrar"

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

"/register"

)

}

>

Crear cuenta

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