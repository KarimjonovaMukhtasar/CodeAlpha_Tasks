import { z } from "zod"

export const validateBoardName = z.object({
    title: z.string({ invalid_type_error: `Board Title must be string!` }).min(2, `Too short Board Title`).max(40, `TOO long to name`)
})