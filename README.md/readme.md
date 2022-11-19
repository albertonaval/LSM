## ROUTES
<hr>
<br>

HTTP | PATH | DESCRIPTION | JSON
------ | ------ | ------ |  ------
GET    | /   |  INDEX |  NO
GET   | /RESTAURANTS/LIST   |  LIST |  NO
GET   | /HOTELS/LIST  |  LIST |  NO
GET   | /DISCO/LIST   |  LIST |  NO
GET   | /EVENTS/LIST   |  LIST  |  NO
GET   | /RESTAURANTS/CREATE   |  CREATE  |  NO
POST  | /RESTAURANTS/CREATE   |  CREATE  |  NO
GET   | /RESTAURANTS/LIST/:Id   |  DETAILS  |  NO
GET   | /RESTAURANTS/:Id/EDIT  |  EDIT |  NO
POST  | /RESTAURANTS/:Id/EDIT  |  EDIT |  NO
POST  | /RESTAURANTS/:Id/DELETE  |  DELETE |  NO
GET   | /HOTELS/CREATE   |  CREATE  |  NO
POST  | /HOTELS/CREATE   |  CREATE  |  NO
GET   | /HOTELS/LIST/:Id   |  DETAILS  |  NO
GET   | /HOTELS/:Id/EDIT  |  EDIT |  NO
POST  | /HOTELS/:Id/EDIT  |  EDIT |  NO
POST  | /HOTELS/:Id/DELETE  |  DELETE |  NO
GET   | /DISCO/CREATE   |  CREATE  |  NO
POST  | /DISCO/CREATE   |  CREATE  |  NO
GET   | /DISCO/LIST/:Id   |  DETAILS  |  NO
GET   | /DISCO/:Id/EDIT  |  EDIT |  NO
POST  | /DISCO/:Id/EDIT  |  EDIT |  NO
POST  | /DISCO/:Id/DELETE  |  DELETE |  NO
GET   | /EVENTS/CREATE   |  CREATE  |  NO
POST  | /EVENTS/CREATE   |  CREATE  |  NO
GET   | /EVENTS/LIST/:Id   |  DETAILS  |  NO
GET   | /EVENTS/:Id/EDIT  |  EDIT |  NO
POST  | /EVENTS:Id/EDIT  |  EDIT |  NO
POST  | /EVENTS:Id/DELETE  |  DELETE |  NO

<br>
<hr>

HTTP | PATH | DESCRIPTION | JSON
------ | ------ | ------ |  ------
GET   | /USER/:Id  |  PROFILE  |  NO
GET   | /CREATOR/:Id  |  PROFILE  |  NO
GET   | /ADMIN/:Id  |  PROFILE  |  NO

<hr>
<br>

HTTP | PATH | DESCRIPTION | JSON
------ | ------ | ------ |  ------
GET   | /API/MAPS |  MAPS  |  SI
GET   | /API/TICKETMASTER |  EVENTS  |  SI

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
    enum: ['Hotel', 'Restaurant', 'Disco', 'Event']
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
