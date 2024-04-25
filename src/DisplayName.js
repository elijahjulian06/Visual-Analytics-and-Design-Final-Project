class DisplayName {
    constructor(con, root) {
        this.con = con;

        //https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
       
        this.displayBox = document.createElement('div');
        this.displayBox.setAttribute('class', 'display-box');

        root.node().appendChild(this.displayBox);
    }

    updateText(job_title) {

            this.displayBox.textContent = job_title;

    }
}



