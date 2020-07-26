import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { DynamicTabsDirective } from './tabs/dynamic-tabs.directive';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogsApiproviderProvider } from 'src/providers/apiprovider/blogs-provider';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    BlogListComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BlogsApiproviderProvider],
  bootstrap: [AppComponent],
    // register the dynamic components here
  entryComponents: [TabComponent]
})
export class AppModule { }
