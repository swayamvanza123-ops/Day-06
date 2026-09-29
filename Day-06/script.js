/* =========================================
   PRODUCT DATA
========================================= */

let products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 50000,
        stock: 20
    },

    {
        id: 2,
        name: "Mouse",
        category: "Accessories",
        price: 800,
        stock: 50
    },

    {
        id: 3,
        name: "Monitor",
        category: "Electronics",
        price: 12000,
        stock: 5
    },

    {
        id: 4,
        name: "Keyboard",
        category: "Accessories",
        price: 1500,
        stock: 8
    },

    {
        id: 5,
        name: "Headphones",
        category: "Accessories",
        price: 2500,
        stock: 15
    },

    {
        id: 6,
        name: "Printer",
        category: "Electronics",
        price: 15000,
        stock: 5
    },

    {
        id: 7,
        name: "Webcam",
        category: "Electronics",
        price: 3500,
        stock: 12
    },

    {
        id: 8,
        name: "USB Cable",
        category: "Accessories",
        price: 500,
        stock: 25
    }
];


/* =========================================
   EDIT MODE
========================================= */

let editingProductId = null;


/* =========================================
   HTML ELEMENTS
========================================= */

const productForm =
    document.getElementById("productForm");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");

const productTable =
    document.getElementById("productTable");

const addProductButton =
    document.getElementById("addProduct");

const cancelEditButton =
    document.getElementById("cancelEdit");

const formTitle =
    document.getElementById("formTitle");

const searchProduct =
    document.getElementById("searchProduct");

const statusFilter =
    document.getElementById("statusFilter");


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts() {

    productTable.innerHTML = "";

    let searchText =
        searchProduct.value.toLowerCase();

    let filter =
        statusFilter.value;


    /* FILTER PRODUCTS */

    let filteredProducts =
        products.filter(function(product) {

            let matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);

            let matchesFilter = true;


            if (filter === "available") {

                matchesFilter =
                    product.stock >= 10;

            }


            if (filter === "low") {

                matchesFilter =
                    product.stock < 10;

            }


            return matchesSearch && matchesFilter;

        });


    /* NO PRODUCTS */

    if (filteredProducts.length === 0) {

        productTable.innerHTML = `
            <tr>
                <td colspan="6" class="no-products">
                    No products found
                </td>
            </tr>
        `;

        return;
    }


    /* CREATE TABLE ROWS */

    filteredProducts.forEach(function(product) {

        let status;

        let statusClass;


        if (product.stock < 10) {

            status = "Low Stock";
            statusClass = "low-stock";

        } else {

            status = "Available";
            statusClass = "available";

        }


        let row = document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${product.name}</strong>
            </td>

            <td>
                ${product.category}
            </td>

            <td>
                ₹${product.price.toLocaleString("en-IN")}
            </td>

            <td>
                ${product.stock}
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${status}
                </span>
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        ✏️ Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        🗑 Delete
                    </button>

                </div>

            </td>

        `;


        productTable.appendChild(row);

    });

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    /* Total Products */

    let totalProducts =
        products.length;


    /* Total Stock */

    let totalStock =
        products.reduce(function(total, product) {

            return total + product.stock;

        }, 0);


    /* Low Stock */

    let lowStock =
        products.filter(function(product) {

            return product.stock < 10;

        }).length;


    /* Inventory Value */

    let inventoryValue =
        products.reduce(function(total, product) {

            return total +
                (product.price * product.stock);

        }, 0);


    /* Display Values */

    document.getElementById("totalProducts")
        .textContent = totalProducts;


    document.getElementById("totalStock")
        .textContent = totalStock;


    document.getElementById("lowStock")
        .textContent = lowStock;


    document.getElementById("inventoryValue")
        .textContent =
        "₹" + inventoryValue.toLocaleString("en-IN");
}


/* =========================================
   ADD / UPDATE PRODUCT
========================================= */

productForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        let name =
            productName.value.trim();

        let category =
            productCategory.value;

        let price =
            Number(productPrice.value);

        let stock =
            Number(productStock.value);


        /* VALIDATION */

        if (
            name === "" ||
            category === "" ||
            price < 0 ||
            stock < 0
        ) {

            alert("Please enter valid product details.");

            return;
        }


        /* =================================
           UPDATE PRODUCT
        ================================= */

        if (editingProductId !== null) {

            let product =
                products.find(function(product) {

                    return product.id === editingProductId;

                });


            if (product) {

                product.name = name;

                product.category = category;

                product.price = price;

                product.stock = stock;

            }


            alert("Product updated successfully!");


            exitEditMode();

        }


        /* =================================
           CREATE PRODUCT
        ================================= */

        else {

            let newProduct = {

                id: Date.now(),

                name: name,

                category: category,

                price: price,

                stock: stock

            };


            products.push(newProduct);


            alert("Product added successfully!");


            productForm.reset();

        }


        /* REFRESH */

        displayProducts();

        updateDashboard();

    }
);


/* =========================================
   EDIT PRODUCT
========================================= */

function editProduct(id) {

    let product =
        products.find(function(product) {

            return product.id === id;

        });


    if (!product) {

        return;

    }


    /* Store ID */

    editingProductId = id;


    /* Load Product Data */

    productName.value =
        product.name;

    productCategory.value =
        product.category;

    productPrice.value =
        product.price;

    productStock.value =
        product.stock;


    /* Change Form */

    formTitle.textContent =
        "Edit Product";

    addProductButton.textContent =
        "✏️ Update Product";


    /* Show Cancel */

    cancelEditButton.style.display =
        "inline-block";


    /* Scroll to form */

    document.querySelector(".form-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CANCEL EDIT
========================================= */

cancelEditButton.addEventListener(
    "click",
    function() {

        exitEditMode();

    }
);


/* =========================================
   EXIT EDIT MODE
========================================= */

function exitEditMode() {

    editingProductId = null;


    /* Clear form */

    productForm.reset();


    /* Restore form title */

    formTitle.textContent =
        "Add New Product";


    /* Restore button */

    addProductButton.textContent =
        "➕ Add Product";


    /* Hide cancel */

    cancelEditButton.style.display =
        "none";

}


/* =========================================
   DELETE PRODUCT
========================================= */

function deleteProduct(id) {

    let product =
        products.find(function(product) {

            return product.id === id;

        });


    if (!product) {

        return;

    }


    /* CONFIRMATION */

    let confirmed =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmed) {

        return;

    }


    /* DELETE */

    products =
        products.filter(function(product) {

            return product.id !== id;

        });


    /* If deleting currently edited product */

    if (editingProductId === id) {

        exitEditMode();

    }


    /* REFRESH */

    displayProducts();

    updateDashboard();


    alert("Product deleted successfully!");

}


/* =========================================
   SEARCH
========================================= */

searchProduct.addEventListener(
    "input",
    function() {

        displayProducts();

    }
);


/* =========================================
   STATUS FILTER
========================================= */

statusFilter.addEventListener(
    "change",
    function() {

        displayProducts();

    }
);


/* =========================================
   INITIAL LOAD
========================================= */

displayProducts();

updateDashboard();