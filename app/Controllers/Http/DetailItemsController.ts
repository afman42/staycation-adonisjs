import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Activity from 'App/Models/Activity';
import Feature from 'App/Models/Feature';
import Application from '@ioc:Adonis/Core/Application'
import { string } from '@ioc:Adonis/Core/Helpers'
import fs from 'fs'
import path from 'path'

export default class DetailItemsController {

    async viewDetailItem({ params, view, session, response }: HttpContextContract) {
        const { itemId } = params;
        try {
            const feature = await Feature.query().where('itemId', itemId);
            const activity = await Activity.query().where('itemId', itemId);

            return view.render('admin/item/detail_item/view_detail_item', {
                title: 'Staycation | Detail Item',
                itemId,
                features: feature,
                activities: activity,
            })

        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    }
    async addFeature({ session, request, response }: HttpContextContract) {
        const { name, qty, itemId } = request.only(['name', 'qty', 'itemId']);
        const image = request.file('image')
        try {
            if (!image) {
                session.flash('alertMessage', 'Image not found');
                session.flash('alertStatus', 'danger');
                response.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            await image.move(Application.publicPath('admin/images'), {
                overwrite: true,
                name: `${string.generateRandom(32)}.jpg`
            })
            await Feature.create({
                name,
                qty,
                itemId,
                imageUrl: `images/${image?.fileName}`
            });
            session.flash('alert.message', 'Success Add Feature');
            session.flash('alert.status', 'success');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    }

    async editFeature({ session, request, response }: HttpContextContract) {

        const { id, name, qty, itemId } = request.only(['id', 'name', 'qty', 'itemId']);
        try {
            const feature = await Feature.query().where('id', id);
            const image = request.file('image')
            if (!image) {
                feature[0].name = name;
                feature[0].qty = qty;
                await feature[0].save();
                session.flash('alert.message', 'Success Update Feature');
                session.flash('alert.status', 'success');
                response.redirect(`/admin/item/show-detail-item/${itemId}`);
            } else {
                await fs.unlink(path.join(`public/admin/${feature[0].imageUrl}`), err => {
                    if (err) throw err
                    console.log(`Delete Image ${feature[0].imageUrl}`)
                });
                await image.move(Application.publicPath('admin/images'), {
                    overwrite: true,
                    name: `${string.generateRandom(32)}.jpg`
                })
                feature[0].name = name;
                feature[0].qty = qty;
                feature[0].imageUrl = `images/${image.fileName}`
                await feature[0].save();
                session.flash('alert.message', 'Success Update Feature');
                session.flash('alert.status', 'success');
                response.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    }

    async deleteFeature({ session, response, params }: HttpContextContract) {

        const { id, itemId } = params;
        try {
            const feature = await Feature.query().where('id', id);
            if (!feature) {
                session.flash('alert.message', 'Row Not Found Delete');
                session.flash('alert.status', 'danger');
                response.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
            await fs.unlink(path.join(`public/admin/${feature[0].imageUrl}`), err => {
                if (err) {
                    throw err
                }
                console.log(`Delete Image ${feature[0].imageUrl}`)
            });
            await feature[0].delete();
            session.flash('alert.message', 'Success Delete Feature');
            session.flash('alert.status', 'success');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    }
}



//   : async (req, res) => {
//   },