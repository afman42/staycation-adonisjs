import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Booking from 'App/Models/Booking';

export default class BookingsController {

    async viewBooking({ view, response }: HttpContextContract) {

        try {
            const booking = await Booking.query().preload('member').preload('bank')
            return view.render('admin/booking/view_booking', {
                title: "Staycation | Booking",
                bookings: booking
            });
        } catch (error) {
            response.redirect('/admin/booking');
        }
    }

    async showDetailBooking({ params, response, view }: HttpContextContract) {

        const { id } = params
        try {
            const booking = await Booking.query().preload('member').preload('bank').where('id', id)
            return view.render('admin/booking/show_detail_booking', {
                title: "Staycation | Detail Booking",
                booking,
            });
        } catch (error) {
            response.redirect('/admin/booking');
        }
    }

    async actionConfirmation({ session, params, response }: HttpContextContract) {

        const { id } = params;
        try {
            const booking = await Booking.query().where('id', id);
            let j = booking[0].paymentsJSON
            let s = {
                proofPayment: j.proofPayment,
                bankFrom: j.bankFrom,
                status: "Accept",
                accountHolder: j.accountHolder
            }
            booking[0].payments = JSON.stringify(s)
            await booking[0].save();
            session.flash('alert.message', 'Success Confirmation Pembayaran');
            session.flash('alert.status', 'success');
            response.redirect(`/admin/booking/${id}`);
        } catch (error) {
            response.redirect(`/admin/booking/${id}`);
        }
    }

    async actionReject({ session, params, response }: HttpContextContract) {

        const { id } = params;
        try {
            const booking = await Booking.query().where('id', id);
            let j = booking[0].paymentsJSON
            let s = {
                proofPayment: j.proofPayment,
                bankFrom: j.bankFrom,
                status: "Reject",
                accountHolder: j.accountHolder
            }
            // booking[0].paymentsJSON.status = 'Reject';
            booking[0].payments = JSON.stringify(s)
            await booking[0].save();
            session.flash('alertMessage', 'Success Reject Pembayaran');
            session.flash('alertStatus', 'success');
            response.redirect(`/admin/booking/${id}`);
        } catch (error) {
            response.redirect(`/admin/booking/${id}`);
        }
    }
}
