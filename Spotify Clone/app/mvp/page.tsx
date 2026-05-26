"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Juego {

id:string;

titulo:string;

descripcion:string;

tipo:string;

nota:number;

imagen:string;

curso_id:string;

}

interface Genero{

id:string;

nombre:string;

}

export default function MVPPage(){

const[
titulo,
setTitulo
]=useState("")

const[
descripcion,
setDescripcion
]=useState("")

const[
tipo,
setTipo
]=useState("Jugando")

const[
nota,
setNota
]=useState("5")

const[
imagen,
setImagen
]=useState("")

const[
curso,
setCurso
]=useState("")

const[
generos,
setGeneros
]=useState<Genero[]>([])

const[
juegos,
setJuegos
]=useState<Juego[]>([])

const[
mensaje,
setMensaje
]=useState("")

useEffect(()=>{

cargarGeneros()

cargarJuegos()

},[])

async function cargarGeneros(){

const{
data,
error
}=await supabase

.from("cursos")

.select("*")

.order(
"nombre"
)

if(error){

console.log(error)

return

}

setGeneros(
data||[]
)

}

async function cargarJuegos(){

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
"actividades"
)

.select("*")

.eq(
"estudiante_id",
user.id
)

.order(
"creado_en",
{
ascending:false
}
)

setJuegos(
data||[]
)

}

async function guardarJuego(
e:any
){

e.preventDefault()

const{

data:{
user

}

}=await

supabase
.auth
.getUser()

if(!user){

setMensaje(
"Inicia sesión"
)

return

}

const{
error

}=await

supabase

.from(
"actividades"
)

.insert({

titulo,

descripcion,

tipo,

nota:
parseFloat(
nota
),

imagen,

curso_id:
curso,

estudiante_id:
user.id

})

if(error){

setMensaje(
error.message
)

return

}

setMensaje(
"Juego agregado"
)

setTitulo("")

setDescripcion("")

setImagen("")

setCurso("")

cargarJuegos()

}

return(

<div
className="
max-w-xl
mx-auto
p-5
"
>

<h1
className="
text-3xl
font-bold
mb-5
"
>

Mi Biblioteca Gamer

</h1>

<form

onSubmit={
guardarJuego
}

className="
flex
flex-col
gap-3
"

>

<input

placeholder=
"Nombre juego"

value=
{titulo}

onChange={
e=>

setTitulo(
e.target.value
)

}

className="
border
p-2
"

/>

<textarea

placeholder=
"Opinión"

value=
{descripcion}

onChange={
e=>

setDescripcion(
e.target.value
)

}

className="
border
p-2
"

/>

<select

value=
{tipo}

onChange={
e=>

setTipo(
e.target.value
)

}

className="
border
p-2
"

>

<option>

Jugando

</option>

<option>

Completado

</option>

<option>

Pendiente

</option>

<option>

Abandonado

</option>

</select>

<select

value=
{curso}

onChange={
e=>

setCurso(
e.target.value
)

}

className="
border
p-2
"

>

<option>

Genero

</option>

{

generos.map(

g=>(

<option

key={
g.id
}

value={
g.id
}

>

{

g.nombre

}

</option>

)

)

}

</select>

<input

type="number"

min="0"

max="5"

step="0.1"

value=
{nota}

onChange={
e=>

setNota(
e.target.value
)

}

className="
border
p-2
"

/>

<input

placeholder=
"URL imagen"

value=
{imagen}

onChange={
e=>

setImagen(
e.target.value
)

}

className="
border
p-2
"

/>

<button

className="
bg-blue-500
text-white
p-2
rounded
"

>

Guardar Juego

</button>

</form>

<p>

{mensaje}

</p>

<div
className="
mt-6
space-y-3
"
>

{

juegos.map(

j=>(

<div

key={
j.id
}

className="
border
p-3
rounded
"

>

<h2>

{j.titulo}

</h2>

<p>

{j.descripcion}

</p>

<p>

Estado:

{j.tipo}

</p>

<p>

⭐

{j.nota}

</p>

{

j.imagen&&(

<img

src={
j.imagen
}

alt=""
className="
w-40
mt-2
"

/>

)

}

</div>

)

)

}

</div>

</div>

)

}