document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    const addStaffBtn = document.getElementById('addStaffBtn');
    const staffModal = document.getElementById('staffModal');
    const shiftModal = document.getElementById('shiftModal');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const cancelStaffBtn = document.getElementById('cancelStaffBtn');
    const cancelShiftBtn = document.getElementById('cancelShiftBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function closeAllModals() {
        modals.forEach(modal => {
            closeModal(modal);
        });
    }
    
    addStaffBtn.addEventListener('click', function() {
        openModal(staffModal);
    });
    
    const addShiftBtns = document.querySelectorAll('.add-shift-btn');
    addShiftBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            openModal(shiftModal);
        });
    });
    
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            openModal(deleteConfirmModal);
        });
    });
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    [cancelStaffBtn, cancelShiftBtn, cancelDeleteBtn].forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const staffTable = document.querySelector('.staff-table');
    const staffRows = staffTable.querySelectorAll('tbody tr');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        
        staffRows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase();
            const position = row.children[1].textContent.toLowerCase();
            const phone = row.children[2].textContent.toLowerCase();
            
            if (name.includes(searchTerm) || position.includes(searchTerm) || phone.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Week navigation
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const currentWeekText = document.querySelector('.current-week');
    
    prevWeekBtn.addEventListener('click', function() {
        // Code to go to previous week would go here
        currentWeekText.textContent = 'هفته 8 فروردین - 14 فروردین 1402';
    });
    
    nextWeekBtn.addEventListener('click', function() {
        // Code to go to next week would go here
        currentWeekText.textContent = 'هفته 22 فروردین - 28 فروردین 1402';
    });
});