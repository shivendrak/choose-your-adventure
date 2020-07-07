export class TreeNode {
    public Children: TreeNode[];
    public Label: string;
    public BranchLabel: string;
    public IsHighlight: boolean;

    public AddChild(node: TreeNode): void {
        if (!this.Children) {
            this.Children = [];
        }
        this.Children.push(node);
    }
}

