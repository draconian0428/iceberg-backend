import { app } from "./app";
import endpoint from './config/config';

app.listen(endpoint.PORT, () => {
    console.log(`listening on port ${endpoint.PORT}!`)});
