
export const EXP_SAMPLE = [
    {x:0,y:100},
    {x:60,y:90},
    {x:120,y:80},
    {x:180,y:72},
    {x:240,y:65},
    {x:300,y:58},
];

const createSumsObject = (points) => {

    let sums = {};

    sums.Sn = points.length;

    sums.Sy = points.reduce((sum,point) => {
        return sum + point.y
    },0);

    sums.Sx = points.reduce((sum,point) => {
        return sum + point.x
    }, 0);

    sums.Slny = points.reduce((sum,point) => {
       return sum + Math.log(point.y)
    },0);

    sums.Sx2 = points.reduce((sum,point) => {
        return sum + (point.x * point.x)
    }, 0);

    sums.Sxlny = points.reduce((sum,point) => {
        return sum + (point.x * Math.log(point.y))
    }, 0);

    return sums;
};

/**
 * Equation should have following data in order:
 * value next to x,
 * value next to y,
 * free expression
 *
 * @param equation1 [3]
 * @param equation2 [3]
 */
export const solve = (equation1, equation2) => {


    if(equation1[0]*equation2[0] < 0 ){
        equation1 = equation1.map(value => value * -1)
    }

    const x1 = equation1[0];
    const x2 = equation2[0];

    const y2 = equation2[1];

    const free2 = equation2[2];

    const ratio = x1/x2 >= 1 ? x1/x2 : x2/x1;

    if(x1/x2 >= 1){
        equation2 =  equation2.map(value => value * ratio);
    } else {
        equation1 = equation1.map(value => value * ratio)
    }

    let helperExp = [equation1[1] - equation2[1], equation1[2] - equation2[2] ];
    const Y = helperExp[1]/helperExp[0];
    const X = ((free2-(y2*Y))/x2);
    return {
        X,
        Y,
    };

};

export const createExp = (points) => {

    const sums = createSumsObject(points);
    const result = solve([sums.Sn,sums.Sx,sums.Slny],[sums.Sx,sums.Sx2, sums.Sxlny]);

    const expResult = {
        b: result.Y,
        a: Math.exp(result.X),
    };

    return (x) => {
        return expResult.a * Math.exp(expResult.b * x);
    }

};


