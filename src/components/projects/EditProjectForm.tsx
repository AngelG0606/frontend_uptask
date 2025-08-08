import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import type { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data : ProjectFormData
    projectId : Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {register, handleSubmit, formState: {errors} } = useForm<ProjectFormData>({defaultValues : {
        projectName : data.projectName,
        clientName : data.clientName,
        description : data.description,
    } })

    const { mutate } = useMutation({
        mutationFn : updateProject,
        onError : (error) => {
            toast.error(error.message)
        },
        onSuccess : (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey : ['projects']})
            queryClient.invalidateQueries({queryKey : ['editProject', projectId]})
            navigate('/')
        }
    })

    const handleForm = (formData : ProjectFormData) => {

        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto </p>


            <nav className="my-10">
                <Link className="bg-purple-400 hover:bg-purple-500 py-3 px-10 text-white text-xl cursor-pointer font-bold text-center transition-colors"
                to={'/'}
                >Volver a Proyectos</Link>
            </nav>

            <form
                className="mt-10 bg-white shadow-lg p-10 rounded-lg "
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm 
                    register={register}
                    errors={errors}
                />

                <input 
                    type="submit"
                    value={'Guardar Cambios'}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors" 
                />

            </form>

        </div>
    </>
  )
}
