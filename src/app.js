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
    this.togBtn.addEventListener("click", () => {
      if (!mshow) {
        this.mlist.classList.remove("left-[-50vw]");
        this.mlist.classList.add("left-[0vw]");
        mshow = true;
      } else {
        this.mlist.classList.remove("left-[0vw]");
        this.mlist.classList.add("left-[-50vw]");
        mshow = false;
      }
    });
    this.histBtn.addEventListener("click", () => {
      if (!histShow) {
        this.hist.classList.replace("hidden", "block");
        histShow = true;
      } else {
        this.hist.classList.replace("block", "hidden");
        histShow = false;
      }
    });
  }
}
let interface = new Interface();
interface.setEvents();
