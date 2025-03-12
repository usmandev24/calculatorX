class Interface {
  constructor() {
    this.html = document.querySelector("html");
    this.h1 = document.getElementById("h1");
    this.togBtn = document.getElementById("togBtn");
    this.mlist = document.getElementById("mlist");
    this.hist = document.getElementById("hist");
    this.histBtn = document.getElementById("histBtn");
    this.closeHistBtn = document.getElementById("closeHist")
    this.mBtnSci = document.getElementById("btnSci");
    this.mBtnStan = document.getElementById("btnStan");
    this.stanDiv = document.getElementById("stan");
    this.sciDiv = document.getElementById("sci");
    this.deg = document.getElementById("deg");
    this.allSciBtnsNode = document.querySelectorAll(".cSci");
    this.sciBtns = {
      default: ["sin", "cos", "tan", "csc", "sec", "cot", "ln", "log"],
      inv: ["sin⁻¹", "cos⁻¹", "tan⁻¹", "csc⁻¹", "sec⁻¹", "cot⁻¹", "ln", "log"],
      hyp: ["sinh", "cosh", "tanh", "csch", "sech", "coth", "ln", "log"],
      hypInv: [
        "sinh⁻¹",
        "cosh⁻¹",
        "tanh⁻¹",
        "csch⁻¹",
        "sech⁻¹",
        "coth⁻¹",
        "ln",
        "log",
      ],
      currnetType: "default",
    };
    this.hypBtn = document.getElementById("hyp");
    this.invBtn = document.getElementById("inv");
    this.themeBtn = document.getElementById("changeTheme")
    this.displaying = "sci";
    this.mshow = false;
    this.histShow = false;
  }
  setEvents() {
    this.mBtnSci.addEventListener("click", (event) => this.showSciDiv(event));
    this.mBtnStan.addEventListener("click", () => this.showStnDiv());
    this.togBtn.addEventListener("click", (event) => this.showHideManue(event));
    this.hist.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    this.histBtn.addEventListener("click", (event) => this.showHist(event));
    this.closeHistBtn.onclick = () => this.closeHist();
    this.hypBtn.addEventListener("click", () => this.hypSwitch());
    this.invBtn.addEventListener("click", () => this.invSwitch());
    window.addEventListener("click", (event) => this.hideSide(event));
    this.themeBtn.onclick = () => this.changeTheme();
  }
  changeTheme() {
    let curnt = this.html.getAttribute("data-theme"); console.log(curnt)
    if (curnt == "dark") {
      this.html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light")
      this.themeBtn.textContent = "🔆";
    } else {
      this.html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      this.themeBtn.textContent = "🌙";
    }
  }
  showStnDiv() {
    if (this.displaying == "sci") {
      this.sciDiv.classList.replace("grid", "hidden");
      this.stanDiv.classList.replace("hidden", "grid");
      this.deg.classList.replace("inline", "hidden");
      this.displaying = "stan";
      this.h1.textContent = "Standard";
      this.mBtnSci.classList.replace("bg-purple-400", "bg-gray-100")
      this.mBtnSci.classList.replace("dark:bg-purple-900", "dark:bg-[#090909]");
      this.mBtnStan.classList.replace("bg-gray-100", "bg-purple-400")
      this.mBtnStan.classList.replace("dark:bg-[#090909]", "dark:bg-purple-900");
      localStorage.setItem("scheme", "stan");
    }
  }
  showSciDiv() {
    if (this.displaying == "stan") {
      this.stanDiv.classList.replace("grid", "hidden");
      this.sciDiv.classList.replace("hidden", "grid");
      this.displaying = "sci";
      this.h1.textContent = "Scientific";
      this.deg.classList.replace("hidden", "inline");
      this.mBtnStan.classList.replace("bg-purple-400", "bg-gray-100");
      this.mBtnStan.classList.replace("dark:bg-purple-900", "dark:bg-[#090909]");
      this.mBtnSci.classList.replace("bg-gray-100", "bg-purple-400");
      this.mBtnSci.classList.replace("dark:bg-[#090909]", "dark:bg-purple-900");
      localStorage.setItem("scheme", "sci")
      
    }
  }
  showHideManue(event) {
    if (!this.mshow) {
      this.mlist.classList.remove("left-[-52vw]");
      this.mlist.classList.add("left-[0vw]");

      this.mshow = true;
    } else {
      this.mlist.classList.remove("left-[0vw]");
      this.mlist.classList.add("left-[-52vw]");
      this.mshow = false;
    }
    event.stopPropagation();
  }
  showHist(event) {
    if (!this.histShow) {
      this.hist.classList.replace("right-[-80vw]", "right-[0vw]");
      this.histBtn.textContent = "";
      this.histShow = true;
    } else {
      this.hist.classList.replace("right-[0vw]", "right-[-80vw]");
      this.histBtn.textContent = "History";
      this.histShow = false;
    }
    event.stopPropagation();
  }
  closeHist () {
    this.hist.classList.replace("right-[0vw]", "right-[-80vw]");
      this.histBtn.textContent = "History";
      this.histShow = false;
  }
  hideSide(event) {
    if (this.histShow) {
      this.hist.classList.replace("right-[0vw]", "right-[-80vw]");
      this.histBtn.textContent = "History";
      this.histShow = false;
    }
    if (this.mshow) {
      this.mlist.classList.replace("left-[0vw]", "left-[-50vw]");
      this.mshow = false;
    }
  }
  hypSwitch() {
    let sciBtns = this.sciBtns;
    let i = 0;
    if (sciBtns.currnetType == "default") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hyp[i];
        i += 1;
      }
      this.hypBtn.classList.replace("bg-gray-100", "bg-purple-500");
      this.hypBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "hyp";
    } else if (sciBtns.currnetType == "inv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hypInv[i];
        i += 1;
      }
      this.hypBtn.classList.replace("bg-gray-100", "bg-purple-500");
      this.hypBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "hypInv";
    } else if (sciBtns.currnetType == "hyp") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.default[i];
        i += 1;
      }
      this.hypBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.hypBtn.classList.replace("bg-purple-500", "bg-gray-100");
      sciBtns.currnetType = "default";
    } else if (sciBtns.currnetType == "hypInv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.inv[i];
        i += 1;
      }
      this.hypBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.hypBtn.classList.replace("bg-purple-500", "bg-gray-100");
      sciBtns.currnetType = "inv";
    }
  }
  invSwitch() {
    let sciBtns = this.sciBtns;
    let i = 0;
    if (sciBtns.currnetType == "default") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.inv[i];
        i += 1;
      }
      this.invBtn.classList.replace("bg-gray-100", "bg-purple-500");
      this.invBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "inv";
    } else if (sciBtns.currnetType == "hyp") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hypInv[i];
        i += 1;
      }
      this.invBtn.classList.replace("bg-gray-100", "bg-purple-500");
      this.invBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "hypInv";
    } else if (sciBtns.currnetType == "inv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.default[i];
        i += 1;
      }
      this.invBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.invBtn.classList.replace("bg-purple-500", "bg-gray-100");
      sciBtns.currnetType = "default";
    } else if (sciBtns.currnetType == "hypInv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hyp[i];
        i += 1;
      }
      this.invBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.invBtn.classList.replace("bg-purple-500", "bg-gray-100");
      sciBtns.currnetType = "hyp";
    }
  }
}
class State {
  constructor(ui) {
    this.ui = ui;
    this.input = document.querySelector("textarea");
    this.instCalResult = document.getElementById("instCal");
    this.btns = Array.from(document.querySelectorAll(".st-btn"));
    this.hist = document.getElementById("histItems");
    this.dataValid = "123456789+-*×÷/0.()^%√!";
    this.vldTouchBtns = "1234567890+-×÷.%^!";
    this.oper = "+-*×÷/^.";
    this.result = 0;
    this.preValue = "";
    this.preSelection = 1;
    this.key = "";
  }
  start() {
    this.touchBtnStart(this.btns);
    this.keyFunctionsStart();
  }
  keyFunctionsStart() {
    this.input.addEventListener("keydown", (event) => {
      this.preSelection = this.input.selectionEnd;
      if (event.key == "(") {
        this.preValue =
          this.preValue.slice(0, this.preSelection) +
          ")" +
          this.preValue.slice(this.preSelection, this.preValue.length);
        this.input.value = this.preValue;
        this.input.selectionEnd = this.preSelection;
      }
      this.key = event.key;
      if (event.key == "Enter") {
        this.setResults();
      }
    });
    this.input.addEventListener("input", (event) => {
      this.preSelection = this.input.selectionEnd;
      [this.preValue, this.preSelection] = this.validater(
        this.preValue,
        this.preSelection,
      );
      this.result = this.praser();
      this.updateInstResults(this.result);
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
        this.result = this.praser();
        this.updateInstResults(this.result);
      });
    }
  }
  touchInputValidater(pvalue, pselection, btnContent) {
    let value = this.input.value;
    let curntSelection = pselection;
    btnContent = btnContent.trim();
    let currnetType = this.ui.sciBtns.currnetType;
    let sciIndex = this.ui.sciBtns[currnetType].indexOf(btnContent);
    if (this.vldTouchBtns.includes(btnContent)) {
      value =
        value.slice(0, pselection) +
        btnContent +
        value.slice(pselection, value.length);
      curntSelection += 1;
    } else if (btnContent == "⌫" && pselection != 0) {
      value =
        value.slice(0, pselection - 1) + value.slice(pselection, value.length);
      curntSelection -= 1;
    } else if (btnContent == "=") {
      this.setResults();
      return
    } else if (btnContent == "( )") {
      value =
        value.slice(0, pselection) +
        "()" +
        value.slice(pselection, value.length);
      curntSelection += 1;
    } else if (btnContent == "AC") {
      value = "";
      curntSelection = 0;
    } else if (btnContent == "π") {
      value =
        value.slice(0, pselection) +
        "3.142" +
        value.slice(pselection, value.length);
      curntSelection += 5;
    } else if (btnContent == "e") {
      value =
        value.slice(0, pselection) +
        "2.718" +
        value.slice(pselection, value.length);
      curntSelection += 5;
    } else if (btnContent == "√") {
      value =
        value.slice(0, pselection) +
        "√()" +
        value.slice(pselection, value.length);
      curntSelection += 2;
    } else if (sciIndex != -1) {
      value =
        value.slice(0, pselection) +
        btnContent +
        "()" +
        value.slice(pselection, value.length);
      curntSelection += btnContent.length + 1;
    };
    this.input.value = value;
    this.input.selectionEnd = curntSelection;
    return this.opChecker(pvalue, curntSelection);
  }

  validater(pvalue, pselection) {
    let input = this.input;
    if (
      this.key != "Backspace" &&
      !this.dataValid.includes(input.value[input.selectionEnd - 1]) &&
      input.value.length !== 0 &&
      input.selectionEnd != 0
    ) {
      input.value = pvalue;
      input.selectionEnd = pselection - 1;
    }
    input.value = input.value.replace("*", "×").replace("/", "÷");
    input.selectionEnd = pselection;
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

    let replaceBtns = {
      "sin": "Math.sin",
      "cos": "Math.cos",
      "tan": "Math.tan",
      "csc": "1/Math.sin",
      "sec": "1/Math.cos",
      "cot": "1/Math.tan",

      "sin⁻¹": "Math.asin",
      "cos⁻¹": "Math.acos",
      "tan⁻¹": "Math.atan",
      "csc⁻¹": "1/Math.asin",
      "sec⁻¹": "1/Math.acos",
      "cot⁻¹": "1/Math.atan",

      "sinh": "Math.sinh",
      "cosh": "Math.cosh",
      "tanh": "Math.tanh",
      "csch": "1/Math.sinh",
      "sech": "1/Math.cosh",
      "coth": "1/Math.tanh",

      "sinh⁻¹": "Math.asinh",
      "cosh⁻¹": "Math.acosh",
      "tanh⁻¹": "Math.atanh",
      "csch⁻¹": "1/Math.asinh",
      "sech⁻¹": "1/Math.acosh",
      "coth⁻¹": "1/Math.atanh",
      "log": "Math.log10",
      "ln": "Math.log"
    };

    let value = this.input.value;
    value = value
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll("^", "**")
      .replaceAll("%", "/100")
      .replaceAll("√", "Math.sqrt");
    let factorials = value.match(/\d+!/g);
    if (factorials != null) {
      for (let tofac of factorials) {
        let num = Number(tofac.slice(0, tofac.length-1))
        value = value.replace(tofac, `${factorial(num)}`)
      }
    }
    if (this.ui.displaying == "sci") {
      for (let key of Object.keys(replaceBtns)) {
        let test = new RegExp(key + "(?=\\()", "g")
        value = value.replaceAll(test, replaceBtns[key]);
      }
    }
    try {
      let instResult = Number(eval(value));
      if (value.length == 0) {
        return "0";
      }
      if (instResult / Number(instResult.toFixed(0)) === 1) {
        return instResult;
      } else if (instResult / instResult != 1) {
        return "?"
      };
      return instResult.toFixed(3);
    } catch {
      return "?";
    }
  }
  updateInstResults(result) {
    this.instCalResult.textContent = "";
    this.instCalResult.textContent = ` =` + result;
  }
  updateHist(result) {
    let input = this.input;
    let item = document.createElement("p");
    let resItem =document.createElement("span");
    resItem.classList.add("text-green-600", "text-[1.4rem]");
    item.classList.add("p-2", "text-[1.2rem]");
    this.preValue = this.preValue
      .replaceAll("+", " + ")
      .replaceAll("-", " - ")
      .replaceAll("×", " × ")
      .replaceAll("÷", " ÷ ");
    let value = document.createTextNode(`${this.preValue} = `);
    resItem.textContent = result;
    item.appendChild(value);
    item.appendChild(resItem);
    this.hist.appendChild(item);
    item.onclick =  () => {
      input.value = value.textContent.slice(0, value.textContent.length-3);
    }
    resItem.onclick = (event) => {
      input.value = resItem.textContent;
      event.stopPropagation();
    }
    
  }
  setResults() {
    if (this.result !== "?") {
      this.updateHist(this.result);
      this.preValue = this.result;
      this.input.value = this.result;
    }

  }
}
function factorial(num) {
  if (num > 1) {
    return num * factorial(num-1)
  }
  return 1;
}
 function setTheme (html, themeBtn) {
  if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.setAttribute("data-theme", "dark")
    themeBtn.textContent = "🌙";
  } else if (!("theme" in localStorage) ){
    html.setAttribute("data-theme", "light")
    themeBtn.textContent = "🔆";
  } else {
    html.setAttribute("data-theme", `${localStorage.getItem("theme")}`);
    if (localStorage.getItem("theme") == "light")themeBtn.textContent = "🔆";
    else 
    themeBtn.textContent = "🌙";
  }
 }
 function setScheme (interface) {
  if (!("scheme" in localStorage)) {
    interface.showSciDiv();
  } else if (localStorage.getItem("scheme") == "stan") {
    interface.showStnDiv()
  } else {
    interface.showSciDiv();
  }
 }
function main() {
  let interface = new Interface(); interface.sh
  setTheme(interface.html, interface.themeBtn);
  setScheme(interface);
  interface.sw
  interface.setEvents();

  let state = new State(interface);
  state.start();
}
window.addEventListener("load", () => main());

