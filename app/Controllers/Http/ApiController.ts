import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import Item from 'App/Models/Item';
import Treasure from 'App/Models/Activity';
import Treveler from 'App/Models/Booking';
import Bank from 'App/Models/Bank';
import Member from 'App/Models/Member';
import Booking from 'App/Models/Booking';
import Application from '@ioc:Adonis/Core/Application'

export default class ApiController {

    async landingPage({ response }: HttpContextContract) {
        try {
            const mostPicked = await Item.query().preload('images').limit(5)

            const category = await Category.query().preload('items', itemsQuery => {
                itemsQuery.preload('images', imagesQuery => {
                    imagesQuery.limit(1)
                }).limit(4)
            }).limit(3)

            const treveler = await Treveler.all()
            const treasure = await Treasure.all()
            const city = await Item.all();

            for (let i = 0; i < category.length; i++) {
                for (let x = 0; x < category[i].items.length; x++) {
                    const item = await Item.query().where('id', category[i].items[x].id);
                    item[0].isPopular = false;
                    await item[0].save();
                    if (category[i].items[0] === category[i].items[x]) {
                        item[0].isPopular = true;
                        await item[0].save();
                    }
                }
            }

            const testimonial = {
                _id: "asd1293uasdads1",
                imageUrl: "images/testimonial2.jpg",
                name: "Happy Family",
                rate: 4.55,
                content: "What a great trip with my family and I should try again next time soon ...",
                familyName: "Angga",
                familyOccupation: "Product Designer"
            }

            response.status(200).json({
                hero: {
                    travelers: treveler.length,
                    treasures: treasure.length,
                    cities: city.length
                },
                mostPicked,
                category,
                testimonial
            })
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal server error" });
        }
    }

    async detailPage({ response, params }: HttpContextContract) {
        try {
            const { id } = params
            const item = await Item.query().where('id', id).preload('features', featureQuery => {
                featureQuery.select('id', 'name', 'qty', 'imageUrl')
            }).preload('activities', activityQuery => {
                activityQuery.select('id', 'name', 'type', 'imageUrl')
            }).preload('images', imageQuery => {
                imageQuery.select('id', 'imageUrl')
            })

            const bank = await Bank.all();

            const testimonial = {
                _id: "asd1293uasdads1",
                imageUrl: "images/testimonial1.jpg",
                name: "Happy Family",
                rate: 4.55,
                content: "What a great trip with my family and I should try again next time soon ...",
                familyName: "Angga",
                familyOccupation: "Product Designer"
            }

            response.status(200).json({
                ...item[0].serialize(),
                bank,
                testimonial
            })

        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }

    async bookingPage({ response, request }: HttpContextContract) {

        const {
            idItem,
            duration,
            // price,
            bookingStartDate,
            bookingEndDate,
            firstName,
            lastName,
            email,
            phoneNumber,
            accountHolder,
            bankFrom,
        } = request.all();

        const image = request.file('image')
        if (!image) {
            return response.status(404).json({ message: "Image not found" });
        }

        console.log(idItem)

        if (
            idItem === undefined ||
            duration === undefined ||
            // price === undefined ||
            bookingStartDate === undefined ||
            bookingEndDate === undefined ||
            firstName === undefined ||
            lastName === undefined ||
            email === undefined ||
            phoneNumber === undefined ||
            accountHolder === undefined ||
            bankFrom === undefined) {
            response.status(404).json({ message: "Lengkapi semua field" });
        }

        const item = await Item.query().where('id', idItem).first();

        if (!item) {
            return response.status(404).json({ message: "Item not found" });
        }

        item.sumBooking += 1;

        await item.save();

        let total = item.price * duration;
        let tax = total * 0.10;

        const invoice = Math.floor(1000000 + Math.random() * 9000000).toString();

        const member = await Member.create({
            firstName,
            lastName,
            email,
            phoneNumber
        });

            await image?.move(Application.publicPath('admin/images'))
        const newBooking = {
            invoice,
            bookingStartDate,
            bookingEndDate,
            total: total += tax,
            itemId: JSON.stringify({
                id: item.id,
                title: item.title,
                price: item.price,
                duration: duration
            }),

            memberId: member.id,
            payments: JSON.stringify({
                proofPayment: `images/${image.fileName}`,
                bankFrom: bankFrom,
                status: 'Proses',
                accountHolder: accountHolder
            })
        }

        const booking = await Booking.create(newBooking);

        response.status(201).json({ message: "Success Booking", booking });
    }
}

