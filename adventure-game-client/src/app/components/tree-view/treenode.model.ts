export class TreeNode {
    public children: TreeNode[];
    public label: string;
    public branchLabel: string;
    public isHighlight: boolean;

    public addChild(node: TreeNode): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(node);
    }
}

