import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from './treenode.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})

// Ideally this component should be created into a independent modules, but I have kept it with the same module to maintain simplicity. 
export class TreeViewComponent {
  @Input() Node: TreeNode;
}


