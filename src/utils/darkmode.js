export const setDarkMode = (theme) => {
    // tailwind logic
    const root = window.document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    // daisyUI logic
    document.querySelector('html').setAttribute('data-theme', theme);
}