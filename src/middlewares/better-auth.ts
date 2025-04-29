import { auth } from "@/lib/auth";
import Elysia from "elysia";

const betterAuth = new Elysia({ name: 'betterAuth' }).mount(auth.handler).macro({
  auth: {
    async resolve({ error, request: { headers } }) {
      const session = await auth.api.getSession({ headers })

      if (!session) return error(401, "Нэвтэрж орно уу.")

      return {
        user: session.user,
        session: session.session
      }
    }
  }
})

const protectedRoute = new Elysia().use(betterAuth)

export default protectedRoute
