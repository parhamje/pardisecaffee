let inventory = [
    {
        id: 1,
        name: "دانه قهوه کلمبیا",
        category: "دانه قهوه",
        quantity: 15,
        unit: "کیلوگرم",
        threshold: 5
    },
    {
        id: 2,
        name: "شیر کامل",
        category: "شیر و لبنیات",
        quantity: 8,
        unit: "لیتر",
        threshold: 4
    },
    {
        id: 3,
        name: "شربت وانیل",
        category: "شربت‌ها",
        quantity: 3,
        unit: "بطری",
        threshold: 2
    },
    {
        id: 4,
        name: "لیوان کاغذی (۳۶۰ میلی‌لیتر)",
        category: "تجهیزات",
        quantity: 120,
        unit: "عدد",
        threshold: 50
    },
    {
        id: 5,
        name: "شیر بادام",
        category: "شیر و لبنیات",
        quantity: 0,
        unit: "لیتر",
        threshold: 2
    }
];

// Initialize activity log
let activityLog = [
    {
        date: new Date("2025-03-08T09:30:00"),
        action: "افزوده شد",
        item: "دانه قهوه کلمبیا",
        quantity: 5
    },
    {
        date: new Date("2025-03-09T14:15:00"),
        action: "کاهش یافت",
        item: "شیر کامل",
        quantity: 2
    },
    {
        date: new Date("2025-03-10T08:00:00"),
        action: "بروزرسانی شد",
        item: "لیوان کاغذی (۳۶۰ میلی‌لیتر)",
        quantity: 120
    }
];

// DOM Elements
const inventoryBody = document.getElementById("inventoryBody");
const activityBody = document.getElementById("activityBody");
const totalItemsEl = document.getElementById("totalItems");
const lowStockItemsEl = document.getElementById("lowStockItems");
const outOfStockItemsEl = document.getElementById("outOfStockItems");
const categoryFilter = document.getElementById("categoryFilter");
const stockFilter = document.getElementById("stockFilter");

// Modals
const addItemBtn = document.getElementById("addItemBtn");
const addItemModal = document.getElementById("addItemModal");
const closeAddModal = document.getElementById("closeAddModal");
const addItemForm = document.getElementById("addItemForm");

const updateQuantityModal = document.getElementById("updateQuantityModal");
const closeUpdateModal = document.getElementById("closeUpdateModal");
const updateQuantityForm = document.getElementById("updateQuantityForm");

// Initialize the app
function init() {
    renderInventory();
    renderActivityLog();
    updateStats();
    setupEventListeners();
}

// Render inventory table
function renderInventory(categoryValue = "", stockValue = "") {
    // Filter the inventory based on selected filters
    let filteredInventory = inventory;
    
    if (categoryValue) {
        filteredInventory = filteredInventory.filter(item => item.category === categoryValue);
    }
    
    if (stockValue) {
        if (stockValue === "low") {
            filteredInventory = filteredInventory.filter(item => 
                item.quantity > 0 && item.quantity <= item.threshold);
        } else if (stockValue === "out") {
            filteredInventory = filteredInventory.filter(item => item.quantity === 0);
        } else if (stockValue === "ok") {
            filteredInventory = filteredInventory.filter(item => item.quantity > item.threshold);
        }
    }
    
    inventoryBody.innerHTML = "";
    
    filteredInventory.forEach(item => {
        const row = document.createElement("tr");
        
        // Determine stock status
        let statusClass = "status-ok";
        let statusText = "موجود";
        
        if (item.quantity === 0) {
            statusClass = "status-critical";
            statusText = "ناموجود";
        } else if (item.quantity <= item.threshold) {
            statusClass = "status-warning";
            statusText = "کم موجود";
        }
        
        row.innerHTML = `
            <td data-label="کالا">${item.name}</td>
            <td data-label="دسته‌بندی">${item.category}</td>
            <td data-label="تعداد">${item.quantity} ${item.unit}</td>
            <td data-label="وضعیت"><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td data-label="عملیات">
                <button class="btn update-btn" data-id="${item.id}">بروزرسانی</button>
            </td>
        `;
        
        inventoryBody.appendChild(row);
    });
    
    // Add event listeners to update buttons
    document.querySelectorAll(".update-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            openUpdateModal(parseInt(btn.getAttribute("data-id")));
        });
    });
}

