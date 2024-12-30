type Pizza = {
  id: number;
  name: string;
  price: number;
  discount?: boolean; // optional value
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed"; // binary value
};

const menu: Pizza[] = [
  { id: 1, name: "Muzzarella", price: 8, discount: false },
  { id: 2, name: "Jamon y Queso", price: 10 },
  { id: 3, name: "Especial con Huevo", price: 10, discount: true },
  { id: 4, name: "Fugazzeta", price: 9 },
];

let cashInRegister: number = 100;
const orderHistory: Order[] = [];
let nextOrderId: number = 1;

function addNewPizza(pizzaObj: Pizza): void {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName: string): Order | undefined /* return types */ {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (selectedPizza === undefined) {
    console.error(`The pizza '${pizzaName}' does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderHistory.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined /* return types */ {
  const order = orderHistory.find((order) => order.id === orderId);
  if (order === undefined) {
    console.error(`Order #${orderId} was not found in the order history`);
    return;
  }
  order.status = "completed";
  return order;
}

addNewPizza({ id: 4, name: "Anana", price: 11 });
placeOrder("Anana");
placeOrder("Muzzarella");
completeOrder(1);

console.log("Menu: ", menu);
console.log("Cash in register: ", cashInRegister);
console.log("Order history: ", orderHistory);

/*

    Challenge: 
    Create a new utility function called getPizzaDetail. It will take a parameter called 'identifier', but there's a twist: we want this identifier to be allowed to either be the string name of the pizza (e.g. "Pepperoni"), OR to be the number ID of the pizza (e.g. 2).
    
    Don't worry about the code inside the function yet, just create the function signature, making sure to teach TS that the 'identifier' parameter is allowed to either be a string or a number.

*/

function getPizzaDetail(identifier: number | string): Pizza | undefined {
  /*

    Challenge: 
    Write the code to check if the parameter is a string or a number, and use the menu.find() method accordingly

  */
  if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else if (typeof identifier === "string") {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else {
    throw new TypeError(
      "Parameter 'identifier' must be either a number or a string"
    );
  }
}
