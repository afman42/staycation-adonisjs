import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bank from 'App/Models/Bank'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import path from 'path'

export default class BanksController {

    async viewBank({ view }: HttpContextContract) {
        const banks = await Bank.all()
        return view.render('admin/bank/view_bank', {
            title: "Staycation | Bank",
            banks
        })
    }

    async addBank({ session, request, response }: HttpContextContract) {
        try {
            const { name, nameBank, nomorRekening } = request.only(['name', 'nameBank', 'nomorRekening']);
            const coverImage = request.file('image')
            if (!coverImage?.isValid) {
                session.flash('alert.message', `${coverImage?.errors}`);
                session.flash('alert.status', 'danger');
                response.redirect('/admin/bank');
            }
            await coverImage?.move(Application.publicPath('admin/images'))

            await Bank.create({
                name,
                nameBank,
                nomorRekening,
                imageUrl: `images/${coverImage?.fileName}`
            });
            session.flash('alert.message', 'Success Add Bank');
            session.flash('alert.status', 'success');
            response.redirect('/admin/bank');
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/bank');
        }
    }

    async editBank({ request, response, session }: HttpContextContract) {
        try {
            const { id, name, nameBank, nomorRekening } = request.only(['id', 'name', 'nameBank', 'nomorRekening']);
            const bank = await Bank.findOrFail(id);
            const coverImage = request.file('image')
            if (!coverImage) {
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                await bank.save();
                session.flash('alert.message', 'Success Update Bank');
                session.flash('alert.status', 'success');
                response.redirect('/admin/bank');
            } else {
                await fs.unlink(path.join(`public/admin/${bank.imageUrl}`), (err) => {
                    if (err) throw err
                    console.log(`Delete Image File ${bank.imageUrl}`)
                });
                if (!coverImage?.isValid) {
                    session.flash('alert.message', `${coverImage?.errors}`);
                    session.flash('alert.status', 'danger');
                    response.redirect('/admin/bank');
                }
                await coverImage?.move(Application.publicPath('admin/images'))
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                bank.imageUrl = `images/${coverImage.fileName}`
                await bank.save();
                session.flash('alert.message', 'Success Update Bank');
                session.flash('alert.status', 'success');
                response.redirect('/admin/bank');
            }
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/bank');
        }
    }

    async deleteBank({ params, session, response }: HttpContextContract) {
        try {
            const { id } = params;
            const bank = await Bank.findOrFail(id);
            await fs.unlink(path.join(`public/admin/${bank.imageUrl}`), (err) => {
                if (err) throw err
                console.log(`Delete Image File ${bank.imageUrl}`)
            });
            await bank.delete();
            session.flash('alert.message', 'Success Delete Bank');
            session.flash('alert.status', 'success');
            response.redirect('/admin/bank');
        } catch (error) {
            session.flash('alert.message', `${error.message}`);
            session.flash('alert.status', 'danger');
            response.redirect('/admin/bank');
        }
    }
}
