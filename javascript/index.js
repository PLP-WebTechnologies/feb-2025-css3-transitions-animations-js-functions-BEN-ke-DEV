document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme');
    const speedSelect = document.getElementById('animation-speed');
    const savePrefsBtn = document.getElementById('save-prefs');
    const targetElement = document.getElementById('target-element');
    const triggerBtn = document.getElementById('trigger-animation');
    const resetBtn = document.getElementById('reset-animation');
    
    // Load saved preferences
    loadPreferences();
    
    // Event Listeners
    savePrefsBtn.addEventListener('click', savePreferences);
    triggerBtn.addEventListener('click', triggerRandomAnimation);
    resetBtn.addEventListener('click', resetAnimation);
    targetElement.addEventListener('click', triggerRandomAnimation);
    
    // Save preferences to localStorage
    function savePreferences() {
        const preferences = {
            theme: themeSelect.value,
            animationSpeed: speedSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyPreferences(preferences);
        
        // Show feedback animation
        savePrefsBtn.textContent = 'Saved!';
        setTimeout(() => {
            savePrefsBtn.textContent = 'Save Preferences';
        }, 2000);
    }
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            themeSelect.value = preferences.theme;
            speedSelect.value = preferences.animationSpeed;
            applyPreferences(preferences);
        }
    }
    
    // Apply preferences to the page
    function applyPreferences(preferences) {
        // Apply theme
        document.body.className = '';
        document.body.classList.add(preferences.theme);
        
        // Apply animation speed (will be used when animation is triggered)
        targetElement.classList.remove('slow', 'normal', 'fast');
        targetElement.classList.add(preferences.animationSpeed);
    }
    
    // Trigger a random animation
    function triggerRandomAnimation() {
        // First reset any existing animation
        resetAnimation();
        
        // Array of possible animations
        const animations = ['spin', 'bounce', 'pulse'];
        
        // Select a random animation
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        // Apply the animation class
        setTimeout(() => {
            targetElement.classList.add(randomAnimation);
        }, 10);
        
        // Change the text
        targetElement.textContent = `Animating: ${randomAnimation}`;
    }
    
    // Reset the animation
    function resetAnimation() {
        targetElement.classList.remove('spin', 'bounce', 'pulse');
        targetElement.textContent = 'Click me!';
    }
});