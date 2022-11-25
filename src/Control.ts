class Control<NodeType extends keyof HTMLElementTagNameMap> {
    node: HTMLElementTagNameMap[NodeType]

    constructor(parentNode: HTMLElement, tagName: NodeType, className?: string, text?: string) {
        this.node = document.createElement(tagName);
        this.node.className = className || '';
        this.node.textContent = text || '';

        parentNode.append(this.node)
    }

    destroy(): void {
        this.node.remove()
    }
}

export {
    Control
}
