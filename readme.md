## ROUTES
<hr>
<br>

HTTP | PATH | DESCRIPTION | JSON
------ | ------ | ------ |  ------
GET    | /   |  Index Page |  NO
GET   | /restaurants/list   |  Restaurants List |  NO
GET   | /hotel/list  |  Hotel list |  NO
GET   | /disco/list  |  Discos list |  NO
GET   | /events/LIST   |  Events list  |  NO
GET   | /restaurants/create   |  Create Restaurants from render |  NO
POST  | /restaurants/create   |  Create Restaurants from handler  |  NO
GET   | /restaurants/list/:id   |  Restaurant details  |  NO
GET   | /restaurants/:id/edit  |  Edit Restaurants from render |  NO
POST  | /restaurants/:id/edit  |  Edit Restaurants from handler |  NO
POST  | /restaurants/:id/delete  |  Delete Restaurants |  NO
GET   | /hotels/create   |  Create Hotel form render  |  NO
POST  | /hotels/create   |  Create Hotel from handler  |  NO
GET   | /hotels/list/:id   |  Hotel Details  |  NO
GET   | /hotels/:id/edit  |  Edit Hotel from render |  NO
POST  | /hotels/:id/edit  |  Edit Hotel from handler |  NO
POST  | /hotels/:id/delete  |  Delete Hotel |  NO
GET   | /DISCO/create   |  Create Disco from render  |  NO
POST  | /disco/create   |  Create Disco from handler  |  NO
GET   | /disco/list/:id   |  Disco Details  |  NO
GET   | /disco/:id/edit  |  Edit Disco from render |  NO
POST  | /disco/:id/edit  |  Edit Disco from handler |  NO
POST  | /disco/:id/delete  |  Delete Disco|  NO
GET   | /events/create   |  Create Events from handler  |  NO
POST  | /events/create   |  Create Events from handler  |  NO
GET   | /events/list/:id   |  Event Details  |  NO
GET   | /events/:id/edit  |  Edit Event from render |  NO
POST  | /events:id/edit  |  Edit Event from handler |  NO
POST  | /events:id/delete  |  Delete Event |  NO

<br>
<hr>

HTTP | PATH | DESCRIPTION | JSON
------ | ------ | ------ |  ------
GET   | /user/:id  |  Profile  |  NO
GET   | /creator/:id  |  Profile  |  NO
GET   | /admin/:id  |  Profile  |  NO

<hr>
<br>

HTTP | PATH | DESCRIPTION | JSON
------ | ------ | ------ |  ------
GET   | /api/maps |  maps  |  Si
GET   | /api/ticketmaster |  events  |  Si

<hr>
<br>

## MODEL PLACES

name: {
    type: String,
    required: true,
    unique: true,
}
<hr>
type: {
    type: String
    enum: ['Hotel', 'Restaurant', 'disco', 'Event']
}
<hr>
description: {
    type: String,
    minlength: 2,
    maxlength: 150,
}
<hr>
imageUrl: {
    type: String,
}
<hr>
location: {
    type: {
            type: String.
        },
        coordinates: [NUMBER]
}
<hr>
{
    timestamps: true
}
<hr>
<br>

## MODEL USER
username: {
    type:String,
    required: true,
    unique: true
}
<hr>
email: {
    type: String,
    uniqued: true,
    required: true,
}
<hr>
password: {
    type: String,
    required: true,
}
<hr>
role: {
    type: String,
    enum: ['USER', 'CREATOR', 'ADMIN']
    default: 'USER'
}
<hr>
{
    timestamps: true
}
