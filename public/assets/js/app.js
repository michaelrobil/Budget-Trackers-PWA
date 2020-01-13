import { useIndexedDb } from "./indexedDb";

const priceEl = document.getElementById("price");
const balanceEl = document.getElementById("balance");
const expenseEl = document.getElementById("expense-deposit");
const expensesListEl = document.getElementById("expenses-list");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");

function sub(a, b) {
  return parseInt(a) + parseInt(b)
};

useIndexedDb("budget", "budgetStore", "get").then(results => {
  console.log(results)
  results.forEach(o => {
    console.log(o)
    const oneItem = `<li class="list-group-item">Name: ${o.name}
    <span class="ml-4">Price: ${o.value}</span></li>`;
    $("#expenses-list").append(oneItem)
    const newOne = sub(balanceEl.innerHTML, o.value);
    balanceEl.innerHTML = newOne;
  });
});


$(function () {
  //on expense
  $("#expense").on("click", function (e) {
    e.preventDefault();
    let newItem = {
      item: $("#expense-deposit").val().trim(),
      price: "-"+$("#price").val().trim()
    };

    useIndexedDb("budget", "budgetStore", "put", {
      _id: newItem.item,
      name: newItem.item,
      value: newItem.price
    });

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
    let newItem = {
      item: $("#expense-deposit").val().trim(),
      price: $("#price").val().trim()
    };

    useIndexedDb("budget", "budgetStore", "put", {
      _id: newItem.item,
      name: newItem.item,
      value: newItem.price
    });

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
    useIndexedDb("budget", "budgetStore", "clear")
    $.ajax("/api/budget", {
      type: "DELETE",
    });
    location.reload();
  });
});
