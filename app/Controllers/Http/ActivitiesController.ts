import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Activity from 'App/Models/Activity';
import Application from '@ioc:Adonis/Core/Application'
import { string } from '@ioc:Adonis/Core/Helpers'
import fs from 'fs'
import path from 'path'

export default class ActivitiesController {

    async addActivity({ request, response, session }: HttpContextContract) {

        const { name, type, itemId } = request.only(['name', 'type', 'itemId']);

        try {
            const image = request.file('image')
            if (!image) {
                session.flash('alert.message', 'Image not found');
                session.flash('alert.status', 'danger');
                response.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            await image?.move(Application.publicPath('admin/images'), {
                overwrite: true,
                name: `${string.generateRandom(32)}.jpg`
            })
            await Activity.create({
                name,
                type,
                itemId,
                imageUrl: `images/${image?.fileName}`
            });

            session.flash('alert.message', 'Success Add Activity');
            session.flash('alert.status', 'success');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    }

    async editActivity({ request, response, session }: HttpContextContract) {

        const { id, name, type, itemId } = request.only(['id', 'name', 'type', 'itemId']);
        try {
            const activity = await Activity.query().where('id', id);
            const image = request.file('image')
            if (!image) {
                activity[0].name = name;
                activity[0].type = type;
                await activity[0].save();
                session.flash('alert.message', 'Success Update activity');
                session.flash('alert.status', 'success');
                response.redirect(`/admin/item/show-detail-item/${itemId}`);
            } else {
                await fs.unlink(path.join(`public/admin/${activity[0].imageUrl}`), err => {
                    if (err) throw err
                    console.log(`Delete Image ${activity[0].imageUrl}`)
                });
                await image.move(Application.publicPath('admin/images'), {
                    overwrite: true,
                    name: `${string.generateRandom(32)}.jpg`
                })
                activity[0].name = name;
                activity[0].type = type;
                activity[0].imageUrl = `images/${image?.fileName}`
                await activity[0].save();
                session.flash('alert.message', 'Success Update activity');
                session.flash('alert.status', 'success');
                response.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    }

    async deleteActivity({ params, session, response }: HttpContextContract) {

        const { id, itemId } = params;
        try {
            const activity = await Activity.query().where('id', id);

            await fs.unlink(path.join(`public/admin/${activity[0].imageUrl}`), err => {
                if (err) throw err
                console.log(`Delete Image ${activity[0].imageUrl}`)
            });
            await activity[0].delete();
            session.flash('alert.message', 'Success Delete Activity');
            session.flash('alert.status', 'success');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    }
}

