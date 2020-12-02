console.log("Expense Tracker");
showExpenses();
let submit = document.getElementById('subBtn');
submit.addEventListener('click', function() {
 // Input By user
 let dateTxt = document.getElementById('DOT');
 let descTxt = document.getElementById('desc');
 let amtTxt = document.getElementById('amt');
 // Accessing Local Storage
 let dates = localStorage.getItem("DOT");
 let descriptions = localStorage.getItem('desc');
 let amounts = localStorage.getItem('amt');
 if( dates == null || descriptions== null || amounts == null )
 {
 datesObj = [];
 descriptionsObj = [];
 amountsObj = [];
 }
 else
 {
 datesObj = JSON.parse(dates);
 descriptionsObj = JSON.parse(descriptions);
 amountsObj = JSON.parse(amounts);
 }
 datesObj.push(dateTxt.value);
 descriptionsObj.push(descTxt.value);
 if(document.getElementById('spent').checked)
 {
 amountsObj.push(-1*Number(amtTxt.value));
 }
 else
 {
 amountsObj.push(Number(amtTxt.value));
 }
 localStorage.setItem("DOT", JSON.stringify(datesObj));
 localStorage.setItem("desc", JSON.stringify(descriptionsObj));
 localStorage.setItem("amt", JSON.stringify(amountsObj));
 // clearing the area for next input
 dateTxt.value = "";
 descTxt.value = "";
 amtTxt.value = "";
 showExpenses();
});
function showExpenses() {
 // Accessing Local Storage
 let dates = localStorage.getItem("DOT");
 let descriptions = localStorage.getItem('desc');
 let amounts = localStorage.getItem('amt');
 if( dates == null || descriptions== null || amounts == null )
 {
 datesObj = [];
 descriptionsObj = [];
 amountsObj = [];
 }
 else
 {
 datesObj = JSON.parse(dates);
 descriptionsObj = JSON.parse(descriptions);
 amountsObj = JSON.parse(amounts);
 }
 let html = "";
 amountsObj.forEach(function(element, index){
 if( Number(amountsObj[index]) < 0)
 {
 html += `
 <tr>
 <td>${datesObj[index]}</td>
 <td>${descriptionsObj[index]}</td>
 <td style="color: red;">${"₹" +
Math.abs(Number(amountsObj[index]))}</td>
 <td><button type="button" class="btn btn-danger" id=${index}
onclick = "deleteTransaction(this.id)">Delete</button></td>
 </tr>
 `;
 }
 else
 {
 html += `
 <tr>
 <td>${datesObj[index]}</td>
 <td>${descriptionsObj[index]}</td>
 <td style="color: green;">${"₹" +
Math.abs(Number(amountsObj[index]))}</td>
 <td><button type="button" class="btn btn-danger" id=${index}
onclick = "deleteTransaction(this.id)">Delete</button></td>
 </tr>
 `;
 }
 });
 let table = document.getElementById('tableBody');
 table.innerHTML = html;
 let thead = document.getElementById("thead");
 if( amountsObj.length == 0 )
 {
 thead.innerHTML = `
 <thead>
 <tr>
 <td></td>
 <td><h4> NO TRANSACTIONS YET !!</h4></td>
 <td><h4> KINDLY ADD A TRANSACTION </h4></td>
 <td></td>
 </tr>
 </thead>
 `;
 }
 else
 {
 thead.innerHTML = `
 <thead>
 <tr>
 <td>Date</td>
 <td>Description</td>
 <td>Amount</td>
 <td><button type="button" class="btn btn-success"
onclick="calculateExpense()" id="expense">Calculate Expenses</button></td>
 </tr>
 </thead>
 `;
 }
};
function deleteTransaction(index) {
 // Accessing Local Storage
 let dates = localStorage.getItem("DOT");
 let descriptions = localStorage.getItem('desc');
 let amounts = localStorage.getItem('amt');
 if( dates == null || descriptions== null || amounts == null )
 {
 datesObj = [];
 descriptionsObj = [];
 amountsObj = [];
 }
 else
 {
 datesObj = JSON.parse(dates);
 descriptionsObj = JSON.parse(descriptions);
 amountsObj = JSON.parse(amounts);
 }
 datesObj.splice(index,1);
 descriptionsObj.splice(index,1);
 amountsObj.splice(index,1);
 localStorage.setItem("DOT", JSON.stringify(datesObj));
 localStorage.setItem("desc", JSON.stringify(descriptionsObj));
 localStorage.setItem("amt", JSON.stringify(amountsObj));
 showExpenses();
};
function calculateExpense() {
 let dates = localStorage.getItem("DOT");
 let descriptions = localStorage.getItem('desc');
 let amounts = localStorage.getItem('amt');
 if( dates == null || descriptions== null || amounts == null )
 {
 datesObj = [];
 descriptionsObj = [];
 amountsObj = [];
 }
 else
 {
 datesObj = JSON.parse(dates);
 descriptionsObj = JSON.parse(descriptions);
 amountsObj = JSON.parse(amounts);
 }
 let totalAmount = 0;
 amountsObj.forEach(function(element, index){
 totalAmount += Number(amountsObj[Number(index)]);
 });
 let absAmount = Math.abs(totalAmount);
 let table = document.getElementById('tableBody');
 let tchild = document.createElement('tr');
 if( totalAmount < 0)
 {
 tchild.innerHTML = `
 <td colspan="4">
 <div class="alert alert-danger" role="alert">
 Total Amount = ${"₹" + totalAmount}, Kindly Save More Money !
 </div>
 </td>
 `;
 }
 else
 {
 tchild.innerHTML = `
 <td colspan="4">
 <div class="alert alert-primary" role="alert">
 Total Amount = ${"₹" + totalAmount}, SAVINGS !!
 </div>
 </td>
 `;
 }
 table.appendChild(tchild);
};