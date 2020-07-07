// This class represents hierarchical view of the data.
// This is used to represent the questions in the hierarchical format.
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

