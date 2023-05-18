import {Controller, Inject, Service} from "@tsed/di";
import {PathParams} from "@tsed/platform-params";
import {Get} from "@tsed/schema";
import {FibonacciService} from "../services/healthCheck/FibonacciService";
import {IFibonacciService} from "../services/healthCheck/interface/IFibonacciService";

@Controller('/')
@Service()
export class HealthCheck {

    @Inject()
    private fibonacciService: FibonacciService

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

