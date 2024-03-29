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

const routes: Routes = [

	{ path: '', component: ManagersComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
	{ path: 'manager_form', component: ManagerFormComponent },
	{ path: 'manager_form/:id', component: ManagerFormComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'user_form', component: UserFormComponent },
	{ path: 'user_form/:id', component: UserFormComponent },
	{ path: 'user_details/:id', component: UserDetailsComponent },
	{ path: 'comments', component: CommentsComponent },
	{ path: 'comment_form', component: CommentFormComponent },
	{ path: 'comment_form/:id', component: CommentFormComponent },
	{ path: 'comment_details/:id', component: CommentDetailsComponent },
	{ path: 'articles', component: ArticlesComponent },
	{ path: 'article_form', component: ArticleFormComponent },
	{ path: 'article_form/:id', component: ArticleFormComponent },
	{ path: 'discounts', component: DiscountsComponent },
	{ path: 'discount_form', component: DiscountFormComponent },
	{ path: 'discount_form/:id', component: DiscountFormComponent },
	{ path: 'syscat', component: SyscatComponent },
	{ path: 'syscat/tags', component: TagsComponent },
	{ path: 'syscat/tags/tags_form', component: TagFormComponent },
	{ path: 'syscat/tags/tags_form/:id', component: TagFormComponent },
	{ path: 'syscat/countries', component: CountriesComponent },
	{ path: 'syscat/countries/country_form', component: CountryFormComponent },
	{ path: 'syscat/country_form/:id', component: CountryFormComponent },
	{ path: 'syscat/cities', component: CitiesComponent },
	{ path: 'syscat/cities/city_form', component: CityFormComponent },
	{ path: 'syscat/city_form/:id', component: CityFormComponent },
	{ path: 'syscat/companies', component: CompaniesComponent },
	{ path: 'syscat/companies/company_form', component: CompanyFormComponent },
	{ path: 'syscat/company_form/:id', component: CompanyFormComponent },
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
