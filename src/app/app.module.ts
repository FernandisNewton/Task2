import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArtsyInterceptorService } from './services/artsy-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { ArtistInfoComponent } from './artist-info/artist-info.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, HomeComponent, ArtistInfoComponent, ArtworksComponent, CategoryModalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule,MatTabsModule,MatDialogModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ArtsyInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
