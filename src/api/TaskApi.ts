import { isAxiosError } from "axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "../types";
import api from "@/lib/axios";


export async function createTask({formData, projectId} :  {formData : TaskFormData , projectId : Project['_id']}) {
    try {
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({taskId, projectId} : {taskId : Task['_id'], projectId : Project['_id']}) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        const response = taskSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({projectId, taskId, formData} : {projectId : Project['_id'], taskId : Task['_id'], formData : TaskFormData}) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectId, taskId} : {projectId : Project['_id'], taskId : Task['_id']} ) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateStatus({projectId, taskId, status} : {projectId : Project['_id'], taskId : Task['_id'], status : Task['status']}){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, {status})
        return data
    } catch (error) {
        
    }
}
