---
order: 2
title: Calendar
---

# Calendar

:::tip
Calendars belong to [Zammad's SLA calculation](/en/reference/rest-api/sla).
:::

## List

Required permission: `admin.calendar`

`GET`-Request sent: `/api/v1/calendars`

::: details Show response

```json
Status: 200 Ok

[
   {
      "id":2,
      "name":"Test calendar",
      "timezone":"Europe/Berlin",
      "business_hours":{
         "mon":{
            "active":true,
            "timeframes":[
               [
                  "09:00",
                  "17:00"
               ]
            ]
         },
         "tue":{
            "active":true,
            "timeframes":[
               [
                  "09:00",
                  "17:00"
               ]
            ]
         },
         "wed":{
            "active":true,
            "timeframes":[
               [
                  "09:00",
                  "17:00"
               ]
            ]
         },
         "thu":{
            "active":true,
            "timeframes":[
               [
                  "09:00",
                  "17:00"
               ]
            ]
         },
         "fri":{
            "active":true,
            "timeframes":[
               [
                  "09:00",
                  "17:00"
               ]
            ]
         },
         "sat":{
            "active":false,
            "timeframes":[
               [
                  "10:00",
                  "14:00"
               ]
            ]
         },
         "sun":{
            "active":false,
            "timeframes":[
               [
                  "10:00",
                  "14:00"
               ]
            ]
         }
      },
      "default":false,
      "ical_url":"",
      "public_holidays":{
         "2021-11-10":{
            "active":true,
            "summary":"Feast day 1"
         },
         "2021-11-11":{
            "active":true,
            "summary":"Feast day 2"
         }
      },
      "last_log":null,
      "last_sync":"2021-11-10T13:14:20.835Z",
      "updated_by_id":3,
      "created_by_id":3,
      "created_at":"2021-11-10T13:14:20.835Z",
      "updated_at":"2021-11-10T13:14:20.835Z"
   }
]
```
:::

## Show

Required permission: `admin.calendar`

`GET`-Request sent: `/api/v1/calendars/{id}`

::: details Show response

```json
Status: 200 Ok

{
   "id":2,
   "name":"Test calendar",
   "timezone":"Europe/Berlin",
   "business_hours":{
      "mon":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "tue":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "wed":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "thu":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "fri":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "sat":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      },
      "sun":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      }
   },
   "default":false,
   "ical_url":"",
   "public_holidays":{
      "2021-11-10":{
         "active":true,
         "summary":"Feast day 1"
      },
      "2021-11-11":{
         "active":true,
         "summary":"Feast day 2"
      }
   },
   "last_log":null,
   "last_sync":"2021-11-10T13:14:20.835Z",
   "updated_by_id":3,
   "created_by_id":3,
   "created_at":"2021-11-10T13:14:20.835Z",
   "updated_at":"2021-11-10T13:14:20.835Z"
}
```
:::

## Create

Required permission: `admin.calendar`

`POST`-Request sent: `/api/v1/calendars`

:::: details Show request/response

::: tabs key:req-res

=== Request

```json
{
   "name":"Test calendar",
   "timezone":"Europe/Berlin",
   "business_hours":{
      "mon":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "tue":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "wed":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "thu":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "fri":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "sat":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      },
      "sun":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      }
   },
   "ical_url":"",
   "public_holidays":{
      "2021-11-10":{
         "active":true,
         "summary":"Feast day 1"
      },
      "2021-11-11":{
         "active":true,
         "summary":"Feast day 2"
      }
   },
   "note":"",
   "id":"c-1"
}
```

=== Response

```json
Status: 201 Created

{
   "id":2,
   "name":"Test calendar",
   "timezone":"Europe/Berlin",
   "business_hours":{
      "mon":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "tue":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "wed":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "thu":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "fri":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "sat":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      },
      "sun":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      }
   },
   "default":false,
   "ical_url":"",
   "public_holidays":{
      "2021-11-10":{
         "active":true,
         "summary":"Feast day 1"
      },
      "2021-11-11":{
         "active":true,
         "summary":"Feast day 2"
      }
   },
   "last_log":null,
   "last_sync":"2021-11-10T13:14:20.835Z",
   "updated_by_id":3,
   "created_by_id":3,
   "created_at":"2021-11-10T13:14:20.835Z",
   "updated_at":"2021-11-10T13:14:20.835Z"
}
```
:::
::::

## Update

Required permission: `admin.calendar`

`PUT`-Request sent: `/api/v1/calendars/{id}`

:::: details Show request/response

::: tabs key:req-res

=== Request

```json
{
   "name":"Test calendar Update",
   "timezone":"Europe/Berlin",
   "default":false,
   "business_hours":{
      "mon":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "tue":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "wed":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "thu":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "fri":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "sat":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      },
      "sun":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      }
   },
   "ical_url":"",
   "public_holidays":{
      "2021-11-10":{
         "active":true,
         "summary":"Feast day 1"
      },
      "2021-11-11":{
         "active":true,
         "summary":"Feast day 2"
      }
   },
   "note":"",
   "id":2
}
```
=== Response

```json
Status: 200 Ok

{
   "id":2,
   "name":"Test calendar Update",
   "timezone":"Europe/Berlin",
   "default":false,
   "ical_url":"",
   "business_hours":{
      "mon":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "tue":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "wed":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "thu":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "fri":{
         "active":true,
         "timeframes":[
            [
               "09:00",
               "17:00"
            ]
         ]
      },
      "sat":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      },
      "sun":{
         "active":false,
         "timeframes":[
            [
               "10:00",
               "14:00"
            ]
         ]
      }
   },
   "public_holidays":{
      "2021-11-10":{
         "active":true,
         "summary":"Feast day 1"
      },
      "2021-11-11":{
         "active":true,
         "summary":"Feast day 2"
      }
   },
   "updated_by_id":3,
   "last_log":null,
   "last_sync":"2021-11-10T13:23:07.455Z",
   "created_by_id":3,
   "created_at":"2021-11-10T13:14:20.835Z",
   "updated_at":"2021-11-10T13:23:07.455Z"
}
```
:::
::::

## Delete

Required permission: `admin.calendar`

`DELETE`-Request sent: `/api/v1/calendars/{id}`

::: danger

**This is a permanent removal**

Please note that removing Calendar configurations cannot be undone.

Removing calendars with references in SLA configurations is not possible
via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is *not* a bug.
:::

::: details Show response

```json
Status: 200 Ok

{}
```
:::
