import 'reflect-metadata'

const port = 3000

import { App } from "./app";

new App().server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})