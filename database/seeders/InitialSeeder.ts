import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Activity from 'App/Models/Activity'
import Bank from 'App/Models/Bank'
import Booking from 'App/Models/Booking'
import Category from 'App/Models/Category'
import Feature from 'App/Models/Feature'
import Image from 'App/Models/Image'
import Item from 'App/Models/Item'
import Member from 'App/Models/Member'
import User from 'App/Models/User'

export default class InitialSeederSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Category.createMany([
      { name: 'Houses with beauty backyard' },
      { name: 'Hotels with large living room' },
      { name: 'Apartment with kitchen' }
    ])

    await Item.createMany([
      {
        title: 'Tabby Town',
        price: 12,
        sumBooking: 1,
        country: 'Indonesia',
        city: 'Lampung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 1,
      },
      {
        title: 'Seattle Rain',
        price: 20,
        sumBooking: 2,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 1
      },
      {
        title: 'Wodden Pit',
        price: 20,
        sumBooking: 3,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 1
      },
      {
        title: 'Anggana',
        price: 20,
        sumBooking: 4,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 1
      },
      {
        title: 'Green Park',
        price: 20,
        sumBooking: 5,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 2,
      },
      {
        title: 'Podo Wae',
        price: 20,
        sumBooking: 6,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 2
      },
      {
        title: 'Silver Rain',
        price: 20,
        sumBooking: 7,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 2
      },
      {
        title: 'Cashville',
        price: 20,
        sumBooking: 8,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 2
      },
      {
        title: 'PS Wood',
        price: 20,
        sumBooking: 9,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 3
      },
      {
        title: 'One Five',
        price: 20,
        sumBooking: 11,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 3
      },
      {
        title: 'Minimal',
        price: 20,
        sumBooking: 13,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 3
      },
      {
        title: 'Stays Home',
        price: 20,
        sumBooking: 14,
        country: 'Indonesia',
        city: 'Bandung',
        isPopular: false,
        description: 'Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.',
        unit: 'night',
        categoryId: 3
      }
    ])

    await Image.createMany([
      {
        imageUrl: 'images/image-mostpicked-1-min.jpg',
        itemId: 1,
      },
      {
        imageUrl: 'images/image-mostpicked-2-min.jpg',
        itemId: 1,
      },
      {
        imageUrl: 'images/image-mostpicked-3-min.jpg',
        itemId: 1,
      },
      {
        imageUrl: 'images/image-mostpicked-4-min.jpg',
        itemId: 2,
      },
      {
        imageUrl: 'images/item-1.png',
        itemId: 2,
      },
      {
        imageUrl: 'images/image-mostpicked-5-min.jpg',
        itemId: 2,
      },
      {
        imageUrl: 'images/image-mostpicked-7-min.jpg',
        itemId: 3,
      },
      {
        imageUrl: 'images/image-mostpicked-8-min.jpg',
        itemId: 3,
      },
      {
        imageUrl: 'images/image-mostpicked-9-min.jpg',
        itemId: 3,
      },
      {
        imageUrl: 'images/image-mostpicked-10-min.jpg',
        itemId: 4,
      },
      {
        imageUrl: 'images/image-mostpicked-11-min.jpg',
        itemId: 4,
      },
      {
        imageUrl: 'images/image-mostpicked-12-min.jpg',
        itemId: 4,
      },
      {
        imageUrl: 'images/image-mostpicked-13-min.jpg',
        itemId: 5,
      },
      {
        imageUrl: 'images/image-mostpicked-14-min.jpg',
        itemId: 5,
      },
      {
        imageUrl: 'images/image-mostpicked-15-min.jpg',
        itemId: 5,
      },
      {
        imageUrl: 'images/image-category-1-min.jpg',
        itemId: 6
      },
      {
        imageUrl: 'images/image-category-2-min.jpg',
        itemId: 6,
      },
      {
        imageUrl: 'images/image-category-3-min.jpg',
        itemId: 6,
      },
      {
        imageUrl: 'images/image-category-4-min.jpg',
        itemId: 7,
      },
      {
        itemId: 7,
        imageUrl: 'images/image-category-5-min.jpg'
      },
      {
        itemId: 7,
        imageUrl: 'images/image-category-6-min.jpg'
      },
      {
        imageUrl: 'images/image-category-7-min.jpg',
        itemId: 8,
      },
      {
        imageUrl: 'images/image-category-8-min.jpg',
        itemId: 8,
      },
      {
        itemId: 8,
        imageUrl: 'images/image-category-9-min.jpg'
      },
      {
        imageUrl: 'images/image-category-7-min.jpg',
        itemId: 9,
      },
      {
        imageUrl: 'images/image-category-8-min.jpg',
        itemId: 9,
      },
      {
        imageUrl: 'images/image-category-9-min.jpg',
        itemId: 9,
      },
      {
        imageUrl: 'images/image-category-10-min.jpg',
        itemId: 10,
      },
      {
        imageUrl: 'images/image-category-11-min.jpg',
        itemId: 10,
      },
      {
        imageUrl: 'images/image-category-12-min.jpg',
        itemId: 10,
      },
      {
        imageUrl: 'images/image-category-13-min.jpg',
        itemId: 11,
      },
      {
        imageUrl: 'images/image-category-14-min.jpg',
        itemId: 11,
      },
      {
        imageUrl: 'images/image-category-15-min.jpg',
        itemId: 11,
      },
      {
        imageUrl: 'images/image-category-16-min.jpg',
        itemId: 12,
      },
      {
        imageUrl: 'images/image-category-17-min.jpg',
        itemId: 12,
      },
      {
        imageUrl: 'images/image-category-18-min.jpg',
        itemId: 12,
      },
    ])

    await Feature.createMany([
      {
        name: 'bedroom',
        qty: 2,
        imageUrl: 'images/feature-1.png',
        itemId: 1
      },
      {
        name: 'living room',
        qty: 23,
        imageUrl: 'images/feature-2.png',
        itemId: 1,
      },
      {
        itemId: 1,
        name: 'televison',
        qty: 12,
        imageUrl: 'images/feature-3.png',
      },
      {
        name: 'televison',
        qty: 5,
        imageUrl: 'images/feature-4.png',
        itemId: 1,
      },
      {
        name: 'mbp/s',
        qty: 5,
        imageUrl: 'images/feature-5.png',
        itemId: 1,
      },
      {
        name: 'unit ready',
        qty: 5,
        imageUrl: 'images/feature-6.png',
        itemId: 1,
      },
      {
        name: 'refigrator',
        qty: 5,
        imageUrl: 'images/feature-7.png',
        itemId: 1,
      },
      {
        name: 'televion',
        qty: 5,
        imageUrl: 'images/feature-8.png',
        itemId: 1,
      },
      {
        name: 'bedroom',
        qty: 2,
        imageUrl: 'images/feature-1.png',
        itemId: 2,
      },
      {
        // done
        name: 'living room',
        qty: 23,
        imageUrl: 'images/feature-2.png',
        itemId: 2,
      },
      {
        // done
        name: 'televison',
        qty: 12,
        imageUrl: 'images/feature-3.png',
        itemId: 2,
      },
      {
        // done
        name: 'televison',
        qty: 5,
        imageUrl: 'images/feature-4.png',
        itemId: 2,
      },
      {
        // done
        name: 'mbp/s',
        qty: 5,
        imageUrl: 'images/feature-5.png',
        itemId: 2,
      },
      {
        // done
        name: 'unit ready',
        qty: 5,
        imageUrl: 'images/feature-6.png',
        itemId: 2,
      },
      {
        // done
        name: 'refigrator',
        qty: 5,
        imageUrl: 'images/feature-7.png',
        itemId: 2,
      },
      {
        // done
        name: 'televion',
        qty: 5,
        imageUrl: 'images/feature-8.png',
        itemId: 2,
      }
    ])

    await Activity.createMany([
      {
        name: 'Green Lake',
        type: 'Nature',
        imageUrl: 'images/activity-1.png',
        itemId: 1,
      },
      {
        name: 'Dog Clubs',
        type: 'Pool',
        imageUrl: 'images/activity-2.png',
        itemId: 1,
      },
      {
        name: 'Labour and Wait',
        type: 'Shopping',
        imageUrl: 'images/activity-3.png',
        itemId: 1,
      },
      {
        name: 'Labour and Wait',
        type: 'Shopping',
        imageUrl: 'images/activity-4.png',
        itemId: 1,
      },
      // done 2
      {
        name: 'Green Lake',
        type: 'Nature',
        imageUrl: 'images/activity-3.png',
        itemId: 2,
      },
      {
        name: 'Dog Clubs',
        type: 'Pool',
        imageUrl: 'images/activity-2.png',
        itemId: 2,
      },
      {
        name: 'Labour and Wait',
        type: 'Shopping',
        imageUrl: 'images/activity-1.png',
        itemId: 2,
      },
      {
        name: 'Labour and Wait',
        type: 'Shopping',
        imageUrl: 'images/activity-4.png',
        itemId: 2,
      }
    ])

    await Member.createMany([
      {
        firstName: 'Elfin',
        lastName: 'Sanjaya',
        email: 'elfinsanjaya12@gmail.com',
        phoneNumber: '082377954008'
      },
      {
        firstName: 'Yein',
        lastName: 'Narayana',
        email: 'elfinsanjaya1207@gmail.com',
        phoneNumber: '082377954008'
      }
    ])

    await Bank.createMany([
      {
        nameBank: 'Mandiri',
        nomorRekening: '089898',
        name: 'elfin',
        imageUrl: 'images/logo bca.png'
      },
      {
        nameBank: 'BCA',
        nomorRekening: '878678',
        name: 'elfin',
        imageUrl: 'images/logo mandiri.png'
      }
    ])

    await Booking.create({

      bookingStartDate: new Date(),
      bookingEndDate: new Date(),
      invoice: '1231231',
      itemId: '{' +
        '"id": 1,' +
        '"title":' + '"Village Angga",' +
        '"price":' +  6 + ',' +
        '"duration":' + 2 + ',' +
        '}',
      total: 12,
      memberId: 1,
      bankId: 2,
      payments: '{' +
        '"proofPayment":' + '"images/bukti.jpeg",' +
        '"bankFrom":' + '"BCA",' +
        '"status":'+ '"Proses",' +
        '"accountHolder":' + '"ang"' +
        '}'
    })



    await User.createMany([
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'rahasia',
        role: 'admin'
      },
      {
        role: 'admin',
        username: 'super admin',
        email: 'adminsuper@example.com',
        password: 'rahasia',
      },
    ])
  }
}