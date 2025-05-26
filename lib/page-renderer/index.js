class PageRenderer {
    constructor(rootElement, chunks) {
        this.root = rootElement;
        this.progressBarIndicator = null;
        this.chunks = chunks;

        this.initProgressBar();
        this.setProgressBarValue(0);
    }

    initProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');

        const progressBarIndicator = document.createElement('div');
        progressBarIndicator.classList.add('progress-bar__indicator');

        progressBar.appendChild(progressBarIndicator);

        document.body.appendChild(progressBar);

        this.progressBarIndicator = progressBarIndicator;
    }

    setProgressBarValue(progressValue) {
        if (!this.progressBarIndicator) {
            return;
        }
        this.progressBarIndicator.style.transform = `scaleX(${Math.min(progressValue, 100)})`;
    };

    async renderChunk(html, js, progressValue, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.root?.insertAdjacentHTML('beforeend', html);
                if (js) {
                    js();
                }
                this.setProgressBarValue(progressValue);
                resolve();
            }, delay);
        });
    }

    async render () {
        for (const chunk of this.chunks) {
            await this.renderChunk(chunk.html, chunk.js, chunk.progressValue, chunk.delay);
        }
    };
}