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

let cashInRegister: number = 100;
const orderHistory: Order[] = [];
let nextOrderId: number = 1;
let nextPizzaId: number = 1;

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Muzzarella", price: 8, discount: false },
  { id: nextPizzaId++, name: "Jamon y Queso", price: 10 },
  { id: nextPizzaId++, name: "Especial con Huevo", price: 10, discount: true },
  { id: nextPizzaId++, name: "Fugazzeta", price: 9 },
];

/*

    Challenge: 
    Fix the addNewPizza function using the Omit utility type. This might require more than just changing the "Pizza" typed `pizzaObj` parameter.
    Return the new pizza object (with the id added) from the function.

*/

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
    id: nextPizzaId++,
    ...pizzaObj,
  };
  menu.push(newPizza);
  return newPizza;
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

/*

    Challenge: 
    Add types to our generic `addToArray` function. It should work for adding new pizzas to the `menu` and adding new orders to the `orderHistory`

*/

function addToArray<Type>(array: Type[], item: Type): Type[] {
  array.push(item);
  return array;
}

//example usage:
console.log(
  "Adding an item into the menu array: ",
  addToArray(menu, { id: nextPizzaId++, name: "Anchoas", price: 12 })
);
console.log(
  "Adding an item into the orderHistory array: ",
  addToArray<Order>(orderHistory, {
    id: nextOrderId++,
    pizza: menu[menu.length - 1],
    status: "completed",
  })
);

function completeOrder(orderId: number): Order | undefined /* return types */ {
  const order = orderHistory.find((order) => order.id === orderId);
  if (order === undefined) {
    console.error(`Order #${orderId} was not found in the order history`);
    return;
  }
  order.status = "completed";
  return order;
}

addNewPizza({ name: "Anana", price: 11 });
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
