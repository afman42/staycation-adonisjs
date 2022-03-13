import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';

export default class CategoriesController {

    async viewCategory({ response, view }: HttpContextContract) {
        try {
            const categories = await Category.all();
            return view.render('admin/category/view_category', {
                categories,
                title: "Staycation | Category",
            });
        } catch (error) {
            response.redirect('/admin/category');
        }
    }

    async addCategory({ request, response, session }: HttpContextContract) {
        try {
            const { name } = request.only(['name']);
            // console.log(name);
            await Category.create({ name });
            session.flash('alert.message', 'Success Add Category');
            session.flash('alert.status', 'success');
            response.redirect('/admin/category');
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/category');
        }
    }

    async editCategory({ request, session, response }: HttpContextContract) {
        try {
            const { id, name } = request.only(['id', 'name']);
            const category = await Category.findOrFail(id);
            category.name = name;
            await category.save();
            session.flash('alert.message', 'Success Update Category');
            session.flash('alert.status', 'success');
            response.redirect('/admin/category');
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/category');
        }
    }

    async deleteCategory({ params, session, response }) {

        try {
            const { id } = params;
            const category = await Category.findOrFail(id);
            await category.delete();
            session.flash('alert.message', 'Success Delete Category');
            session.flash('alert.status', 'success');
            response.redirect('/admin/category');
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/category');
        }
    }
}

