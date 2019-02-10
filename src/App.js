import React, {Component} from 'react';

import {createApproximationFunction} from "./approximation.helper";

import './App.css';
import {PointInput} from "./components/pointInput/point-input.component";
import {LINEAR_SAMPLE} from "./approximations/linear";
import {LOG_SAMPLE} from "./approximations/log";
import {EXP_SAMPLE} from "./approximations/exp";

window.d3 = require('d3');
const functionPlot = require('function-plot');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            points: LINEAR_SAMPLE,
            type: 'linear'
        }
    }

    onTypeChange= ({target:{ value }}) => {

        let points = LINEAR_SAMPLE;
        if(value === 'log'){
            points = LOG_SAMPLE
        } else if (value === 'exp'){
            points = EXP_SAMPLE
        }

        this.setState({
            type: value,
            points: points
        })
    };

    onXChange = (x, index) => {
        let newPoints = this.state.points;
        newPoints[index].x = Number(x);
        this.setState({
            points: newPoints
        })
    };

    onYChange = (y, index) => {
        let newPoints = this.state.points;
        newPoints[index].y = Number(y);
        this.setState({
            points: newPoints
        })
    };

    addPoint = () => {
        this.setState({
            points: this.state.points.concat([{}])
        })
    };

    resetPoints = () => {
        this.setState({
            points: [],
        })
    };

    validData(){
        if(this.state.points.length <= 1){
            this.setState({
                error:'Podaj minimum 2 węzły'
            });
            return false;
        }
        else {
            this.state.points.forEach(point=>{
                if(point.x === undefined || point.y === undefined){
                    this.setState({
                        error:'Brakujace dane!'
                    });
                    return  false;
                }
            });
            return true;
        }
    }

    createApproximation = () => {
        if(!this.validData()){
            return;
        }

        const approximationFunction = createApproximationFunction(this.state.points, this.state.type);
        this.setState({
            approximationFunction: approximationFunction,
        });

        const xPoints = this.state.points.map(point=> point.x);
        const yPoints = this.state.points.map(point=> point.y);

        const xMin = parseFloat(xPoints.reduce((prev,curr)=>{
            return prev < curr ? prev : curr
        },xPoints[0]));
        const xMax = parseFloat(xPoints.reduce((prev,curr)=>{
            return prev > curr ? prev : curr
        },xPoints[0]));
        const yMin = parseFloat(yPoints.reduce((prev,curr)=>{
            return prev < curr ? prev : curr
        },yPoints[0]));
        const yMax = parseFloat(yPoints.reduce((prev,curr)=>{
            return prev > curr ? prev : curr
        },yPoints[0]));

        const getPoints = () => this.state.points.map(point=>[point.x,point.y]);

        functionPlot({
            target: '#chart',
            xAxis: {domain: [xMin-0.1, xMax+0.1]},
            yAxis: {domain: [yMin-0.1, yMax+0.1]},
            data: [{
                graphType: 'polyline',
                fn: function (scope) {
                    return approximationFunction(scope.x);
                }
            },
                {
                    points: getPoints(),
                    fnType: 'points',
                    graphType: 'scatter'
                }]
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Aproksymacja, M.Klinowski
                    </p>
                </header>
                <div className="points-wrapper">
                    <p>Podaj wezły:</p>
                    {this.state.points.map((point, index) => {
                        return <PointInput key={index} value={point} onXChange={this.onXChange} onYChange={this.onYChange}
                                           index={index}/>
                    })}
                    <br/>
                    <button onClick={this.addPoint}>dodaj</button>
                    <br/>
                    <button onClick={this.resetPoints}>zresetuj</button>
                    <br/>
                    <button onClick={this.createApproximation}>Oblicz</button>
                    <br/>
                    <span className='error'>
                         {this.state.error ? this.state.error : ''}
                    </span>
                </div>
                <br/>
                <div>
                    <div>
                        <label for="linear">Aproksymacja liniowa</label>
                        <input checked={this.state.type === 'linear'} id="linear" type="radio" name="type" value="linear" onChange={(e)=>this.onTypeChange(e)}/>
                    </div>
                    <br/>
                    <div>
                        <label for="log">Aproksymacja logarywmiczna</label>
                        <input checked={this.state.type === 'log'} id="log"  type="radio" name="type" value="log" onChange={(e)=>this.onTypeChange(e)}/>
                    </div>
                    <br/>
                    <div>
                        <label for="exp">Aproksymacja exp</label>
                        <input checked={this.state.type === 'exp'} id="exp" type="radio" name="type" value="exp" onChange={(e)=>this.onTypeChange(e)}/>
                    </div>
                </div>
                <div>
                    <h2>Wykres funkcji F(x):</h2>
                    <div id="chart">

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
