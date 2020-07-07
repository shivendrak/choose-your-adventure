import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'loading',
    template: `<div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`,
   styleUrls:['./loading.component.scss']
})
export class LoadingComponent { }
