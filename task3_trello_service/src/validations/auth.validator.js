import { z } from "zod"

export const validateRegister = z.object({
    name: z.string({ invalid_type_error: `THE USERNAME MUST BE STRING!` })
        .min(2, `USER NAME MUST BE AT LEAST 2 CHARACTERS`)
        .max(40, `TOO LENGTHY NAME`),
    email: z.string({ invalid_type_error: `EMAIL MUST BE IN A STRING!` }).email(`INVALID EMAIL FORMAT!`),
    password: z.string({ invalid_type_error: `PASSWORD MUST BE IN STRING!` }).min(8, `PASSWORD MUST BE AT LEAST 8 CHARACTERS!`)
        .max(15, `PASSWORD MUST BE AT MOST 15 CHARACTERS!`)
})

export const validateLogin = z.object({
    email: z.string({ invalid_type_error: `EMAIL MUST BE IN A STRING!` }).email(`INVALID EMAIL FORMAT!`),
    password: z.string({ invalid_type_error: `PASSWORD MUST BE IN STRING!` }).min(8, `PASSWORD MUST BE AT LEAST 8 CHARACTERS!`)
        .max(15, `PASSWORD MUST BE AT MOST 15 CHARACTERS!`)
})