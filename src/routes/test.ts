import protectedRoute from "@/middlewares/better-auth";

const testRoute = protectedRoute.get("/test", ({ user }) => {
  return user
}, {
  auth: true
}).get("/err", () => {
  throw new Error('Test Error')
})

export default testRoute
