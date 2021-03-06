
import {Service} from "ts-express-decorators";

@Service()
export default class MemoryStorage {

    private states: Map<string, string> = new Map<string, string>();

    constructor(){

    }

    /**
     * Return the value stored.
     * @param key
     */
    public get<T>(key: string):T {
        return JSON.parse(this.states.get(key));
    }
    /**
     * Serialize value and store it.
     * @param key
     * @param value
     */
    public set = (key: string, value: any) => this.states.set(key, JSON.stringify(value));
}
