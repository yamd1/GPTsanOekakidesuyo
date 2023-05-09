import {Controller, Inject, Service} from "@tsed/di";
import {PathParams} from "@tsed/platform-params";
import {Get} from "@tsed/schema";
import {IFibonacciService} from "../services/healthCheck/interface/IFibonacciService";

@Controller('/')
@Service()
export class HealthCheck {

    @Inject()
    private fibonacciService: IFibonacciService

    @Get('/')
    async healthCheck(): Promise<string> {
        return "OK"
    }

    /**
     * マルチプロセス検証用エンドポイント
     */
    @Get('/fibonacci/:n')
    async fibonacci(@PathParams("n", Number) n: number): Promise<{[key: string]: number}> {
        return this.fibonacciService.getResult(n)
    }
}

