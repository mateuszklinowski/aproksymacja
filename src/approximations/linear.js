export const LINEAR_SAMPLE = [
    {x:1,y:10},
    {x:2,y:18},
    {x:3,y:22},
    {x:4,y:27},
    {x:5,y:36},
    {x:6,y:49},
    {x:7,y:56},
    {x:8,y:64},
    {x:9,y:70},
    {x:10,y:78},
];

const createSumsObject = (points) => {

    let sums = {};

    sums.Sx = points.reduce((sum,point) => {
        return sum + point.x
    },0);

    sums.Sy = points.reduce((sum,point) => {
        return sum + point.y
    },0);

    sums.Sxy = points.reduce((sum, point) => {
        return sum + (point.x * point.y)
    },0);

    sums.Sx2 = points.reduce((sum,point) => {
        return sum + (point.x * point.x)
    }, 0);

    return sums;
};

const getW = (n, sumsObject) => {
    return (n*sumsObject.Sx2) - (sumsObject.Sx*sumsObject.Sx)
};

const getA = (n, wyznacznik, sumsObject) => {
    return ((((n * sumsObject.Sxy) - (sumsObject.Sx * sumsObject.Sy)))/wyznacznik)
};

const getB = (n, wyznacznik, sumsObject) => {
    return ((((sumsObject.Sx2 * sumsObject.Sy) - (sumsObject.Sx * sumsObject.Sxy)))/wyznacznik)
};

export const createLinear = (points) => {

    const sumsObject = createSumsObject(points);

    //console.log(solve([sumsObject.Sx2, sumsObject.Sx, sumsObject.Sxy],[sumsObject.Sx, points.length+1,sumsObject.Sy]));

    const n = points.length + 1;
    const W = getW(n, sumsObject);

    const a = getA(n, W, sumsObject);
    const b = getB(n, W, sumsObject);

    return (x) => {
        return ((a*x)+b)
    }
};
