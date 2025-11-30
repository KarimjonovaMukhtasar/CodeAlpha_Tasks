import { z } from "zod"

export const validateTaskInfo = z.object({
    title: z.string({ invalid_type_error: `Task Title must be string!` }).min(2, `Too short TASk Title`),
    task_order: z.number({ invalid_type_error: `TASK ORDER MUST BE A NUMBER` }),
    task_description: z.string({ invalid_type_error: `DESCRRIPTION MUST BE STRING!` }),
     board_id: z
        .string({ invalid_type_error: "BOARD ID must be a string!" })
        .uuid({ message: "BOARD ID must be a valid UUID!" }),
    user_id: z
        .string({ invalid_type_error: "USER ID must be a string!" })
        .uuid({ message: "USER ID must be a valid UUID!" }),
    column_id: z
        .string({ invalid_type_error: "COLUMN ID must be a string!" })
        .uuid({ message: "COLUMN ID must be a valid UUID!" })
})

export const validateTaskUpdate = z.object({
    title: z.string({ invalid_type_error: `Task Title must be string!` }).min(2, `Too short TASk Title`).optional(),
    task_order: z.number({ invalid_type_error: `TASK ORDER MUST BE A NUMBER` }).optional(),
    task_description: z.string({ invalid_type_error: `DESCRRIPTION MUST BE STRING!` }).optional()
})