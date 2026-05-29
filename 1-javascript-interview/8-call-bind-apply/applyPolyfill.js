const car1 = {
  color: "red",
  company: "Ferrari",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency} ${price}`,
  );
}

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "It is not callable");
  }

  if (!Array.isArray(args)) {
    throw new Error("args is not an array");
  }

  context.fn = this;
  context.fn(...args);
};

purchaseCar.myApply(car1, ["$", 100000]);
