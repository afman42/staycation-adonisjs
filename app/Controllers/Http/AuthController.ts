import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {

    viewSignin({ view }: HttpContextContract) {
        return view.render('index', {
            title: "Staycation | Login"
        })
    }

    async actionSignin({ auth, request, session, response }: HttpContextContract) {
        const username = request.input('username')
        const password = request.input('password')
        const user = await Database.query().from('users').where('username', username)
        console.log(user)
        if (!user) {
            session.flash('alert.message', 'User yang anda masukan tidak ada!!');
            session.flash('alert.status', 'danger');
            return response.redirect('/admin/signin')
        }
        const passwordHash = await Hash.verify(user[0].password, password)
        if (!passwordHash) {
            session.flash('alert.message', 'Password yang anda masukan tidak cocok!!');
            session.flash('alert.status', 'danger');
            return response.redirect('/admin/signin')
        }
        await auth.use('web').attempt(username, password)
        return response.redirect('/admin/dashboard')
    }

    async actionLogout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout()
        response.redirect('/admin/signin')
    }
}
