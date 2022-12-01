import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { UpvoterComponent } from './upvoter.component';

// Apollo
import { GraphQLModule } from './graphql.module';

@NgModule({
  imports: [BrowserModule, GraphQLModule],
  declarations: [AppComponent, ListComponent, UpvoterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
