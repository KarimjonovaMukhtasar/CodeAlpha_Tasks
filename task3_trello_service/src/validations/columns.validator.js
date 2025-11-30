import { z } from "zod"

export const validateColumn = z.object({
    name: z.string({ invalid_type_error: `COLUMN NAME must be string!` }).min(2, `Too short COLUMN NAME`).max(40, `TOO LONG to name`),
    board_id: z
        .string({ invalid_type_error: "BOARD ID must be a string!" })
        .uuid({ message: "BOARD ID must be a valid UUID!" })

})

export const validateColumnUpdate = z.object({
    name: z.string({ invalid_type_error: `COLUMN NAME must be string!` }).min(2, `Too short COLUMN NAME`).max(40, `TOO LONG to name`)
})