class Interface {
  constructor() {
    this.html = document.querySelector("html");
    this.aboutdiv = document.getElementById("about");
    this.aboutBtn = document.getElementById("aboutBtn");
    this.clsAbtBtn = document.getElementById("closeAboutBtn");
    this.calcBody = document.getElementById("body");
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
    this.input = document.querySelector("input");
    this.inputDiv = document.getElementById("inputdiv");
    this.instCalResult = document.getElementById("instCal");
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
    this.themeBtn = document.getElementById("changeTheme");
    this.memory = {};
    this.displaying = "sci";
    this.mshow = false;
    this.histShow = false;
    this.isAboutShowing = false;
  }
  setEvents() {
    this.adjustResize();
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
    this.aboutBtn.onclick = () => this.showHideAbout();
    this.clsAbtBtn.onclick = () => this.showHideAbout();
    this.inputDiv.onclick = () => { this.input.focus() };
    window.addEventListener("resize", () => { this.adjustResize() })
  }
  adjustResize() {
    if (innerHeight > 1080) {
      this.instCalResult.classList.replace("text-[1.8rem]", "text-[2.5rem]")
      this.input.classList.add("pt-[2rem]");
    }
    else if (innerHeight > 760 && innerWidth > 400) {
      this.instCalResult.classList.add("text-[1.8rem]")
      this.instCalResult.classList.remove("text-[1rem]")
      this.instCalResult.classList.remove("text-[1.6rem]")
      this.input.classList.add("pt-[1.5rem]")
    } else if (innerHeight > 660 && innerWidth > 400) {
      this.instCalResult.classList.add("text-[1.8rem]")
      this.instCalResult.classList.remove("text-[1rem]")
      this.instCalResult.classList.remove("text-[1.6rem]")
      this.input.classList.add("pt-[1rem]")
    } else if (innerHeight > 660 && innerWidth < 400) {
      this.instCalResult.classList.add("text-[1.6rem]")
      this.instCalResult.classList.remove("text-[1rem]")
      this.instCalResult.classList.remove("text-[1.8rem]")
      this.input.classList.add("pt-[1rem]")
    } else if (innerHeight < 660 && innerWidth < 480) {
      this.instCalResult.classList.add("text-[1.6rem]")
      this.instCalResult.classList.remove("text-[1rem]")
      this.instCalResult.classList.remove("text-[1.8rem]")
      this.input.classList.remove("pt-[2rem]")
      this.input.classList.remove("pt-[1.5rem]")
      this.input.classList.remove("pt-[1rem]")
    } else if (innerHeight < 400) {
      this.instCalResult.classList.add("text-[1rem]")
      this.input.classList.remove("pt-[2rem]")
      this.input.classList.remove("pt-[1.5rem]")
      this.input.classList.remove("pt-[1rem]")
    } else if (innerHeight < 760 && innerWidth > 500) {
      this.instCalResult.classList.add("text-[1.8rem]")
      this.instCalResult.classList.remove("text-[1rem]")
      this.instCalResult.classList.remove("text-[1.6rem]")
      this.input.classList.remove("pt-[2rem]")
      this.input.classList.remove("pt-[1.5rem]")
      this.input.classList.remove("pt-[1rem]")
    }
  }
  showHideAbout() {
    if (!this.isAboutShowing) {
      this.aboutdiv.classList.replace("hidden", "block");
      this.calcBody.classList.replace("block", "hidden")
      this.isAboutShowing = true
    } else {
      this.calcBody.classList.replace("hidden", "block");
      this.aboutdiv.classList.replace("block", "hidden");
      this.isAboutShowing = false
    }

  }
  changeTheme() {
    let curnt = this.html.getAttribute("data-theme");
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
      this.input.focus()
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
  closeHist() {
    this.input.focus();
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
    this.input.focus();
  }
  hypSwitch() {
    let sciBtns = this.sciBtns;
    let i = 0;
    if (sciBtns.currnetType == "default") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hyp[i];
        i += 1;
      }
      this.hypBtn.classList.replace("bg-gray-300", "bg-purple-500");
      this.hypBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "hyp";
    } else if (sciBtns.currnetType == "inv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hypInv[i];
        i += 1;
      }
      this.hypBtn.classList.replace("bg-gray-300", "bg-purple-500");
      this.hypBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "hypInv";
    } else if (sciBtns.currnetType == "hyp") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.default[i];
        i += 1;
      }
      this.hypBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.hypBtn.classList.replace("bg-purple-500", "bg-gray-300");
      sciBtns.currnetType = "default";
    } else if (sciBtns.currnetType == "hypInv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.inv[i];
        i += 1;
      }
      this.hypBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.hypBtn.classList.replace("bg-purple-500", "bg-gray-300");
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
      this.invBtn.classList.replace("bg-gray-300", "bg-purple-500");
      this.invBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "inv";
    } else if (sciBtns.currnetType == "hyp") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hypInv[i];
        i += 1;
      }
      this.invBtn.classList.replace("bg-gray-300", "bg-purple-500");
      this.invBtn.classList.replace("dark:bg-[#1f1f1f]", "dark:bg-purple-500");
      sciBtns.currnetType = "hypInv";
    } else if (sciBtns.currnetType == "inv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.default[i];
        i += 1;
      }
      this.invBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.invBtn.classList.replace("bg-purple-500", "bg-gray-300");
      sciBtns.currnetType = "default";
    } else if (sciBtns.currnetType == "hypInv") {
      for (let btn of this.allSciBtnsNode) {
        btn.textContent = sciBtns.hyp[i];
        i += 1;
      }
      this.invBtn.classList.replace("dark:bg-purple-500", "dark:bg-[#1f1f1f]");
      this.invBtn.classList.replace("bg-purple-500", "bg-gray-300");
      sciBtns.currnetType = "hyp";
    }
  }
}
class State {
  constructor(ui) {
    this.ui = ui;
    this.date = new Date;
    this.input = document.querySelector("input");
    this.instCalResult = document.getElementById("instCal");
    this.btns = Array.from(document.querySelectorAll(".st-btn"));
    this.todayHist = document.getElementById("tHistItems");
    this.deletehBtn = document.getElementById("delete");
    this.degRadBtn = document.getElementById("deg");
    this.sciBtns = ["sin", "cos", "tan", "csc", "sec", "cot", "ln", "log", "sin⁻¹", "cos⁻¹",
      "tan⁻¹", "csc⁻¹", "sec⁻¹", "cot⁻¹", "ln", "log", "sinh", "cosh", "tanh", "csch", "sech",
      "coth", "ln", "log", "sinh⁻¹", "cosh⁻¹", "tanh⁻¹", "csch⁻¹", "sech⁻¹", "coth⁻¹", "ln", "log",];
    this.sciBtnsToReplace = [];
    this.dataValid = "123456789+-*×÷/0.()^%√!";
    this.vldTouchBtns = "1234567890+-×÷.%^!";
    this.oper = "+-*×÷/^.";
    this.result = 0;
    this.preValue = "";
    this.preSelection = 1;
    this.key = "";
    this.memory = Object.create(null);
    this.deg = false;
    this.intialScrollWidth = Array.from([this.input.scrollWidth])
  }
  start() {
    this.touchBtnStart(this.btns);
    this.keyFunctionsStart();
    this.initLocalHist();
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
      this.showKey(this.key)
      this.insertComma(this.input.value, this.preSelection);
      this.result = this.praser();
      this.updateInstResults(this.insertComma(String(this.result)));
    });
  }
  showKey(key) {
    for (let btn of this.btns) {
      if (this.vldTouchBtns.includes(btn.textContent)) {
        if (key == btn.textContent || (this.key == "/" && btn.textContent == "÷") ||
          (this.key == "*" && btn.textContent == "×")
        ) {
          btn.classList.add("outline-4", "outline-purple-500")
          setTimeout(() => {
            btn.classList.remove("outline-4", "outline-purple-500")
          }, 200);
        }
      }
    }
  }
  touchBtnStart(btns) {
    for (let btn of btns) {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        this.input.focus();
        this.preSelection = this.input.selectionEnd;
        [this.preValue, this.preSelection] = this.touchInputValidater(
          this.preValue,
          this.preSelection,
          btn.textContent,
        );
        this.insertComma(this.input.value, this.preSelection);
        this.result = this.praser();
        this.updateInstResults(this.insertComma(String(this.result)));
        // styles
        btn.classList.add("outline-4", "outline-purple-500")
        setTimeout(() => {
          btn.classList.remove("outline-4", "outline-purple-500")
        }, 200);
      });
    }
  }
  touchInputValidater(pvalue, pselection, btnContent) {
    let value = this.input.value.trim();
    let curntSelection = pselection;
    btnContent = btnContent.trim();
    let sciIndex = this.sciBtns.indexOf(btnContent);
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
      return [pvalue, pselection]
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
      if (!this.sciBtnsToReplace.includes(btnContent)) {
        this.sciBtnsToReplace.push(btnContent);
      }
      curntSelection += btnContent.length + 1;
    };
    this.input.value = value
    this.input.selectionEnd = curntSelection;
    let inputLen = value.length;
    if (inputLen === curntSelection) {
      this.input.scrollLeft = this.input.scrollWidth;
    } else {
      this.input.scrollLeft = this.input.scrollWidth * (curntSelection / inputLen) - this.input.offsetWidth + 20
    }
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
    pselection = this.input.selectionEnd;
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
      .replaceAll("√", "Math.sqrt").replace(/,/g, "")
      .replace(/(?<![\d.])0+(?=\d)/g, "");
    let factorials = value.match(/\d+!/g);
    if (factorials != null) {
      for (let tofac of factorials) {
        let num = Number(tofac.slice(0, tofac.length - 1))
        value = value.replace(tofac, `${factorial(num)}`);
      }
    }
    if (this.sciBtnsToReplace.length != 0) {
      if (!this.deg) {
        for (let key of this.sciBtnsToReplace) {
          let test = new RegExp(key + "(?=\\()", "g");
          value = value.replaceAll(test, replaceBtns[key]);
        }
      }
    }
    try {
      let instResult = Number(eval(value));
      if (value.length == 0) {
        return "0";
      }
      if (instResult / Number(instResult.toFixed(0)) === 1) {
        return instResult;
      }
      return instResult.toFixed(5);
    } catch {
      return "?";
    }
  }
  insertComma(string, pselection) {
    let stLength = string.length;
    let value = string.replace(/,/g, "");
    let matches = value.match(/(?<!\d\.)\b\d+\b(?!\.\d)/g);
    let toReplace = [];
    let count = 0;
    if (!matches) {
      if (pselection != undefined) {
        this.input.value = value;
        this.input.selectionEnd = pselection;
      }
      return value;
    }
    for (let num of matches) {
      let converted = [];
      if (num.length > 3) {
        for (let i = num.length - 3; i > 0; i -= 3) {
          converted.unshift(num.slice(i, i + 3));
          converted.unshift(",");
          if (i - 3 <= 0) converted.unshift(num.slice(0, i));
        }
        toReplace.push(converted.join(""));
        value = value.replace(num, toReplace[count])
        count += 1
      }
    }
    if (pselection != undefined) {
      this.input.value = value;
      this.input.selectionEnd = pselection + value.length - stLength;
    }
    return value
  }
  updateInstResults(result) {
    this.instCalResult.textContent = "";
    this.instCalResult.textContent = "=" + result;
  }
  updateHist(result) {
    let input = this.input;
    let item = document.createElement("p");
    let resItem = document.createElement("span");
    resItem.classList.add("text-green-600", "text-[1.4rem]", "font-bold");
    item.classList.add("text-[1.2rem]");
    this.preValue = this.preValue
      .replaceAll("+", " + ")
      .replaceAll("-", " - ")
      .replaceAll("×", " × ")
      .replaceAll("÷", " ÷ ");
    let value = document.createTextNode(`${this.preValue} = `);
    resItem.textContent = result;
    item.appendChild(value);
    item.appendChild(resItem);
    this.todayHist.appendChild(item);
    this.updtLocStrgHistObj(result);
    item.onclick = () => {
      let sciBtns = value.textContent.match(/[^ \d+\(\),\.]\w+⁻¹|[^ \d+\(\),\.]\w+/g);
      if (!sciBtns) sciBtns = [];
      sciBtns.forEach((value, index) => {
        if (!this.sciBtnsToReplace.includes(value))
          this.sciBtnsToReplace.push(value);
      })
      let valueText = value.textContent.replaceAll(" ", "");
      input.value = valueText.slice(0, valueText.length - 1);
      this.result = this.praser();
      this.updateInstResults(this.insertComma(String(this.result)));
      this.input.focus()
    }
    resItem.onclick = (event) => {
      input.value = resItem.textContent;
      this.result = this.praser();
      this.updateInstResults(this.result);
      this.input.focus()
      event.stopPropagation();
    }

  }
  initLocalHist() {
    let todayDate = this.date.toDateString();
    let allDates = [];
    if (localStorage.getItem("localHistObj") == null) {
      this.memory[todayDate] = Object.create(null);
      allDates.push(todayDate);
      this.memory["allDates"] = allDates;
    } else {
      this.memory = JSON.parse(localStorage.getItem("localHistObj"));
      allDates = this.memory["allDates"];
      if (this.memory[todayDate] == null) {
        this.memory[todayDate] = Object.create(null);
        allDates.push(todayDate);
        this.memory["allDates"] = allDates
      }
    }
    this.deletehBtn.onclick = () => this.deleteHist();
    let btnDeltHist = document.getElementById("deletetHist");
    btnDeltHist.onclick = () => this.deleteTodayHist();
  }
  updtLocStrgHistObj(result) {
    let todayDate = this.date.toDateString();
    this.memory[todayDate][this.preValue] = String(result);
    localStorage.setItem("localHistObj", JSON.stringify(this.memory));
  }
  setResults() {
    let result = this.result;
    if (result !== "?") {
      result = this.insertComma(String(result));
      this.updateHist(result);
      this.preValue = result;
      this.input.value = result;
    }
  }
  deleteHist() {
    let today = this.date.toDateString();
    let confirm = window.confirm(` " OK "  If you want to delete all History`);
    if (!confirm) return;
    this.memory = Object.create(null);
    this.memory[today] = Object.create(null);
    this.memory["allDates"] = [today];
    localStorage.setItem("localHistObj", JSON.stringify(this.memory))
    let histDivs = document.querySelectorAll(".localHistDiv");
    histDivs = Array.from(histDivs);
    for (let div of histDivs) {
      div.textContent = ""
    }
    this.todayHist.textContent = "";
  }
  deleteTodayHist() {
    let today = this.date.toDateString();
    this.todayHist.textContent = "";
    this.memory[today] = Object.create(null);
    localStorage.setItem("localHistObj", JSON.stringify(this.memory));
  }
}
function factorial(num) {
  if (num > 1) {
    return num * factorial(num - 1)
  }
  return 1;
}
function setTheme(html, themeBtn) {
  if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.setAttribute("data-theme", "dark")
    themeBtn.textContent = "🌙";
  } else if (!("theme" in localStorage)) {
    html.setAttribute("data-theme", "light")
    themeBtn.textContent = "🔆";
  } else {
    html.setAttribute("data-theme", `${localStorage.getItem("theme")}`);
    if (localStorage.getItem("theme") == "light") themeBtn.textContent = "🔆";
    else
      themeBtn.textContent = "🌙";
  }
}
function setHistory(date, input, state) {
  let todayHist = document.getElementById("tHistItems");
  let today = date.toDateString();
  let days;
  let memory = JSON.parse(localStorage.getItem("localHistObj"));
  if (memory) days = memory["allDates"];
  if (!days) return;
  for (let histObj of days) {
    if (memory[histObj]) {
      let results = Object.values(memory[histObj]);
      let exps = Object.keys(memory[histObj]);
      let dayDiv = document.createElement("div");
      if (histObj != today) {
        dayDiv.classList.add("flex", "flex-col-reverse", "localHistDiv", "text-right");
      } else {
        dayDiv = todayHist;
      }
      for (let i = 0; i <= results.length - 1; i += 1) {
        let item = document.createElement("p");
        let resItem = document.createElement("span");
        resItem.classList.add("text-green-600", "text-[1.2rem]", "font-bold");
        item.classList.add("text-[1.1rem]");
        let value = document.createTextNode(`${exps[i]} = `);
        resItem.textContent = results[i];
        item.appendChild(value);
        item.appendChild(resItem);
        dayDiv.appendChild(item)
        item.onclick = () => {
          let sciBtns = value.textContent.match(/[^ \d+\(\),\.]\w+⁻¹|[^ \d+\(\),\.]\w+/g);
          if (!sciBtns) sciBtns = [];
          sciBtns.forEach((value, index) => {
            if (!state.sciBtnsToReplace.includes(value))
              state.sciBtnsToReplace.push(value);
          })
          let valueText = value.textContent.replaceAll(" ", "")
          input.value = valueText.slice(0, valueText.length - 1);
          state.result = state.praser();
          state.updateInstResults(state.insertComma(String(state.result)));
          input.focus();
        }
        resItem.onclick = (event) => {
          event.stopPropagation();
          input.value = resItem.textContent;
          state.result = state.praser();
          state.updateInstResults(state.result);
          input.focus();
        }
      }
      if (histObj != today) {
        let dayHeading = `${histObj}`;
        let dHdiv = document.createElement('div');
        dHdiv.classList.add("inline-flex", "items-center");
        let clereBtn = document.createElement("img");
        let h = document.createElement("h3");
        h.textContent = dayHeading;
        h.classList.add("mb-1", "mt-4", "text-blue-600", "text-[1.1rem]")
        clereBtn.src = "src/img/delete-btn.svg"
        clereBtn.classList.add("ml-auto", "text-[1.2rem]", "w-[1.4rem]", "dark:bg-gray-300", "rounded-[4px]", "mb-1", "p-0.5", "mt-4", "mr-2");
        dHdiv.appendChild(h); dHdiv.appendChild(clereBtn);
        dayDiv.appendChild(dHdiv);
        todayHist.before(dayDiv);
        clereBtn.onclick = () => {
          memory[histObj] = null;
          localStorage.setItem("localHistObj", JSON.stringify(memory));
          dayDiv.classList.add("hidden");
        }
      }
    }
  }
}
function setScheme(interface) {
  if (!("scheme" in localStorage)) {
    interface.showSciDiv();
  } else if (localStorage.getItem("scheme") == "stan") {
    interface.showStnDiv()
  } else {
    interface.showSciDiv();
  }
}
function main() {
  let interface = new Interface(); 
  setTheme(interface.html, interface.themeBtn);
  setScheme(interface);
  interface.setEvents();
  let state = new State(interface);
  setHistory(state.date, state.input, state);
  state.start();
}
window.addEventListener("load", () => main());

