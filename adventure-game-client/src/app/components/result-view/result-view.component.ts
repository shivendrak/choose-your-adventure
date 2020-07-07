import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GameService, DataloaderService } from 'src/app/services/services';
import { TreeNode } from '../tree-view/treenode.model';
import { Adventure, Question } from 'src/app/models/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {

  treeNode: TreeNode;
  adventure: Adventure;

  constructor(public gameService: GameService, public dataLoaderService: DataloaderService, public router: Router) { }

  ngOnInit(): void {
    this.showResults();
  }

  showResults(): void {
    const adventureName = this.gameService.getAdventure();
    this.adventure = this.dataLoaderService.getAdventure(adventureName);
    const resultMap = this.gameService.getResults();
    const questions = this.gameService.getQuestions();
    this.treeNode = this.generateQuestionTree(questions, resultMap);
  }

  onStartOver(): void {
    this.gameService.endGame();
    this.router.navigate(['/dashboard']);
  }

  private generateQuestionTree(questions: Question[], resultsMap: Map<number, string>): TreeNode {
    const nodeMap = new Map<number, TreeNode>();
    const questionMap = new Map<number, Question>();
    questions.forEach(question => questionMap.set(question.id, question));
    const queue = [];
    queue.push({ question: questionMap.get(1), branchLabel: '', parent: undefined });
    while (queue.length > 0) {
      const dataPoint = queue.shift();
      const question = dataPoint.question;
      const node = this.getTreeNode(question.description, dataPoint.branchLabel, resultsMap.has(question.id));
      if (nodeMap.has(dataPoint.parent)) {
        const parent = nodeMap.get(dataPoint.parent);
        parent.AddChild(node);
      }

      nodeMap.set(question.id, node);
      if (question.options) {
        question.options.forEach(option =>
          queue.push({ question: questionMap.get(option.nextStep), branchLabel: option.description, parent: question.id })
        );
      }
    }
    return nodeMap.get(1);
  }

  private getTreeNode(label: string, branchLabel: string, isHighlight: boolean): TreeNode {
    const treeNode = new TreeNode();
    treeNode.Label = label;
    treeNode.IsHighlight = isHighlight;
    treeNode.BranchLabel = branchLabel;
    return treeNode;
  }
}
