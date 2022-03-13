import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import Item from 'App/Models/Item';
import Application from '@ioc:Adonis/Core/Application'
import Image from 'App/Models/Image';
import fs from 'fs'
import path from 'path'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class ItemsController {

    async viewItem({ response, view, session }: HttpContextContract) {

        try {
            const items = await Item.query().preload('images').preload('categorya')

            const categories = await Category.all();
            return view.render('admin/item/view_item', {
                title: "Staycation | Item",
                categories,
                items,
                action: 'view',
            });
        } catch (error) {
            session.flash('alertMessage', `${error.message}`);
            session.flash('alertStatus', 'danger');
            response.redirect('/admin/item');
        }
    }

    async addItem({ request, response, session }: HttpContextContract) {

        try {
            const { categoryId, title, price, city, about } = request.only(['categoryId', 'title', 'price', 'city', 'about']);
            const images = request.files('image')
            if (images.length > 0) {
                const newItem = {
                    categoryId,
                    title,
                    description: about,
                    price,
                    city,
                    sumBooking: 0
                }
                const item = await Item.create(newItem);
                for (let image of images) {
                    await Image.create({ imageUrl: `images/${image.clientName}`, itemId: item.id });
                    await image.move(Application.publicPath('admin/images'))
                }

                session.flash('alert.message', 'Success Add Item');
                session.flash('alert.status', 'success');
                response.redirect('/admin/item');
            }
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/item');
        }
    }

    async showImageItem({ params, view, response, session }: HttpContextContract) {
        try {
            const { id } = params;
            const item = await Item.query().preload('images').where('id', id)
            // console.log(item)
            return view.render('admin/item/view_item', {
                title: "Staycation | Show Image Item",
                item,
                action: 'show image',
            });
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/item');
        }
    }

    async showEditItem({ params, response, view, session }: HttpContextContract) {

        try {
            const { id } = params;
            const item = await Item.query().preload('images').preload('categorya').where('id', id)
            // console.log(item)
            const category = await Category.all();
            return view.render('admin/item/view_item', {
                title: "Staycation | Edit Item",
                item,
                categories: category,
                action: 'edit',
            });
        } catch (error) {
            console.log(error)
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/item');
        }
    }

    async editItem({ params, request, response, session }: HttpContextContract) {

        try {
            const { id } = params;
            const { categoryId, title, price, city, about } = request.only(['categoryId', 'title', 'price', 'city', 'about']);
            const item = await Item.query().preload('categorya').where('id', id)
            const images = request.files('image')
            const updateItem = {
                title,
                price,
                city,
                description: about,
                categoryId
            }
            if (images.length > 0) {
                let imageUpdate = await Image.query().where('itemId', item[0].id)
                for (let i = 0; i < imageUpdate.length; i++) {
                    await fs.unlink(path.join(`public/admin/${imageUpdate[i].imageUrl}`), err => {
                        if (err) throw err
                        console.log(`Delete Image ${imageUpdate[i].imageUrl}`)
                    });
                    await imageUpdate[i].delete()
                }
                for (let image of images) {
                    await image.move(Application.publicPath('admin/images'), {
                        overwrite: true,
                        name: `${string.generateRandom(32)}.jpg`
                    })
                    await Image.create({ imageUrl: `images/${image.fileName}`, itemId: id })
                }
                await Item.query().where('id', id).update(updateItem)
                session.flash('alert.message', 'Success update Item');
                session.flash('alert.status', 'success');
                response.redirect('/admin/item');
            } else {
                await Item.query().where('id', id).update(updateItem)
                session.flash('alert.message', 'Success update Item');
                session.flash('alert.status', 'success');
                response.redirect('/admin/item');
            }
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/item');
        }
    }

    async deleteItem({ params, session, response }: HttpContextContract) {
        try {
            const { id } = params;
            const item = await Item.query().where('id', id)
            const images = await Image.query().where('itemId', id)
            if (!item) {
                session.flash('alert.message', `Row Not Found Item ${id}`);
                session.flash('alert.status', 'success');
                response.redirect('/admin/item');
            }
            for (let i = 0; i < images.length; i++) {
                fs.unlink(path.join(`public/${images[i].imageUrl}`), err => {
                    if (err) throw err
                    console.log(`Deleted Image ${images[i].imageUrl}`)
                });
                await images[i].delete()
            }
            await item[0].delete();
            session.flash('alert.message', 'Success delete Item');
            session.flash('alert.status', 'success');
            response.redirect('/admin/item');
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/item');
        }
    }
}




//   : async (req, res) => {
//   },