import * as vscode from 'vscode';

/**
 * Represents a notifier that manages a status bar item in VS Code.
 */
class Notifier {
    /** The status bar item managed by this notifier. */
    private readonly statusBarItem: vscode.StatusBarItem;

    /** The ID of the timeout used for auto-hiding notifications. */
    private timeoutId: NodeJS.Timeout | undefined;

    /** The default auto-hide delay in milliseconds. */
    private static readonly DEFAULT_AUTO_HIDE_DELAY = 5000;

    /**
     * Creates a new Notifier instance.
     * @param {string} [command] - The command to be executed when the status bar item is clicked.
     * @param {vscode.StatusBarAlignment} [alignment=vscode.StatusBarAlignment.Left] - The alignment of the status bar item.
     * @param {number} [priority=100] - The priority of the status bar item.
     */
    constructor(command?: string, alignment: vscode.StatusBarAlignment = vscode.StatusBarAlignment.Left, priority: number = 100) {
        this.statusBarItem = vscode.window.createStatusBarItem(alignment, priority);
        this.statusBarItem.command = command;
        this.statusBarItem.show();
    }

    /**
     * Displays a notification in the status bar.
     * @param {string} icon - The icon to display in the status bar.
     * @param {string} text - The text to display in the status bar.
     * @param {boolean} [autoHide=true] - Whether to automatically hide the full text after a delay.
     * @param {number} [autoHideDelay=DEFAULT_AUTO_HIDE_DELAY] - The delay in milliseconds before auto-hiding the text.
     */
    public notify(icon: string, text: string, autoHide = true, autoHideDelay = Notifier.DEFAULT_AUTO_HIDE_DELAY): void {
        this.clearExistingTimeout();
        this.updateStatusBarItem(icon, text);

        if (autoHide) {
            this.setAutoHideTimeout(icon, text, autoHideDelay);
        }
    }

    /**
     * Clears any existing timeout for auto-hiding the status bar item.
     */
    private clearExistingTimeout(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    /**
     * Updates the status bar item with the given icon and text.
     * @param {string} icon - The icon to display in the status bar.
     * @param {string} text - The text to display in the status bar.
     */
    private updateStatusBarItem(icon: string, text: string): void {
        this.statusBarItem.text = `$(${icon}) ${text}`;
        this.statusBarItem.tooltip = undefined;
    }

    /**
     * Sets a timeout to auto-hide the full text of the status bar item.
     * @param {string} icon - The icon to display after auto-hiding.
     * @param {string} text - The text to set as tooltip after auto-hiding.
     * @param {number} delay - The delay in milliseconds before auto-hiding.
     */
    private setAutoHideTimeout(icon: string, text: string, delay: number): void {
        this.timeoutId = setTimeout(() => {
            this.statusBarItem.text = `$(${icon})`;
            this.statusBarItem.tooltip = text;
        }, delay);
    }
}

export default Notifier;
