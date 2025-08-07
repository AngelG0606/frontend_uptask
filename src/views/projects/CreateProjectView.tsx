import { Link } from "react-router-dom";

export default function CreateProjectView() {
  return (
    <>
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto </p>


        <nav className="my-10">
            <Link className="bg-purple-400 hover:bg-purple-500 py-3 px-10 text-white text-xl cursor-pointer font-bold text-center transition-colors"
            to={'/'}
            >Volver a Proyectos</Link>
        </nav>
    </>
  )
}
