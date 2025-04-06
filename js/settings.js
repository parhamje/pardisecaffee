document.addEventListener('DOMContentLoaded', function() {
    // Menu tab switching
    const menuItems = document.querySelectorAll('.setting-item');
    const settingsSections = document.querySelectorAll('.settings-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Hide all settings sections
            settingsSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show corresponding settings section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    
    
    // Save buttons functionality
    const saveButtons = document.querySelectorAll('button[id^="save-"]');
    const saveMessage = document.querySelector('.save-message');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show save message
            saveMessage.style.display = 'block';
            
            // Hide save message after 3 seconds
            setTimeout(() => {
                saveMessage.style.display = 'none';
            }, 3000);
        });
    });
    
    // Logout devices button
    const logoutDevicesBtn = document.getElementById('logout-devices');
    
    logoutDevicesBtn.addEventListener('click', function() {
        if (confirm('آیا مطمئن هستید که می‌خواهید از همه دستگاه‌ها خارج شوید؟')) {
            // Simulating logout
            const loginDevices = document.getElementById('login-devices');
            while (loginDevices.options.length > 1) {
                loginDevices.remove(1);
            }
            
            alert('از همه دستگاه‌ها خارج شدید.');
        }
    });
});