let history = [];
	let myButton = document.getElementById("button");

	function calculateResult() {
		let number_1 = parseInt(document.getElementById("firstNumber").value);
		let number_2 = parseInt(document.getElementById("secondNumber").value);
		let myResult = document.getElementById("result");
		let operator = document.getElementById("operator").value;
		let calculationString = "";

        // The if-statements check what operation the calculation is going through, and calculates
        // the result. The result is saved in a h2, meanwhile in the history the whole calculation string
        // gets saved.

		if (operator == "+") {
			let result = number_1 + number_2;
			myResult.innerHTML = result;
			calculationString = number_1 + "+" + number_2 + "=" + result;
		}
		if (operator == "-") {
			let result = number_1 - number_2;
			myResult.innerHTML = result;
			calculationString  = number_1 + "-" + number_2 + "=" + result;
		}
		if (operator == "*") {
			let result = number_1 * number_2;
			myResult.innerHTML = result;
			calculationString  = number_1 + "*" + number_2 + "=" + result;
		}
		if (operator == "/") {
			let result = number_1 / number_2;
			myResult.innerHTML = result;
			calculationString  = number_1 + "/" + number_2 + "=" + result;
		}
		history.push(calculationString);

		//History gets stringified to be saved in the local storage, where only strings can be saved.
		localStorage.setItem("history", JSON.stringify(history));
		showHistoryList();
	}


    // Event of deleting a particular calculation from the history. 
	function deleteItem(event) {
		let currentCalc = event.target.innerHTML;
		// The position of the calculation.
		let index = history.indexOf(currentCalc);
		    // console.log(index);
		history.splice(index,1);
		localStorage.setItem("history", JSON.stringify(history));
		showHistoryList();
	}

    // Here is the history list shown. The if-statement goes through every calculation string saved in the history array.
	function showHistoryList(){
		let historyList = document.getElementById("history");
		historyList.innerHTML = "";
		for(let i=0; i < history.length;i++){
			let item = document.createElement("li");
			item.innerHTML=history[i];
			item.addEventListener("click", deleteItem);
			historyList.append(item);
		}
	}

    
	function loadHistory() {
		if(localStorage.getItem("history") != null) {
			history = JSON.parse(localStorage.getItem("history"));
		} else {
			history = [];
		}
		showHistoryList();
	}

    // This function deletes the whole history. 
	function deleteHistory() {
		history  = [];
		localStorage.setItem("history", JSON.stringify(history));
		showHistoryList();
	}
	document.getElementById('delete').addEventListener("click", deleteHistory);
	myButton.addEventListener("click", calculateResult);
	document.addEventListener("DOMContentLoaded", loadHistory);