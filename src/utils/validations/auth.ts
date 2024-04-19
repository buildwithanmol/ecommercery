import {z} from 'zod';

export const signup_schema = z.object({
    email: z.string().email().max(255),
    password: z.string().min(6).max(255),
    phone: z.string().min(10).max(255),
    name: z.string().min(3),
})

export const verification_schema = z.object({
    id: z.string().max(255),
    otp: z.number().lte(9999)
})

export const signin_schema = z.object({
    email: z.string().email().max(255),
    password: z.string().min(6).max(255)
})