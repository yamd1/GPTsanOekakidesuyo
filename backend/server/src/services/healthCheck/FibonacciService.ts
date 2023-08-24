import {Injectable, ProviderType, Service} from "@tsed/di"
import {IFibonacciService} from "./interface/IFibonacciService"

@Injectable({type: ProviderType.PROVIDER})
export class FibonacciService implements IFibonacciService {

    /**
     * マルチプロセス検証用
     */
    public getResult(n: number): {[key: string]: number} {
        const result = this.fib(n)
        return {result}
    }

    /**
     * フィボナッチ数列を計算する
     */
    private fib(n: number): number {
        if (n === 0) {
            return 0
        } else if (n === 1) {
            return 1
        } else {
            return this.fib(n - 1) + this.fib(n - 2)
        }
    }
}
