

export function getBusiness(user_id, callback) {
      let formData = new FormData();
      formData.append("user_id", user_id);
      fetch('http://u103146.na4u.ru/business', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
            // console.log('res business', data)
            return callback(data.business)
        });
}

export function getCounterparties(user_id, business_id, callback) {
  let formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("business_id", business_id);
  fetch('http://u103146.na4u.ru/counterparties', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res getCounterparties', data)
        return callback(data.counterparties)
    });
}



//EMPLOYS

export function getEmploys(user_id, business_id, callback) {
  let formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("business_id", business_id);
  fetch('http://u103146.na4u.ru/employs', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res getEmploys', data)
        return callback(data.employs)
    });
}

export function getRoles(employ_id, callback) {
  fetch('http://u103146.na4u.ru/roles', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      employ_id: employ_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res roles', data)
        return callback(data)
    });
}

export function sendDeleteEmployRole(role_id, callback) {
  fetch('http://u103146.na4u.ru/delrole', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      role_id: role_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res delrole', data)
        return callback(data)
    });
}


export function sendSetEmployRole(employ_id, role_id, callback) {
  fetch('http://u103146.na4u.ru/setrole', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      role_id: role_id,
      employ_id: employ_id
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res setrole', data)
        return callback(data)
    });
}


export function getRoleCounters(role_id, employ_id, callback) {
  fetch('http://u103146.na4u.ru/getrolecounters', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      role_id: role_id,
      employ_id: employ_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res getrolecounters', data)
        return callback(data)
    });
}


export function sendSetCounter(role_id, counter_id, callback) {
  fetch('http://u103146.na4u.ru/setrolecounter', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      role_id: role_id,
      counter_id, counter_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res getrolecounters', data)
        return callback(data)
    });
}


export function sendSetSalaryType(role_counter_id, type_salary, salary, callback) {
  fetch('http://u103146.na4u.ru/setsalarytype', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      role_counter_id: role_counter_id,
      type_salary: type_salary,
      salary: salary,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res setsalarytype', data)
        return callback(data)
    });
}


export function sendNewEmploy(business_id, name, mail, callback) {
  let formData = new FormData();
  formData.append("business_id", parseInt(business_id));
  formData.append("name", name);
  formData.append("mail", mail);
  fetch('http://u103146.na4u.ru/newemploy', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newemploy', data)
        return callback(data)
    });
}

export function sendInfoEmploy(employ_id, callback) {
  fetch('http://u103146.na4u.ru/infoemploy', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      employ_id: employ_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res infoemploy', data)
        return callback(data)
    });
}


export function sendNewBusiness(user_id, business_name, callback) {
      let formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("business_name", business_name);
      fetch('http://u103146.na4u.ru/newbusiness', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
            console.log('res newbusiness', data)
            return callback(data)
        });
}


// GROUPS

export function getGroups(user_id, business_id, group_id, callback) {
  let formData = new FormData();
  formData.append("business_id", business_id);
  formData.append("user_id", user_id);
  formData.append("group_id", group_id);
  fetch('http://u103146.na4u.ru/groups', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        // console.log('res groups', data)
        return callback(data.groups)
    });
}

export function sendNewGroup(business_id, group_name, group_id, callback) {
  let formData = new FormData();
  formData.append("business_id", parseInt(business_id));
  formData.append("group_name", group_name);
  formData.append("group_id", group_id);
  fetch('http://u103146.na4u.ru/newgroup', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newgroup', data)
        return callback(data)
    });
}


export function sendEditGroup(group_id, group_name, callback) {
  fetch('http://u103146.na4u.ru/editgroup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      group_id: group_id,
      group_name: group_name,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res editgroup', data)
        return callback(data)
    });
}

// COUNTERPARTIES

export function sendNewCounterparty(business_id, name, address, callback) {
  let formData = new FormData();
  formData.append("business_id", parseInt(business_id));
  formData.append("name", name);
  formData.append("address", address);
  fetch('http://u103146.na4u.ru/newcounterparty', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newcounterparty', data)
        return callback(data)
    });
}


// PRODUCTS

export function getProducts(group_id, callback) {
  let formData = new FormData();
  formData.append("group_id", group_id);
  fetch('http://u103146.na4u.ru/products', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        // console.log('res products', data)
        return callback(data.products)
    });
}

export function sendNewProduct(group_id, product_name, business_id, callback) {
  let formData = new FormData();
  formData.append("group_id", group_id);
  formData.append("product_name", product_name);
  formData.append("business_id", business_id);
  fetch('http://u103146.na4u.ru/newproduct', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newproduct', data)
        return callback(data)
    });
}

export function sendEditProduct(product_id, product_name, callback) {
  fetch('http://u103146.na4u.ru/editproduct', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      product_id: product_id,
      product_name: product_name,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res editproduct', data)
        return callback(data)
    });
}

// WAREHOUSES

export function getProductsWarehouse(group_id, warehouse_id, callback) {
  let formData = new FormData();
  formData.append("group_id", group_id);
  formData.append("warehouse_id", warehouse_id);
  fetch('http://u103146.na4u.ru/products/warehouse', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res warehouse products', data)
        return callback(data.products)
    });
}

