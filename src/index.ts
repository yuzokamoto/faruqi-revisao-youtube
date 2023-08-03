import express from "express"
import cors from "cors"
import { videoRouter } from "./router/videoRouter"
import { userRouter } from "./router/userRouter"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/users", userRouter)
app.use("/videos", videoRouter)
