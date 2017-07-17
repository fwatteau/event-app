import {Choice} from "./choice";
import {Sale} from "./sale";
/**
 * Created by fwatt on 15/07/2017.
 */
export class Event {
    $key: string;
    id: number;
    name: string;
    date: number;
    choices: Choice[];
    sales: Sale[];
}
