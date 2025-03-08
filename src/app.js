class Interface {
  constructor() {
    this.togBtn = document.getElementById("togBtn");
    this.mlist = document.getElementById("mlist");
    this.hist = document.getElementById("hist");
    this.histBtn = document.getElementById("histBtn");
  }
  setEvents() {
    let mshow = false;
    let histShow = false;
    this.togBtn.addEventListener("click", (event) => {
      if (!mshow) {
        this.mlist.classList.remove("left-[-50vw]");
        this.mlist.classList.add("left-[0vw]");
        
        mshow = true;
      } else {
        this.mlist.classList.remove("left-[0vw]");
        this.mlist.classList.add("left-[-50vw]");
        mshow = false;
      }
      event.stopPropagation();
    });
    this.histBtn.addEventListener("click", (event) => {
      if (!histShow) {
        this.hist.classList.replace("hidden", "block");
        this.histBtn.textContent = "Close";
        histShow = true;
      } else {
        this.hist.classList.replace("block", "hidden");
        this.histBtn.textContent = "History";
        histShow = false;
      } event.stopPropagation();
    });
    window.addEventListener("click", (event) => {
      event.stopPropagation();
      if (histShow) {
        this.hist.classList.replace("block", "hidden");
        this.histBtn.textContent = "History";
        histShow = false;
      }
      if (mshow) {
        this.mlist.classList.replace("left-[0vw]", "left-[-50vw]")
        mshow = false;
      }
    })
  }
}
class State {
  constructor(ui) {
    this.ui = ui;
    this.input = document.querySelector("input");
    this.preData = document.getElementById("preData");
    this.btns = document.querySelectorAll(".st-btn");
    this.preValue = "";
    this.preSelection = 1;
  }
  start() {
    this.input.addEventListener("input",event => {

    })
  }
  validater () {

  }
  praser() {

  }
  evaluator () {
    
  }
}
let interface = new Interface();
interface.setEvents();
