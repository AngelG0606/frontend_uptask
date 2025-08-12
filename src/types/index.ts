import { z } from 'zod'

//Auth & Users
const authSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string(),
    password_confirmation : z.string(),
    token : z.string()
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' |'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth , 'email'>
export type ForgotPasswordForm = Pick<Auth , 'email'>
export type NewPasswordForm = Pick<Auth , 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>


//USERS
export const userSchema = authSchema.pick({
    name : true,
    email: true
}).extend({
    _id : z.string()
})
export type User = z.infer<typeof userSchema>

//notes
const noteSchema = z.object({
    _id : z.string(),
    content : z.string(),
    createdBy : userSchema,
    task : z.string(),
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

//Tasks

export const taskStautsSchema = z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export type TaskStatus =z.infer<typeof taskStautsSchema>

export const taskSchema = z.object({
    _id : z.string(),
    name : z.string(),
    description : z.string(),
    project : z.string(),
    status : taskStautsSchema,
    completedBy : z.array(z.object({
        _id : z.string(),
        user : userSchema,
        status : taskStautsSchema
    })),
    createdAt : z.string(),
    updatedAt : z.string(), 
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>


//Projects
export const projectSchema = z.object({
    _id: z.string(),
    projectName : z.string(),
    clientName : z.string(),
    description : z.string(),
    manager : userSchema.shape._id
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id : true,
        projectName : true,
        clientName : true,
        description : true,
        manager : true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

//team
export const teamMemberSchema = userSchema.pick({
    name : true,
    email: true,
    _id : true
})

export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>