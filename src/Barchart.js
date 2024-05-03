class BarChart {
    constructor(svgContainer, data) {
        this.svgContainer = svgContainer;
        this.data = data;
        this.margin = { top: 50, right: 30, bottom: 70, left: 60 }; 
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.mainJobs = ["Data Scientist", "Data Engineer", "Machine Learning Engineer", "Data Analyst"];
        this.colorScale = d3.scaleOrdinal()
            .domain(["Entry-level", "Mid-level", "Senior", "Executive"])
            .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]); 
    }

    preprocessData() {
        const filteredData = this.data.filter(d => this.mainJobs.includes(d.job_title));
        const averages = [];

        this.mainJobs.forEach(job => {
            ["Entry-level", "Mid-level", "Senior", "Executive"].forEach(level => {
                const relevantData = filteredData.filter(d => d.job_title === job && d.experience_level === level);
                const sumSalary = relevantData.reduce((acc, cur) => acc + parseFloat(cur.salary_in_usd), 0);
                const count = relevantData.length;
                const avgSalary = count > 0 ? sumSalary / count : 0;
                if (avgSalary > 0) {
                    averages.push({ job_title: job, experience_level: level, average_salary: avgSalary });
                }
            });
        });

        return averages;
    }

    draw() {
        const processedData = this.preprocessData();
        d3.select(this.svgContainer).selectAll("*").remove();

        const svg = d3.select(this.svgContainer)
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        const x0 = d3.scaleBand()
            .range([0, this.width])
            .domain(this.mainJobs)
            .paddingInner(0.1);

        const x1 = d3.scaleBand()
            .domain(["Entry-level", "Mid-level", "Senior", "Executive"])
            .range([0, x0.bandwidth()])
            .padding(0.05);

        const y = d3.scaleLinear()
            .domain([0, d3.max(processedData, d => d.average_salary)])
            .range([this.height, 0]);

        svg.append('g')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(x0));

        svg.append('g')
            .call(d3.axisLeft(y));

        this.mainJobs.forEach(job => {
            const group = svg.append("g")
                .attr("transform", `translate(${x0(job)}, 0)`);

            group.selectAll(".bar")
                .data(processedData.filter(d => d.job_title === job))
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x1(d.experience_level))
                .attr("y", d => y(d.average_salary))
                .attr("width", x1.bandwidth())
                .attr("height", d => this.height - y(d.average_salary))
                .attr("fill", d => this.colorScale(d.experience_level));
        });

        //Legend to represent experience level colors
        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(this.colorScale.domain().slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend.append("rect")
            .attr("x", this.width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", this.colorScale);

        legend.append("text")
            .attr("x", this.width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);

        // Add Chart Title
        svg.append("text")
            .attr("x", this.width / 2)
            .attr("y", -20) 
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .text("Annual Salary for Job Type Based on Experience");
    }
}
//const myChart = new BarChart("#svgContainer", yourDataArray);
//myChart.draw();
