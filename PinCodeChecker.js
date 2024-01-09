const data = {
  deliveryLocations: [
    {
      pincode: "110001",
      estimatedDeliveryDays: 2,
      locationName: "Connaught Place, Delhi",
    },
    {
      pincode: "400001",
      estimatedDeliveryDays: 3,
      locationName: "Fort, Mumbai",
    },
    {
      pincode: "700001",
      estimatedDeliveryDays: 4,
      locationName: "Dalhousie Square, Kolkata",
    },
    {
      pincode: "600001",
      estimatedDeliveryDays: 3,
      locationName: "Parrys Corner, Chennai",
    },
    {
      pincode: "500001",
      estimatedDeliveryDays: 2,
      locationName: "Afzal Gunj, Hyderabad",
    },
    {
      pincode: "110020",
      estimatedDeliveryDays: 5,
      locationName: "Hauz Khas, Delhi",
    },
    {
      pincode: "400020",
      estimatedDeliveryDays: 4,
      locationName: "Worli, Mumbai",
    },
    {
      pincode: "700020",
      estimatedDeliveryDays: 3,
      locationName: "Salt Lake City, Kolkata",
    },
    {
      pincode: "600020",
      estimatedDeliveryDays: 2,
      locationName: "Anna Nagar, Chennai",
    },
    {
      pincode: "500020",
      estimatedDeliveryDays: 4,
      locationName: "Banjara Hills, Hyderabad",
    },
  ],
};

class PincodeChecker extends HTMLElement {
  constructor() {
    super();
    this.inputEle = this.querySelector(".in");
    this.btnEle = this.querySelector("#btn");
    this.pincodeMessage = this.querySelector("#p");

    this.inputEle.addEventListener("click", this.clearInputValues.bind(this));
    this.btnEle.addEventListener("click", this.validatePin.bind(this));

  }
  clearInputValues(e) {
    if (e.target.value !== "") {
      this.inputEle.value = "";
      this.pincodeMessage.innerHTML = "";
    }
  }
  validatePin() {
    if (this.inputEle.value.length === 6) {
      let pinCode = this.inputEle.value;
      let details = data.deliveryLocations;
      let res = details.filter((e) => e.pincode == pinCode);
      if (res[0] !== undefined) {
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + res[0].estimatedDeliveryDays);

        const dayName = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
        }).format(todayDate);

        const dayOfMonth = todayDate.getDate();

        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(todayDate);

        const deliveryDate = `Delivery date is: ${dayName}, ${dayOfMonth} ${monthName}`;
        // console.log(deliveryDate);
        this.pincodeMessage.textContent = deliveryDate;
      } else {
        this.pincodeMessage.textContent = "Area not Serviceable";
      }
    } else {
      this.pincodeMessage.textContent = "Area not Serviceable";
    }
  }
}

customElements.define("pincode-checker", PincodeChecker);
