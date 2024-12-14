// IP Check Function
async function checkIP() {
    try {
        // Fetch allowed IPs
        const response = await fetch('https://raw.githubusercontent.com/SpEc012/VenChecker/refs/heads/main/allowed-ips');
        const allowedIPs = await response.text();
        const allowedIPArray = allowedIPs.split('\n').map(ip => ip.trim()).filter(ip => ip);

        // Get user's IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;

        console.log('Checking IP:', userIP);
        console.log('Allowed IPs:', allowedIPArray);

        // Check if user's IP is allowed
        if (allowedIPArray.includes(userIP)) {
            return true;
        } else {
            window.location.href = 'unauthorized.html';
            return false;
        }
    } catch (error) {
        console.error('Error checking IP:', error);
        alert('Error checking access. Please try again later.');
        return false;
    }
}

// Handle site initialization
document.addEventListener('DOMContentLoaded', function() {
    const entranceOverlay = document.querySelector('.entrance-overlay');
    const entranceButton = document.querySelector('.entrance-button');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    const contentSection = document.querySelector('.content-section');

    let loadingMessages = [
        'Authorizing Access...',
        'Checking IP Address...',
        'Verifying Credentials...',
        'Securing Connection...'
    ];
    let messageIndex = 0;

    function cycleLoadingMessage() {
        const loadingMessage = document.querySelector('.loading-message');
        if (!loadingMessage) return;
        
        loadingMessage.style.opacity = '0';
        setTimeout(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingMessage.textContent = loadingMessages[messageIndex];
            loadingMessage.style.opacity = '1';
        }, 500);
    }

    function showMainContent() {
        if (mainContent) {
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                if (contentSection) {
                    contentSection.classList.add('visible');
                }
                // Initialize smooth scrolling after content is visible
                initSmoothScrolling();
            }, 100);
        }
    }

    function initSmoothScrolling() {
        const navTabs = document.querySelectorAll('.nav-tab');
        
        // Add click event to each tab
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = tab.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Update active tab on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('div[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('href').includes(current)) {
                    tab.classList.add('active');
                }
            });
        });
    }

    // Add policy button handler
    const policyButtons = document.querySelectorAll('.policy-tab');
    policyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('privacy.html', '_blank');
        });
    });

    // Add click event listener to entrance button
    if (entranceButton) {
        console.log('Entrance button found');
        entranceButton.addEventListener('click', async function() {
            console.log('Enter button clicked');
            
            // Fade out entrance overlay
            entranceOverlay.style.opacity = '0';
            setTimeout(() => {
                entranceOverlay.style.display = 'none';
                
                // Show loading screen
                if (loadingScreen) {
                    loadingScreen.style.display = 'flex';
                    loadingScreen.style.opacity = '1';
                    
                    // Start cycling loading messages
                    const messageInterval = setInterval(cycleLoadingMessage, 2000);
                    
                    // Check IP after 5 seconds
                    setTimeout(async () => {
                        const isAllowed = await checkIP();
                        clearInterval(messageInterval);
                        
                        if (isAllowed) {
                            // Hide loading screen
                            loadingScreen.style.opacity = '0';
                            setTimeout(() => {
                                loadingScreen.style.display = 'none';
                                showMainContent();
                            }, 500);
                        }
                    }, 5000);
                }
            }, 500);
        });
    } else {
        console.error('Entrance button not found');
    }
});