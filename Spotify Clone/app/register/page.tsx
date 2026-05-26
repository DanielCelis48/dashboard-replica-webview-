"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      // 1. Crear usuario en Auth
      const {
        data: authData,
        error: authError
      } = await supabase.auth.signUp({
        email: correo,
        password: password,
      });

      if (authError) {
        setMensaje("❌ " + authError.message);
        console.log(authError);
        return;
      }

      // 2. Obtener ID generado por Supabase
      const userId = authData.user?.id;

      if (!userId) {
        setMensaje("❌ No se obtuvo ID");
        return;
      }

      // 3. Guardar en tabla usuarios
      const {
        error: insertError
      } = await supabase
      .from("usuarios")
      .insert([
        {
          id: userId,
          nombre: nombre,
          correo: correo,
          foto: ""
        }
      ]);

      if(insertError){
        setMensaje("❌ "+insertError.message);
        console.log(insertError);
        return;
      }

      setMensaje(
        "✅ Cuenta creada correctamente"
      );

    } catch(error){

      console.log(error);

      setMensaje(
        "❌ Error de conexión"
      );

    }

  };

  return (

    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">

      <h1 className="text-2xl font-bold mb-5 text-center">

        Crear Cuenta

      </h1>

      <form
      onSubmit={handleRegister}
      className="flex flex-col gap-3">

        <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e)=>setNombre(e.target.value)}
        className="border p-2 rounded"
        required
        />

        <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e)=>setCorreo(e.target.value)}
        className="border p-2 rounded"
        required
        />

        <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 rounded"
        required
        />

        <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded">

          Registrarse

        </button>

      </form>

      {mensaje && (

        <p className="mt-4 text-center">

          {mensaje}

        </p>

      )}

    </div>

  );
}