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
      }
      event.stopPropagation();
    });
    window.addEventListener("click", (event) => {
      event.stopPropagation();
      if (histShow) {
        this.hist.classList.replace("block", "hidden");
        this.histBtn.textContent = "History";
        histShow = false;
      }
      if (mshow) {
        this.mlist.classList.replace("left-[0vw]", "left-[-50vw]");
        mshow = false;
      }
    });
  }
}
class State {
  constructor(ui) {
    this.ui = ui;
    this.input = document.querySelector("textarea");
    this.instCalculation = document.getElementById("preData");
    this.btns = Array.from(document.querySelectorAll(".st-btn"));
    this.hist = document.getElementById("histItems");
    this.dataValid = "123456789+-*×÷/0.()^%√";
    this.vldTouchBtns = "1234567890+-×÷.%^√";
    this.oper = "+-*×÷/^.";
    this.preValue = "";
    this.preSelection = 1;
  }
  start() {
    let result;
    this.touchBtnStart(this.btns);
    this.input.addEventListener("keypress", (event) => {
      this.preSelection = this.input.selectionEnd;
      if (event.key == "(") {
        this.preValue =
          this.preValue.slice(0, this.preSelection) +
          ")" +
          this.preValue.slice(this.preSelection, this.preValue.length);
        this.input.value = this.preValue;
        this.input.selectionEnd = this.preSelection;
      }
      if (event.key == "Enter") {
        this.updateHist(result);
        this.preValue = result
        this.input.value = result
      }
    });
    this.input.addEventListener("input", (event) => {
      this.preSelection = this.input.selectionEnd;
      [this.preValue, this.preSelection] = this.validater(
        this.preValue,
        this.preSelection,
      );
      result = this.praser()
      this.updateInstCal(result);
    });
  }

  touchBtnStart(btns) {
    for (let btn of btns) {
      btn.addEventListener("click", () => {
        this.input.focus();
        this.preSelection = this.input.selectionEnd;
        [this.preValue, this.preSelection] = this.touchInputValidater(
          this.preValue,
          this.preSelection,
          btn.textContent,
        );
        this.updateInstCal(this.praser())
      });
    }
  }
  touchInputValidater(pvalue, pselection, btnContent) {
    let value = this.input.value;
    let curntSelection = pselection;
    if (this.vldTouchBtns.includes(btnContent)) {
      value =
        value.slice(0, pselection) +
        btnContent +
        value.slice(pselection, value.length);
      curntSelection += 1;
    } else if (btnContent == "( )") {
      value =
        value.slice(0, pselection) +
        "()" +
        value.slice(pselection, value.length);
      curntSelection += 1;
    } else if (btnContent == "←" && pselection != 0) {
      value =
        value.slice(0, pselection - 1) + value.slice(pselection, value.length);
      curntSelection -= 1;
    } else if (btnContent == "AC") {
      value = "";
      curntSelection = 0;
    } else if (btnContent == "PI") {
      value =
        value.slice(0, pselection) +
        "3.14" +
        value.slice(pselection, value.length);
      curntSelection += 4;
    }
    this.input.value = value;
    this.input.selectionEnd = curntSelection;
    return this.opChecker(pvalue, curntSelection);
  }

  validater(pvalue, pselection) {
    let input = this.input;
    if (
      !this.dataValid.includes(input.value[input.selectionEnd - 1]) &&
      input.value.length !== 0 &&
      input.selectionEnd != 0
    ) {
      input.value = pvalue;
      input.selectionEnd = pselection - 1;
    }
    input.value = input.value.replace("*", "×");
    input.value = input.value.replace("/", "÷");
    return this.opChecker(pvalue, pselection);
  }

  opChecker(pvalue, pselection) {
    let input = this.input;
    if (
      this.oper.includes(input.value[input.selectionEnd - 2]) &&
      this.oper.includes(input.value[input.selectionEnd - 1])
    ) {
      input.value =
        pvalue.slice(0, input.selectionEnd - 2) +
        input.value[input.selectionEnd - 1] +
        pvalue.slice(input.selectionEnd - 1, pvalue.length);
      input.selectionEnd = pselection - 1;
    }
    if (
      this.oper.includes(input.value[input.selectionEnd - 3]) &&
      "()".includes(input.value[input.selectionEnd - 2]) &&
      "*/^.×÷".includes(input.value[input.selectionEnd - 1])
    ) {
      input.value = pvalue;
      input.selectionEnd = pselection - 1;
    }
    this.input.value = input.value;
    pvalue = input.value;
    return [pvalue, pselection];
  }

  praser() {
    let value = this.input.value;
    value = value.replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("^", "**")
    .replaceAll("%", "/100");
    console.log(value);
    try {
      let instResult = Number(eval(value));
      if (value.length == 0) {
        return "0";
      }
      if (instResult/Number(instResult.toFixed(0)) === 1) {
        return instResult;
      }
      return instResult.toFixed(3);
    } catch {
      return "?";
    }
  }
  updateInstCal(result) {
    this.instCalculation.textContent = "";
    this.instCalculation.textContent = ` = ${result}`;
  }
  updateHist(result) {
    let item = document.createElement("p");
    let value = document.createTextNode(`${this.preValue} = ${result} `);
    item.appendChild(value)
    this.hist.appendChild(item);
  }
}
let interface = new Interface();
interface.setEvents();
let state = new State(interface);

state.start();
