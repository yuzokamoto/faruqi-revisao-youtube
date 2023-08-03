import z from "zod"

export interface CreateVideoInputDTO {
  id: string
  creatorId: string
  title: string
  thumbnailImgUrl: string
  videoUrl: string
}

export type CreateVideoOutputDTO = undefined

export const CreateVideoSchema = z.object({
  id: z.string().min(1),
  creatorId: z.string().min(1),
  title: z.string().min(1),
  thumbnailImgUrl: z.string().url(),
  videoUrl: z.string().url()
}).transform((data) => data as CreateVideoInputDTO)
