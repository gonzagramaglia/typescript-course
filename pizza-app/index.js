const menu = [
  { name: "Muzzarella", price: 8 },
  { name: "Jamon y Queso", price: 10 },
  { name: "Especial con Huevo", price: 10 },
  { name: "Fugazzeta", price: 9 },
];

let cashInRegister = 100;
const orderQueue = [];
let nextOrderId = 1;

/*

    Callenge: 
    Add an utility function "addNewPizza" that takes a pizza object and adds it to the menu

*/

function addNewPizza(pizzaObj) {
  menu.push(pizzaObj);
}

/*

    Challenge
    Write another utility function, placeOrder, that takes a pizza name aparameter and:
    1. finds that pizza object in the menu,
    2. adds the income to the cashInRegister,
    3. pushes a new "order object" to the orderQueue (e.g) { pizza: selectedPizzaObjectFromStep1, status: "ordered"})
    4. returns the new order object (just in case we need it later)

*/

function placeOrder(pizzaName) {
  //
  //   for (const item of menu) {
  //     if (item.name === pizzaName) {
  //       cashInRegister += item.price;
  //       const newOrder = { pizza: item, status: "ordered" };
  //       orderQueue.push(newOrder);
  //       return newOrder;
  //     }
  //   }
  //
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  cashInRegister += selectedPizza.price;
  //
  //   const newOrder = { id: nextOrderId, pizza: selectedPizza, status: "ordered" };
  //   nextOrderId += 1
  //
  const newOrder = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

/*

    Challenge: write another utility function, completeOrder, that takes an orderId as a parameter, finds the correct order in the orderQueu, and marks its status as "completed", for good measure, return the found order from the function.

    Note: you'll read to ensure that we're adding IDs to our orders when we create new orders. You can use a global `nextOrderId` variable and increment it every time a new order is created to simulate real IDs being managed for us by a database.

*/

function completeOrder(orderId) {
  const order = orderQueue.find((order) => order.id === orderId);
  order.status = "completed";
  return order;
}

addNewPizza({ name: "Anana", price: 11 });
placeOrder("Anana");
placeOrder("Muzzarella");
completeOrder(1);

console.log("Menu: ", menu);
console.log("Cash in register: ", cashInRegister);
console.log("Order queue: ", orderQueue);
