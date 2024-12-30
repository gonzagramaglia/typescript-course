type Pizza = {
  name: string
  price: number
  discount?: boolean // optional value
};

type Order = {
  id: number
  pizza: Pizza
  status: "ordered" | "completed" // binary value
}

const menu: Pizza[] = [
  { name: "Muzzarella", price: 8, discount: false },
  { name: "Jamon y Queso", price: 10 },
  { name: "Especial con Huevo", price: 10, discount: true },
  { name: "Fugazzeta", price: 9 },
];

let cashInRegister: number = 100;
const orderQueue Order[] = [];
let nextOrderId: number = 1;

function addNewPizza(pizzaObj: Pizza) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName: string): Order | void { // return types
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (selectedPizza === undefined) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | void { // return types
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
