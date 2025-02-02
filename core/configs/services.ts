// # sample
const services: Readonly<Record<NodeJS.ProcessEnv["NODE_ENV"], string>> = Object.freeze({
  development: "https://api.escuelajs.co/api",
  production: "https://api.escuelajs.co/api",
  test: "https://api.escuelajs.co/api",
})

export default services[process.env.NODE_ENV || "development"]