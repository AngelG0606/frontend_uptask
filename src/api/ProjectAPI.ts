import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, type ProjectFormData } from "@/types/index";


export async function createProject(formData : ProjectFormData) {
    try {
        const url = '/projects'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjects () {
    try {
        const url = '/projects'
        const { data }  = await api(url)
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}