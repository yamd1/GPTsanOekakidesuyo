import {Controller, Service} from "@tsed/di";
import {Get} from "@tsed/schema";

@Controller('/')
@Service()
export class HealthCheck {

    @Get('/')
    async healthCheck(): Promise<string> {
        return "OK"
    }
}
