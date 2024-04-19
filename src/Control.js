class Control {
    constructor(data) {

        const mapBar = d3.select('#map-container');
        this.LineGraph = new LineGraph(this, data, mapBar);
    }

    Test(str) {
        console.log(str);
    }

    Opt() {

    }
}