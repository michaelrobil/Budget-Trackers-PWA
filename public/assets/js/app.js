// const budgetEl = document.getElementById("budget");
const priceEl = document.getElementById("price");
const balanceEl = document.getElementById("balance");
const expenseEl = document.getElementById("expense-deposit");
const expensesListEl = document.getElementById("expenses-list");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");

function sub(a, b) {
  return parseInt(a) + parseInt(b)
};

async function getListItems() {
  let res = await fetch("/api/budget");
  let list = await res.json();
  list.forEach(o => {
    const oneItem = `<li class="list-group-item">Name: ${o.item}
    <span class="ml-4">Price: ${o.price}</span></li>`;
    $("#expenses-list").append(oneItem)
    const newOne = sub(balanceEl.innerHTML, o.price);
    balanceEl.innerHTML = newOne;
  });
};

getListItems();

$(function () {
  //on expense
  $("#expense").on("click", function (e) {
    e.preventDefault();
    // addToList(expenseEl.value, priceEl.value);
    let newItem = {
      item: $("#expense-deposit").val().trim(),
      price: "-"+$("#price").val().trim()
    };
    $.ajax("/api/budget", {
      type: "POST",
      data: newItem
    }).then(
      function () {
        location.reload();
      }
    );
  });
  //on deposite
  $("#deposit").on("click", function (e) {
    e.preventDefault();
    // addToList(expenseEl.value, priceEl.value);
    let newItem = {
      item: $("#expense-deposit").val().trim(),
      price: $("#price").val().trim()
    };
    $.ajax("/api/budget", {
      type: "POST",
      data: newItem
    }).then(
      function () {
        location.reload();
      }
    );
  });

  //on reset
  $("#reset").on("click", function (e) {
    e.preventDefault();
    $.ajax("/api/budget", {
      type: "DELETE",
    });
    location.reload();
  });
});
