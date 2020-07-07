import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent, GameComponent, DashboardComponent, TreeViewComponent, ResultViewComponent } from './components/components';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GameComponent,
    DashboardComponent,
    TreeViewComponent,
    ResultViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
