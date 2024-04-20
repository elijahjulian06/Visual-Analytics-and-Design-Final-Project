class Control {
    constructor(csv1, csv2) {

        const mapBar = d3.select('#map-container');
        this.LineGraph = new LineGraph(this, csv2, mapBar);
    }

    Test(str) {
        console.log(str);
    }

    Opt() {

    }
}