import { NgModule } from '@angular/core';
import { BrowserModule,Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArtsyInterceptorService } from './services/artsy-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { ArtistInfoComponent } from './components/artist-info/artist-info.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
import { PagingPipe } from './pipes/paging.pipe';
import { DebounceClickDirective } from './directives/debounce-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ArtistInfoComponent,
    ArtworksComponent,
    CategoryModalComponent,
    PagingPipe,
    DebounceClickDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ArtsyInterceptorService,
      multi: true,
    },
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
