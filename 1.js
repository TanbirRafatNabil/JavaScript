const inventory = [
    { id: 101, name: "Wireless Mouse", price: 29.99, stock: 45, category: "Electronics" },
    { id: 102, name: "Mechanical Keyboard", price: 89.99, stock: 12, category: "Electronics" },
    { id: 103, name: "Ergonomic Office Chair", price: 249.99, stock: 4, category: "Furniture" },
    { id: 104, name: "USB-C Hub", price: 19.99, stock: 150, category: "Electronics" },
    { id: 105, name: "Standing Desk", price: 399.99, stock: 2, category: "Furniture" }
];


const customer = {
    name: "Sarah Jenkins",
    isMember: true,
    cart: [
        { id: 101, quantity: 2 },
        { id: 102, quantity: 1 },
        { id: 105, quantity: 1 }
    ]
};

console.log(`=== Processing Order for ${customer.name} ===\n`);

let subtotal = 0;
let shippingFee = 0;
let discountAmount = 0;


for (let i = 0; i < customer.cart.length; i++) {
    let cartItem = customer.cart[i];
    let matchedProduct = null;

    
    for (let j = 0; j < inventory.length; j++) {
        if (inventory[j].id === cartItem.id) {
            matchedProduct = inventory[j];
            break; 
        }
    }

    
    if (matchedProduct !== null) {
        
        
        if (matchedProduct.stock >= cartItem.quantity) {
            let itemTotal = matchedProduct.price * cartItem.quantity;
            subtotal += itemTotal;
            console.log(`[SUCCESS] Added ${cartItem.quantity}x ${matchedProduct.name} ($${matchedProduct.price} each) = $${itemTotal.toFixed(2)}`);
            
            
            matchedProduct.stock -= cartItem.quantity;
            
        } else {
            console.log(`[WARNING] Insufficient stock for ${matchedProduct.name}. Requested: ${cartItem.quantity}, Available: ${matchedProduct.stock}`);
        }
        
    } else {
        console.log(`[ERROR] Product with ID ${cartItem.id} not found in inventory database.`);
    }
}

console.log(`\nSubtotal: $${subtotal.toFixed(2)}`);


if (subtotal >= 300) {
    discountAmount = subtotal * 0.15; 
    console.log(`Discount Applied: 15% bulk discount (-$${discountAmount.toFixed(2)})`);
} else if (subtotal >= 150) {
    discountAmount = subtotal * 0.10; 
    console.log(`Discount Applied: 10% order discount (-$${discountAmount.toFixed(2)})`);
} else {
    console.log(`Discount Applied: None (Spend over $150 to unlock discounts)`);
}

if (customer.isMember && subtotal > 50) {
    let memberBonus = 5.00;
    discountAmount += memberBonus;
    console.log(`Member Perk: Extra $${memberBonus.toFixed(2)} loyalty credit applied!`);
}

let discountedTotal = subtotal - discountAmount;

if (discountedTotal >= 200) {
    shippingFee = 0.00;
    console.log(`Shipping: FREE (Order qualifies for free shipping over $200)`);
} else {
    shippingFee = 15.00;
    console.log(`Shipping: Standard flat fee of $${shippingFee.toFixed(2)}`);
}

let finalTotal = discountedTotal + shippingFee;

console.log(`\n----------------------------------------`);
console.log(`FINAL TOTAL DUE: $${finalTotal.toFixed(2)}`);
console.log(`----------------------------------------`);