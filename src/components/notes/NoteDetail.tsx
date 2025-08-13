import { deleteNote } from "@/api/noteApi"
import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"



type NoteDetailProps = {
    note : Note
}

export default function NoteDetail({note} : NoteDetailProps) {

    const {data, isLoading} = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
    const params = useParams()
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const queryCLient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn : deleteNote,
        onError : (error) => {
            toast.error(error.message)
        },
        onSuccess : (data) => {
            toast.success(data)
            queryCLient.invalidateQueries({queryKey : ['task', taskId]})
        }
    })

    if(isLoading) return <p>Cargando...</p>

  return (
    <div className="p-3 flex justify-between items-center">
        <div>
            <p>
             {note.content} por: {''}<span className="text-sm font-bold">{note.createdBy.name}</span>
            </p>
            <p className="text-slate-400 text-xs">
                {formatDate(note.createdAt)}
            </p>
        </div>

        {canDelete && (
            <button 
                className="text-red-600 hover:bg-red-100 text-center px-6 py-2 cursor-pointer border border-red-600 transition-colors font-bold"
                type="button"
                onClick={() => mutate({projectId, taskId, noteId : note._id}) }
            >
                Eliminar
            </button>
        )}
    </div>
  )
}
