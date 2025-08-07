import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos  </p>


      <nav className="my-10">
        <Link className="bg-purple-400 hover:bg-purple-500 py-3 px-10 text-white text-xl cursor-pointer font-bold text-center transition-colors"
          to={'/projects/create'}
        >Nuevo Proyecto</Link>
      </nav>
    </>
  )
}
