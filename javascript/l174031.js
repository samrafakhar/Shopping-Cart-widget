var Cart = new Array();
var subTotals = [];
var id1 = 1;
var id2 = 1;
var cartID = 1;

function Item(a, b, c, id, cid) {
    this.image = a;
    this.name = b;
    this.price = c;
    this.value = 0;
    this.id = id;
    this.cartID = cid;

    Cart[id] = this;
}

function render(id) {
    var html = "<div id=\"container\"> <div class=\"title\"> My Cart <div class=\"close\" onclick=\"hideObj()\">&#10005;</div> </div>";
    var lol1 = "product" + id1++;
    var lol2 = "product" + id1++;
    var lol3 = "product" + id1++;
    var lol4 = "totalPrice" + cartID;
    html += "<div class = 'item' id='" + lol1 + "'></div>";
    html += "<div class = 'item' id='" + lol2 + "'></div>";
    html += "<div class = 'item' id='" + lol3 + "'></div>";
    html += "<div class=\"totalPrice \">Total Price: <div class=\"result \" id=\"" + lol4 + "\">Rs. 0</div></div>";
    html += "<button id = \"button1\"onclick = \"checkoutFail()\" > Close ";
    html += "<button id = \"button2\" onclick = \"checkout()\" > Checkout  </div>";
    document.getElementById(id).innerHTML = html;
    addItemsToCart();
}

function addItemsToCart() {
    var p1 = new Item("media/img.jpg", "Chronicle of a Death Foretold", 1500, id2, cartID);
    var lol1 = "product" + id2++;
    var p2 = new Item("media/ohyos.jpeg", " One Hundred Years of Solitude", 2000, id2, cartID);
    var lol2 = "product" + id2++;
    var p3 = new Item("media/aop.jpg", "The Autumn of the Patriarch", 1000, id2, cartID);
    var lol3 = "product" + id2++;
    p1.display(lol1);
    p2.display(lol2);
    p3.display(lol3);
    cartID++;
}

Item.prototype.display = function(id) {
    var html = "<div class=\"image\"><img src = '" + this.image + "' height=\"90\" width=\"80\"></img></div>"
    html += "<div class=\"description\">" + this.name + "</div>";
    html += "<div class=\"price\"><a>Rs. " + this.price + "</a></div>";
    html += "<div class=\"value-button\" onclick='spin_previous(\"" + this.id + "\"); PriceUpdate(\"" + this.id + "\")'>-</div>";
    html += "<input class=\"number\" type='number' min='1' value='" + this.value + "' id='" + this.getFieldId() + "'disabled></input>";
    html += "<div class=\"value-button\" onclick='spin_next(\"" + this.id + "\"); PriceUpdate(\"" + this.id + "\");'>+</div>";
    var x = "sub" + this.id;
    html += "<div class=\"subTotal\" id=\"" + x + "\">Rs. 0</div>"
    html += "<div class=\"hide\" onclick='removefromcart(\"" + this.id + "\")'>&#10005;</div>";
    document.getElementById(id).innerHTML = html;
}

Item.prototype.ComputePrice = function(id) {
    var x = this.price * this.value;
    var l = "sub" + this.id;
    subTotals[parseInt(this.id)] = x;
    document.getElementById(l).innerHTML = "Rs. " + x;
}

Item.prototype.getTotal = function() {
    var lol = "totalPrice" + this.cartID;

    var sum = 0;
    var k = (3 * this.cartID) - 2;
    var j = 3 * this.cartID;
    for (i = k; i <= j; i++) {
        if (isNaN(subTotals[i])) {
            continue;
        }
        sum += Number(subTotals[i]);
    }

    document.getElementById(lol).innerHTML = "Rs. " + sum;
}

Item.prototype.removal = function() {
    subTotals[parseInt(this.id)] = 0;
}

Item.prototype.getFieldId = function() {
    return this.id;
}

Item.prototype.increaseValue = function() {
    this.value++;
    document.getElementById(this.getFieldId()).value = this.value;
}

Item.prototype.decreaseValue = function() {
    x = this.value;
    x = x - 1;
    if (x >= 0) {
        this.value = x;
    }
    document.getElementById(this.getFieldId()).value = this.value;
}

function checkoutFail() {
    alert("exiting cart");
    hideObj();
}

function checkout() {
    alert("checkout successful");
    hideObj();
}

function hideObj() {
    var x = document.getElementById("container");
    x.style.display = "none";
    var y = document.getElementById("button1");
    y.style.display = "none";
    var y = document.getElementById("button2");
    y.style.display = "none";
}

function removefromcart(id) {
    var closebtns = document.getElementsByClassName("hide");
    var i;
    for (i = 0; i < closebtns.length; i++) {
        closebtns[i].addEventListener("click", function() {
            this.parentElement.style.display = 'none';
        });
    }
    Cart[id].removal();
    Cart[id].getTotal();
}

function spin_previous(id) {
    Cart[id].decreaseValue();
}

function spin_next(id) {
    Cart[id].increaseValue();
}

function PriceUpdate(id) {
    Cart[id].ComputePrice(id);
    Cart[id].getTotal();
}