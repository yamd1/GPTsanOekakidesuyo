import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import cluster from "cluster";
import {Server} from "./Server";

async function bootstrap() {
    const processes = process.argv[2] !== undefined ? parseInt(process.argv[2], 10) : 4;

    try {

        if (cluster.isPrimary) {
            // メインプロセス
            for (let i = 0; i < processes; i++) {
                const subProcess = cluster.fork();
                console.log(`fork process, pid: ${process.pid}, subPid: ${subProcess.process.pid}`);
            }
        } else {
            // サブプロセス
            const platform = await PlatformExpress.bootstrap(Server);
            await platform.listen();

            console.log(`sub-process, pid: ${process.pid}`)

            process.on("SIGINT", () => {
                platform.stop();
            });
        }

    } catch (error) {
        $log.error({event: "SERVER_BOOTSTRAP_ERROR", message: error.message, stack: error.stack});
    }
}

bootstrap();
