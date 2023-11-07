import 'reflect-metadata'
import { App } from "./app";
import { AppEnvs } from './configs';

const port = AppEnvs.PORT || 3000

new App().server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})