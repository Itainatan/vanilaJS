import { users } from "./users.js";

const URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const KEY = "&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8";

window.onload = function () {
  startUsers(users);
  let addsUser = document.querySelector("#addUser");
  addsUser.onclick = () => addsNewUsers();
};

//function to load the exist users in the page
function startUsers(users) {
  let targerContainer = document.getElementById("users-container");
  let template = document.getElementById("card");
  for (let user of users) {
    let clonedContainer = template.cloneNode(true);
    let values = getElements(clonedContainer);
    setValues(user, values);
    targerContainer.appendChild(clonedContainer);
    clonedContainer.removeAttribute("hidden");
  }
}

//targeting the elements in the page
function getElements(clonedContainer) {
  let obj = {
    the_image: clonedContainer.querySelector("#image"),
    name: clonedContainer.querySelector("#name"),
    location: clonedContainer.querySelector("#location"),
    address: clonedContainer.querySelector("#address"),
    phone: clonedContainer.querySelector("#phone"),
    job: clonedContainer.querySelector("#job"),
    del: clonedContainer.querySelector("#del"),
    edit: clonedContainer.querySelector("#edit")
  };

  return obj;
}

//sets the values for each user
function setValues(user, values) {
  let { the_image, name, location, address, phone, job, del, edit } = values;
  the_image.src = user.imgUrl;
  name.innerHTML = user.name;
  address.innerHTML = user.address;
  phone.innerHTML = 'P: ' + user.phone;
  job.innerHTML = user.job;
  location.innerHTML = '...';
  del.onclick = e => delFunc(e);
  edit.onclick = e => editFunc(e);
}

//function to edit user
function editFunc(e) {
  const node = e.target.parentElement.parentElement.parentElement;
  let values = getElements(node)
  setEditAble(values);
}

//set editable or not for user
function setEditAble(values) {
  let { name, location, address, phone, job } = values;
  name.contentEditable = getEditAble(name.contentEditable);
  location.contentEditable = getEditAble(location.contentEditable);
  address.contentEditable = getEditAble(address.contentEditable);
  phone.contentEditable = getEditAble(phone.contentEditable);
  job.contentEditable = getEditAble(job.contentEditable);
}

//return if to be editable or not
function getEditAble(value) {
  return value == "inherit" ? "true" : "false";
}

//function to delete user
function delFunc(e) {
  const node = e.target.parentElement.parentElement.parentElement;
  node.parentNode.removeChild(node);
}

//funtion for create new user on click plus button
function addsNewUsers() {
  setError(false);
  let values = valuesNewUser();
  checkValidation(values);
}

//gets the values from the inputs of new user
function valuesNewUser() {
  let obj = {
    name: document.getElementById("nameAddUser").value,
    address: document.getElementById("addressAddUser").value,
    job: document.getElementById("jobAddUser").value,
    phone: document.getElementById("phoneAddUser").value,
  };

  return obj;
}

//validation for 4 inputs of create new user, if ok - adding the new user
function checkValidation(values) {
  let { name, address, job, phone } = values;
  if (name && address && job && checkPhone(phone)) {
    let arr = [
      {
        name,
        address,
        job,
        phone,
        imgUrl: "Assets/john-smith.jpg"
      }
    ];
    startUsers(arr);
  }
  else
    setError(true);
}

//validation for phone
function checkPhone(phone) {
  var phoneRe = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
  var digits = phone.replace(/\D/g, "");
  return phoneRe.test(digits);
}

//setting error message if values of the inputs not correct
function setError(bool) {
  let error = document.getElementById("error");
  bool ? error.innerHTML = "check inputs again" : error.innerHTML = "";
}

//function to fetch from API the Lat,Long -> but key not working.
async function setLocation(address) {
  const results = await fetch(`${URL + address + KEY}`);
  const resJson = await results.json();
}