export function getWareHouses(business_id, user_id, callback) {
  let formData = new FormData();
  formData.append("business_id", business_id);
  formData.append("user_id", user_id);
  fetch('http://u103146.na4u.ru/warehouses', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        // console.log('res products', data)
        return callback(data.warehouses)
    });

}

//SALES
export function getSaleProducts(sale_id, callback) {
  let formData = new FormData();
  formData.append("sale_id", sale_id);
  fetch('http://u103146.na4u.ru/saleproducts', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        // console.log('res products', data)
        return callback(data.saleproducts)
    });
}

export function getSales(business_id, user_id, date_start, date_end, callback) {
  let formData = new FormData();
  formData.append("business_id", business_id);
  formData.append("user_id", user_id);
  formData.append("date_start", date_start.toISOString().slice(0, 19).replace('T', ' '));
  formData.append("date_end", date_end.toISOString().slice(0, 19).replace('T', ' '));
  console.log('date_start', date_start.toISOString().slice(0, 19).replace('T', ' '))
  console.log('date_end', date_end.toISOString().slice(0, 19).replace('T', ' '))
  fetch('http://u103146.na4u.ru/sales', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        // console.log('res products', data)
        return callback(data.sales)
    });

}

export function sendNewWarehouse(business_id, name, callback) {
  let formData = new FormData();
  formData.append("business_id", business_id);
  formData.append("name", name);
  fetch('http://u103146.na4u.ru/newwarehouse', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newwarehouse', data)
        return callback(data)
    });
}

export function sendNewSale(business_id, counterparty_id, listProducts, typeSale, SaleId, WareHouse_id, callback) {
  
  fetch('http://u103146.na4u.ru/newsale', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      business_id: business_id,
      counterparty_id: counterparty_id,
      listProducts: listProducts,
      typeSale: typeSale,
      SaleId: SaleId,
      WareHouse_id: WareHouse_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newsale', data)
        return callback(data)
    });
}

export function sendNewStatus(user_id, sale_id, status, WareHouse_id, counterparty_id, callback) {
  fetch('http://u103146.na4u.ru/newstatus', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      user_id: user_id,
      sale_id: sale_id,
      status: status,
      warehouse_id: WareHouse_id,
      counterparty_id: counterparty_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newstatus', data)
        return callback(data)
    });
}



//BUYIES

export function sendNewStatusBuy(buy_id, status, WareHouse_id, callback) {
  fetch('http://u103146.na4u.ru/newstatusbuy', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      buy_id: buy_id,
      status: status,
      warehouse_id: WareHouse_id
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newstatus', data)
        return callback(data)
    });
}


export function getBuyies(user_id, business_id, date_start, date_end, callback) {
  let formData = new FormData();
  formData.append("business_id", business_id);
  formData.append("user_id", user_id);
  formData.append("date_start", date_start.toISOString().slice(0, 19).replace('T', ' '));
  formData.append("date_end", date_end.toISOString().slice(0, 19).replace('T', ' '));
  console.log('business_id', business_id)
  fetch('http://u103146.na4u.ru/buyies', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        // console.log('res products', data)
        return callback(data.buyies)
    });

}

export function sendNewBuy(business_id, counterparty_id, listProducts, typeBuy, BuyId, WareHouse_id, callback) {
  fetch('http://u103146.na4u.ru/newbuy', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      business_id: business_id,
      counterparty_id: counterparty_id,
      warehouse_id: WareHouse_id,
      listProducts: listProducts,
      typeBuy: typeBuy,
      BuyId: BuyId,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newstatus', data)
        return callback(data)
    });
}



export function getBuyProducts(buy_id, callback) {
  let formData = new FormData();
  formData.append("buy_id", buy_id);
  fetch('http://u103146.na4u.ru/buyproducts', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
        // console.log('res products', data)
        return callback(data.buyproducts)
    });
}


//BANKS


export function getBanks(user_id, business_id, callback) {
  fetch('http://u103146.na4u.ru/getbanks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      user_id: user_id,
      business_id: business_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res getbanks', data)
        return callback(data.banks)
    });
}


export function sendNewBank(business_id, name_bank, money, is_cash, callback) {
  
  fetch('http://u103146.na4u.ru/newbank', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      business_id: business_id,
      name_bank: name_bank,
      money: money,
      is_cash: is_cash,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newbank', data)
        return callback(data)
    });
}


//PAYMENTS


export function getPayments(bank_id, callback) {
  fetch('http://u103146.na4u.ru/getpayments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      bank_id: bank_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res getpayments', data)
        return callback(data.payments)
    });
}


export function sendNewPayment(bank_id, counterparty_id, money, incoming, sale_id,  callback) {
  
  fetch('http://u103146.na4u.ru/newpayment', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      bank_id: bank_id,
      counterparty_id: counterparty_id,
      money: money,
      incoming: incoming,
      sale_id: sale_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        console.log('res newpayment', data)
        return callback(data)
    });
}
