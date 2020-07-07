import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from './treenode.model';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Input() Node: TreeNode;
}


