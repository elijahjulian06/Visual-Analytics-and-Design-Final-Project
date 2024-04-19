/** LineGraph.js
 * 
 * @description: This file graphs 
 * 
 * 
 * 
 */

const { listeners } = require("process");

class LineGraph{

    constructor(con, data, root) {
        
        this.con = con;
        this.data = data;
        this.root = root;

        var margin = {top: 30, right: 50, bottom: 10, left: 50},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const div = root.append('div')
            .style('width', '100%')
            .style('height', '100%');

        this.svg = div.append('svg');
  
        //define x and y
        //define line 
        //define lines
        //define domains for visual

    }

}