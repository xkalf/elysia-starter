import Elysia from "elysia";
import testRoute from "./test";

const router = new Elysia({
  prefix: '/api'
}).get('', () => {
  return {
    message: "Hello World!"
  }
}).use(testRoute)
export default router
