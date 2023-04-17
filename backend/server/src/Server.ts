import {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import {config} from "./config/index";
import * as controllers from "./controllers/index";

@Configuration({
    ...config,
    acceptMimes: ["application/json"],
    httpPort: process.env.PORT || 80,
    httpsPort: false, // CHANGE
    disableComponentsScan: true,
    jsonMapper: {
        additionalProperties: false,
        disableUnscureConstructor: false
    },
    mount: {
        "/": [
            ...Object.values(controllers)
        ]
    },
    middlewares: [
        "cors",
        "cookie-parser",
        "compression",
        "method-override",
        "json-parser",
        {use: "urlencoded-parser", options: {extended: true}}
    ],
    views: {
        root: join(process.cwd(), "../views"),
        extensions: {
            ejs: "ejs"
        }
    },
    exclude: [
        "**/*.spec.ts"
    ],
    ajv: {}
})
export class Server {
    @Inject()
    protected app: PlatformApplication;

    @Configuration()
    protected settings: Configuration;
}
