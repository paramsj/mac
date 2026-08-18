import { app } from "./app.js";
import dotenv from 'dotenv'

dotenv.config({
    path : ".env"
});

import { startScheduler } from "./services/scheduler.js";

startScheduler();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at PORT ${process.env.PORT}`);
})