class PressedKeyShower {
    constructor(options) {
        this.options = options;
        this.element = null;
        this.timeoutId = null;
        this.createElement();
        this.injectElementToPage();
    }

    createElement() {
        const element = document.createElement('div');
        element.setAttribute('class', 'pressed-key');

        const text = document.createElement('div');
        text.setAttribute('class', 'pressed-key__text');
        element.appendChild(text);

        const animatedPoints = document.createElement('div');
        animatedPoints.setAttribute('class', 'pressed-key__animated-points-container');
        element.appendChild(animatedPoints);

        this.element = element;
    }

    injectElementToPage() {
        document.body.appendChild(this.element);
    }

    watch() {
        document.addEventListener('keydown', (event) => {
            this.render(event.key);
       });
    }

    createAnimatedPoint() {
        const animatedPoint = document.createElement('div');
        animatedPoint.setAttribute('class', 'pressed-key__animated_point');
        setTimeout(() => {
            animatedPoint.remove();
        }, 1800);
        return animatedPoint;
    }

    render(content, withAutoRemove = true) {
        if (!this.element) {
            return;
        }

        this.element.childNodes[0].textContent = content;

        this.element.classList.add('visible');

        this.element.childNodes[1].appendChild(this.createAnimatedPoint());

        clearTimeout(this.timeoutId);

        if (withAutoRemove) {
            this.timeoutId = setTimeout(() => {
                this.element.classList.remove('visible');
            }, 2000);
        }
    }

    showText(content, withAutoRemove) {
        this.render(content, withAutoRemove);
    }
}