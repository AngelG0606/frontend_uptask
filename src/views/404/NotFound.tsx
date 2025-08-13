import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mt-10">
        <p className="text-white text-3xl">Pagina no Encontrada</p>
        <Link to={'/'} className="text-fuchsia-600 text-3xl mt-10 hover:underline">
            Volver a proyectos
        </Link>
    </div>
  )
}
