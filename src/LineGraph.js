class LineGraph {

    constructor(con, data, root, color) {
        this.con = con;

        const margin = { top: 20, right: 20, bottom: 50, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 800 - margin.top - margin.bottom;

        const domain = ["2020", "2021", "2022", "2023"]; 

        const div = root.append('div')
            .style('width', '100%')
            .style('height', '100%');

        this.svg = div.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')

    
            const x = d3.scalePoint()
                .range([0, width])
                .domain(domain);

            const y = {};

            domain.forEach(variable => {
                y[variable] = d3.scaleLinear()
                    .domain(d3.extent(data, d => +d[variable]))
                    .range([height, 0]); 
            });

            const line = d3.line()
                .x((d, i) => x(x.domain()[i])) 
                .y((d, i) => y[x.domain()[i]](d));

            const lines = this.svg.selectAll(".line")
                .data(data)
                .enter().append("path")
                .attr("class", function (d) {return d.job_title})
                .attr("d", d => line(Object.values(d).slice(0, 4)))
                .attr("fill", "none")
                .style("stroke", d => color(d['job_title']))
                .on("mouseover", function(d) {
                    const job_title = d3.select(this).attr("class");
                    setTimeout(() => {
                        con.Opt(job_title);
                    }, 10);
                })
                .on("mouseout", function(e) {
                    con.Opt(' ');
                });

            div.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height)
                .text("Salary Over Time For Computer Science jobs");

        }
        
        //need to add x and y labels to graph
    
}