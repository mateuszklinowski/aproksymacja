export const LOG_SAMPLE = [
    {x:1,y:0.03},
    {x:2,y:0.3},
    {x:3,y:0.45},
    {x:4,y:0.6},
    {x:5,y:0.7},
    {x:6,y:0.8},
];

const createSumsObject = (points) => {

    let sums = {};

    sums.Sy = points.reduce((sum,point) => {
        return sum + point.y
    },0);

    sums.Slnx = points.reduce((sum,point) => {
        return sum + (Math.log(point.x))
    }, 0);

    sums.Slnx2 = points.reduce((sum,point) => {
        return sum + (Math.log(point.x)*Math.log(point.x))
    }, 0);

    sums.Sylnx = points.reduce((sum,point) => {
        return sum + (point.y*Math.log(point.x))
    }, 0);

    return sums;
};

const getA = (n, wyznacznik, sumsObject) => {
    return ((((n * sumsObject.Sylnx) - (sumsObject.Slnx * sumsObject.Sy)))/wyznacznik);
};

const getB = (n, wyznacznik, sumsObject) => {
    return  ((((sumsObject.Slnx2 * sumsObject.Sy) - (sumsObject.Slnx * sumsObject.Sylnx)))/wyznacznik);
};

const getW = (n, sumsObject) => {
    return (n*sumsObject.Slnx2) - (sumsObject.Slnx*sumsObject.Slnx)
};

export const createLog = (points) => {

    const sumsObject = createSumsObject(points);
    const n = points.length + 1;
    const W = getW(n, sumsObject);
    const a = getA(n, W, sumsObject);
    const b = getB(n, W, sumsObject);


    return (x) => {
        return ((a*Math.log(x))+b)
    }
};