// Render activity log
function renderActivityLog() {
    activityBody.innerHTML = "";
    
    // Sort activity by date (newest first)
    const sortedActivity = [...activityLog].sort((a, b) => b.date - a.date);
    
    // Show only the 10 most recent activities
    const recentActivity = sortedActivity.slice(0, 10);
    
    recentActivity.forEach(activity => {
        const row = document.createElement("tr");
        
        // Format date according to Persian style
        const formattedDate = formatPersianDate(activity.date);
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${activity.action}</td>
            <td>${activity.item}</td>
            <td>${activity.quantity}</td>
        `;
        activityBody.appendChild(row);
    });
}

// Format date for activity log in Persian style
function formatPersianDate(date) {
    // This is a simple date formatter - for full Persian calendar,
    // you'd need a Persian calendar library like moment-jalaali
    return `${date.toLocaleDateString('fa-IR')} ${date.toLocaleTimeString('fa-IR', {hour: '2-digit', minute:'2-digit'})}`;
}

// Update dashboard stats
function updateStats() {
    const total = inventory.length;
    const lowStock = inventory.filter(item => item.quantity > 0 && item.quantity <= item.threshold).length;
    const outOfStock = inventory.filter(item => item.quantity === 0).length;
    
    totalItemsEl.textContent = total;
    lowStockItemsEl.textContent = lowStock;
    outOfStockItemsEl.textContent = outOfStock;
}

// Set up event listeners
function setupEventListeners() {
    // Filter change events
    categoryFilter.addEventListener("change", () => {
        renderInventory(categoryFilter.value, stockFilter.value);
    });
    
    stockFilter.addEventListener("change", () => {
        renderInventory(categoryFilter.value, stockFilter.value);
    });
    
    // Add item modal
    addItemBtn.addEventListener("click", () => {
        addItemModal.style.display = "flex";
    });
    
    closeAddModal.addEventListener("click", () => {
        addItemModal.style.display = "none";
    });
    
    // Close update modal
    closeUpdateModal.addEventListener("click", () => {
        updateQuantityModal.style.display = "none";
    });
    
    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === addItemModal) {
            addItemModal.style.display = "none";
        }
        if (e.target === updateQuantityModal) {
            updateQuantityModal.style.display = "none";
        }
    });
    
    // Add item form submission
    addItemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewItem();
    });
    
    // Update quantity form submission
    updateQuantityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateItemQuantity();
    });
}

// Add new item to inventory
function addNewItem() {
    const newItem = {
        id: generateId(),
        name: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        quantity: parseInt(document.getElementById("quantity").value),
        unit: document.getElementById("unit").value,
        threshold: parseInt(document.getElementById("threshold").value)
    };
    
    // Add to inventory
    inventory.push(newItem);
    
    // Log activity
    logActivity("افزوده شد", newItem.name, newItem.quantity);
    
    // Update UI
    renderInventory(categoryFilter.value, stockFilter.value);
    renderActivityLog();
    updateStats();
    
    // Reset form and close modal
    addItemForm.reset();
    addItemModal.style.display = "none";
}

// Open update quantity modal
function openUpdateModal(itemId) {
    const item = inventory.find(item => item.id === itemId);
    
    if (item) {
        document.getElementById("updateItemId").value = item.id;
        document.getElementById("updateItemName").value = item.name;
        document.getElementById("currentQuantity").value = item.quantity;
        document.getElementById("updateQuantity").value = "";
        
        updateQuantityModal.style.display = "flex";
    }
}

// Update item quantity
function updateItemQuantity() {
    const itemId = parseInt(document.getElementById("updateItemId").value);
    const action = document.getElementById("action").value;
    const updateQuantity = parseInt(document.getElementById("updateQuantity").value);
    
    const itemIndex = inventory.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        const oldQuantity = inventory[itemIndex].quantity;
        let newQuantity = oldQuantity;
        
        switch (action) {
            case "add":
                newQuantity = oldQuantity + updateQuantity;
                logActivity("افزوده شد", inventory[itemIndex].name, updateQuantity);
                break;
            case "remove":
                newQuantity = Math.max(0, oldQuantity - updateQuantity);
                logActivity("کاهش یافت", inventory[itemIndex].name, updateQuantity);
                break;
            case "set":
                newQuantity = updateQuantity;
                logActivity("بروزرسانی شد", inventory[itemIndex].name, updateQuantity);
                break;
        }
        
        // Update inventory
        inventory[itemIndex].quantity = newQuantity;
        
        // Update UI
        renderInventory(categoryFilter.value, stockFilter.value);
        renderActivityLog();
        updateStats();
        
        // Close modal
        updateQuantityModal.style.display = "none";
    }
}

// Log activity
function logActivity(action, item, quantity) {
    activityLog.push({
        date: new Date(),
        action,
        item,
        quantity
    });
}

// Generate unique ID for new items
function generateId() {
    return inventory.length > 0 ? Math.max(...inventory.map(item => item.id)) + 1 : 1;
}

// Initialize app
init();