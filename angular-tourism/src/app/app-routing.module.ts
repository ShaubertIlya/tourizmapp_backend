import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ManagersComponent } from './managers/managers.component';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { SyscatComponent } from './syscat/syscat.component';
import { TagsComponent } from './tags/tags.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { CitiesComponent } from './cities/cities.component';
import { CityFormComponent } from './city-form/city-form.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';
import { SightsComponent } from './sights/sights.component';
import { SightFormComponent } from './sight-form/sight-form.component';
import { ArComponent } from './ar/ar.component';
import { ArFormComponent } from './ar-form/ar-form.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { VrComponent } from './vr/vr.component';
import { VrFormComponent } from './vr-form/vr-form.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { SliderComponent } from './slider/slider.component';
import { SliderListComponent } from './slider-list/slider-list.component';
import { DiscountSliderComponent } from './discount-slider/discount-slider.component';
import { DiscountSliderListComponent } from './discount-slider-list/discount-slider-list.component';
import { ArticlesSliderComponent } from './articles-slider/articles-slider.component';
import { ArticlesSliderListComponent } from './articles-slider-list/articles-slider-list.component';

const routes: Routes = [

	{ path: '', component: ManagersComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
	{ path: 'manager_form', component: ManagerFormComponent },
	{ path: 'manager_form/:id/:role', component: ManagerFormComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'user_form', component: UserFormComponent },
	{ path: 'user_form/:id', component: UserFormComponent },
	{ path: 'user_details/:id', component: UserDetailsComponent },
	{ path: 'comments', component: CommentsComponent },
	{ path: 'comment_form', component: CommentFormComponent },
	{ path: 'comment_form/:id', component: CommentFormComponent },
	{ path: 'comment_details/:id', component: CommentDetailsComponent },
	{ path: 'articles', component: ArticlesComponent },
	{ path: 'slider/:id', component: SliderComponent },
	{ path: 'slider', component: SliderComponent },
	{ path: 'slider_list', component: SliderListComponent },
	{ path: 'discountSlider/:id', component: DiscountSliderComponent },
	{ path: 'discountSlider_list', component: DiscountSliderListComponent },

	{ path: 'discountSlider', component: DiscountSliderComponent },
	{ path: 'articleSlider/:id', component: ArticlesSliderComponent },
	{ path: 'articleSlider_list', component: ArticlesSliderListComponent },

	{ path: 'articleSlider', component: ArticlesSliderComponent },
	{ path: 'article_form', component: ArticleFormComponent },
	{ path: 'article_form/:id', component: ArticleFormComponent },
	{ path: 'discounts', component: DiscountsComponent },
	{ path: 'discount_form', component: DiscountFormComponent },
	{ path: 'discount_form/:id', component: DiscountFormComponent },
	{ path: 'syscat', component: SyscatComponent },
	{ path: 'tags', component: TagsComponent },
	{ path: 'tags/tags_form', component: TagFormComponent },
	{ path: 'tags/tags_form/:id', component: TagFormComponent },
	{ path: 'countries', component: CountriesComponent },
	{ path: 'countries/country_form', component: CountryFormComponent },
	{ path: 'country_form/:id', component: CountryFormComponent },
	{ path: 'cities', component: CitiesComponent },
	{ path: 'cities/city_form', component: CityFormComponent },
	{ path: 'city_form/:id', component: CityFormComponent },
	{ path: 'companies', component: CompaniesComponent },
	{ path: 'companies/company_form', component: CompanyFormComponent },
	{ path: 'company_form/:id', component: CompanyFormComponent },
	{ path: 'sights', component: SightsComponent },
	{ path: 'sight_form', component: SightFormComponent },
	{ path: 'sight_form/:id', component: SightFormComponent },
	{ path: 'ar', component: ArComponent },
	{ path: 'ar/ar_form', component: ArFormComponent },
	{ path: 'ar_form/:id', component: ArFormComponent },
	{ path: 'vr', component: VrComponent },
	{ path: 'vr_form', component: VrFormComponent },
	{ path: 'vr_form/:id', component: VrFormComponent },
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
