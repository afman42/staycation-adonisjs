/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/admin/signin', 'AuthController.viewSignin');
Route.post('/admin/signin', 'AuthController.actionSignin');
Route.get('/admin/logout', 'AuthController.actionLogout');
Route.group(() => {

  Route.get('/dashboard', 'DashboardController.viewDashboard');

  // endpoint category
  Route.group(() => {
    Route.get('/', 'CategoriesController.viewCategory');
    Route.post('/', 'CategoriesController.addCategory');
    Route.put('/', 'CategoriesController.editCategory');
    Route.delete('/:id', 'CategoriesController.deleteCategory');
  }).prefix('category')

  // endpoint bank
  Route.group(() => {
    Route.get('/', 'BanksController.viewBank');
    Route.post('/', 'BanksController.addBank');
    Route.put('/', 'BanksController.editBank');
    Route.delete('/:id', 'BanksController.deleteBank');
  }).prefix('bank')

  // endpoint item
  Route.group(() => {
    Route.get('/', 'ItemsController.viewItem');
    Route.post('/', 'ItemsController.addItem'); //uploadMultiple
    Route.get('/show-image/:id', 'ItemsController.showImageItem');
    Route.get('/:id', 'ItemsController.showEditItem');
    Route.put('/:id', 'ItemsController.editItem'); //uploadMultiple
    Route.delete('/:id/delete', 'ItemsController.deleteItem');
  }).prefix('item')

  // endpoint detail item
  Route.group(() => {
    Route.get('/show-detail-item/:itemId', 'DetailItemsController.viewDetailItem');
    Route.post('/add/feature', 'DetailItemsController.addFeature'); //uploadSingle
    Route.put('/update/feature', 'DetailItemsController.editFeature'); //uploadSingle
    Route.delete('/:itemId/feature/:id', 'DetailItemsController.deleteFeature');
  }).prefix('item')

  // endpoint activity
  Route.group(() => {
    Route.post('/add/activity', 'ActivitiesController.addActivity'); //uploadSingle
    Route.put('/update/activity', 'ActivitiesController.editActivity'); //uploadSingle
    Route.delete('/:itemId/activity/:id', 'ActivitiesController.deleteActivity');
  }).prefix('item')


  Route.group(() => {
    Route.get('/', 'BookingsController.viewBooking');
    Route.get('/:id', 'BookingsController.showDetailBooking');
    Route.put('/:id/confirmation', 'BookingsController.actionConfirmation');
    Route.put('/:id/reject', 'BookingsController.actionReject');
  }).prefix('booking')
}).middleware(['auth']).prefix('/admin')

Route.get('/landing-page', 'ApiController.landingPage');
Route.get('/detail-page/:id', 'ApiController.detailPage');
Route.post('/booking-page', 'ApiController.bookingPage');