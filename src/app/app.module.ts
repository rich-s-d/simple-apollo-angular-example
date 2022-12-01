import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLComponent } from './graphql.component';

// Apollo
import { GraphQLModule } from './graphql.module';

@NgModule({
  imports: [BrowserModule, GraphQLModule],
  declarations: [AppComponent, GraphQLComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
