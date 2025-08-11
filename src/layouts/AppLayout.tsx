import { Link, Navigate, Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from "@/hooks/useAuth";


export default function AppLayout() {

    const { data, isLoading, isError } = useAuth()

    if(isError) {
        return <Navigate to={'/auth/login'} />
    }

    if(isLoading) return <p className="text-5xl text-gray-500 text-center">Cargando...</p>

 if(data) return (
    <>
        <header className="bg-gray-800 py-5">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-64">
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>

                <NavMenu name={data.name}/>
            </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet />
        </section>

        <footer className="py-5">
            <p className="text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
        </footer>

        <ToastContainer 
            position="top-center"
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
        
    </>
  )
}
