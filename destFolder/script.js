document.addEventListener('DOMContentLoaded', () => {
    const weakBtn = document.getElementById('weakBtn');
    const mediumBtn = document.getElementById('mediumBtn');
    const strongBtn = document.getElementById('strongBtn');
    const rangeInput = document.getElementById('passWord-length');
    const lengthDisplay = document.getElementById('lengthDisplay');
    const outPutBox = document.getElementById('outPutBox');
    const generateBtn = document.getElementById('generateButton');
    const copyIcon = document.getElementById('copyIcon');
    const copiedIcon = document.getElementById('copiedIcon');
    
    let complexity = 'medium';

    function handleButtonClick(clickedBtn, otherBtn1, otherBtn2, complexityLevel) {
        clickedBtn.classList.add('bg-[#756AB6]', 'text-[#FFE5E5]');
        clickedBtn.classList.remove('bg-[#E0AED0]', 'text-[#0b497d]');
        
        otherBtn1.classList.add('bg-[#E0AED0]', 'text-[#0b497d]');
        otherBtn1.classList.remove('bg-[#756AB6]', 'text-[#FFE5E5]');
        
        otherBtn2.classList.add('bg-[#E0AED0]', 'text-[#0b497d]');
        otherBtn2.classList.remove('bg-[#756AB6]', 'text-[#FFE5E5]');

        complexity = complexityLevel;
    }

    function updatePasswordLength() {
        lengthDisplay.textContent = rangeInput.value;
    }

    function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+{}|:"<>?';

        let allChars = '';
        let password = '';

        if (includeLowercase) allChars += lowerChars;
        if (includeUppercase) allChars += upperChars;
        if (includeNumbers) allChars += numberChars;
        if (includeSymbols) allChars += symbolChars;

        if (length <= 0) {
            return 'Password length must be at least 1';
        }
        if (allChars.length === 0) {
            return 'Please select at least one type of character';
        }

        let charSet = '';
        switch (complexity) {
            case 'weak':
                charSet = lowerChars;
                break;
            case 'medium':
                charSet = lowerChars + upperChars;
                break;
            case 'strong':
                charSet = allChars;
                break;
        }

        for (let i = 0; i < length; i++) {
            password += charSet.charAt(Math.floor(Math.random() * charSet.length));
        }

        return password;
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            copyIcon.classList.add('hidden');
            copiedIcon.classList.remove('hidden');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    function resetCopyIcons() {
        copyIcon.classList.remove('hidden');
        copiedIcon.classList.add('hidden');
    }

    weakBtn.addEventListener('click', () => {
        handleButtonClick(weakBtn, mediumBtn, strongBtn, 'weak');
    });

    mediumBtn.addEventListener('click', () => {
        handleButtonClick(mediumBtn, weakBtn, strongBtn, 'medium');
    });

    strongBtn.addEventListener('click', () => {
        handleButtonClick(strongBtn, weakBtn, mediumBtn, 'strong');
    });

    rangeInput.addEventListener('input', updatePasswordLength);

    updatePasswordLength();

    generateBtn.addEventListener('click', () => {
        const passwordLength = parseInt(rangeInput.value);
        const includeLowercase = document.getElementById('Lowercase').checked;
        const includeUppercase = document.getElementById('Uppercase').checked;
        const includeNumbers = document.getElementById('Number').checked;
        const includeSymbols = document.getElementById('specialCharactor').checked;

        const password = generatePassword(
            passwordLength,
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSymbols
        );

        outPutBox.value = password;
        resetCopyIcons();
    });

    copyIcon.addEventListener('click', () => {
        const password = outPutBox.value;
        if (password) {
            copyToClipboard(password);
        }
    });
});
