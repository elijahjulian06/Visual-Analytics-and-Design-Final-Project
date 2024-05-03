class LineGraph {


    constructor(con, data, root, color) {
 
 
            this.con = con;
 
 
            const margin = { top: 20, right: 20, bottom: 50, left: 50 };
            const width = 900- margin.left - margin.right;
            const height = 650 - margin.top - margin.bottom;
 
 
            const domain = ["2020", "2021", "2022", "2023"];
 
 
            const div = root.append('div')
                .style('width', '100%')
                .style('height', '100%');
 
 
     
            const svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
 
            const data2 = [
                { year: "2020", salary: 0},
                { year: "2021", salary: 0},
                { year: "2022", salary: 0} ,
                { year: "2023", salary: 500000}
            ];
 
 
            const xScale = d3.scaleBand()
                .domain(data2.map(d => d.year))
                .range([0, width])
                .paddingInner(0.98);
                
             const yScale = d3.scaleLinear()
                .domain([0, d3.max(data2, d => d.salary)])
                .range([height, 0]);
 
 
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);
 
 
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);
             svg.append("g")
                .attr("class", "y-axis")
                .call(yAxis);
                
             svg.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
                .style("text-anchor", "middle")
                .text("Year");

             svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Salary");
        
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
 
 
            const lines = svg.selectAll(".line")
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
           
            }
 }
 