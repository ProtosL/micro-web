import { lifeCycle } from "../lifeCycle";
import { isTurnChild } from "../utils";

export const turnApp = async () => {
    if (isTurnChild()) {
        await lifeCycle();
    }
}