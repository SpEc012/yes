// Security measures
(function() {
    // Disable right click
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
            (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
        ) {
            e.preventDefault();
        }

        // Prevent Ctrl+S
        if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
            e.preventDefault();
        }

        // Prevent Ctrl+P
        if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
            e.preventDefault();
        }
    });

    // Disable console
    const disableConsole = () => {
        try {
            Object.defineProperty(window, 'console', {
                value: {},
                writable: false,
                configurable: false
            });

            window.console.log = function() {};
            window.console.debug = function() {};
            window.console.info = function() {};
            window.console.warn = function() {};
            window.console.error = function() {};
        } catch (e) {}
    };

    // Detect and prevent DevTools
    let devtools = function() {};
    devtools.toString = function() {
        disableConsole();
        return '';
    };

    // Disable view source
    document.onkeypress = function(event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            return false;
        }
    };

    // Prevent text selection
    document.addEventListener('selectstart', e => e.preventDefault());

    // Disable drag and drop
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('drop', e => e.preventDefault());

    // Additional DevTools detection
    let checkDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if(widthThreshold || heightThreshold) {
            document.body.innerHTML = 'Developer tools detected. Access denied.';
        }
    };

    setInterval(checkDevTools, 1000);

    // Disable copy/paste
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('paste', e => e.preventDefault());

    // Disable source view
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });
})();
