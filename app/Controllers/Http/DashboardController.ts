import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Booking from 'App/Models/Booking'
import Item from 'App/Models/Item'
import Member from 'App/Models/Member'

export default class DashboardController {

    async viewDashboard({view}: HttpContextContract){
        const member = await Member.all()
        const booking = await Booking.all()
        const item = await Item.all()
        return view.render('admin/dashboard/view_dashboard',{
            member,
            booking,
            item,
            title: "Staycation | Dashboard",
        })
    }
}
