class ClickPointShower {
    constructor(options) {
        this.clickListener = (event) => {
            const el = document.createElement('div');
            el.setAttribute('popover', 'manual');
            el.setAttribute('class', `click-point click-point_${options?.color || 'yellow'}`);
            el.style.top =  `${event.clientY - 50}px`;
            el.style.left =  `${event.clientX - 50}px`;
            document.body.appendChild(el);
            el.showPopover();
        }
    }

    startWatching() {
        requestAnimationFrame(() => {
            document.addEventListener('click', this.clickListener);
        })
    }

    stopWatching() {
        requestAnimationFrame(() => {
            document.removeEventListener('click', this.clickListener);
        })
    }
}