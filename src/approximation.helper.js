import {createLog} from "./approximations/log";
import {createLinear} from "./approximations/linear";
import {createExp} from "./approximations/exp";


export const createApproximationFunction = (points, functionType) => {

    if(functionType === 'linear' || !functionType){
        return createLinear(points)
    } else if (functionType === 'log'){
        return createLog(points)
    } else if(functionType === 'exp'){
        return createExp(points)
    }
};
