---
order: 2
title: SLA
---

# Service-Level Agreements (SLA)

::: tip
SLAs depend on [Zammad's calendars](/en/reference/rest-api/calendar).
:::

## List

Required permission: `admin.sla`

`GET`-Request sent: `/api/v1/slas`

::: details Show response

Response:

``` json
# HTTP-Code 200 Ok

[
   {
      "id":2,
      "calendar_id":1,
      "name":"new sla",
      "first_response_time":120,
      "response_time":null,
      "update_time":120,
      "solution_time":120,
      "condition":{
         "ticket.state_id":{
            "operator":"is",
            "value":"2"
         }
      },
      "updated_by_id":3,
      "created_by_id":3,
      "created_at":"2021-11-10T12:54:39.368Z",
      "updated_at":"2021-11-10T12:54:39.368Z"
   }
]
```
:::

## Show

Required permission: `admin.sla`

`GET`-Request sent: `/api/v1/slas/{id}`

::: details Show response

``` json
# HTTP-Code 200 Ok

{
   "id":2,
   "calendar_id":1,
   "name":"new sla",
   "first_response_time":120,
   "response_time":null,
   "update_time":120,
   "solution_time":120,
   "condition":{
      "ticket.state_id":{
         "operator":"is",
         "value":"2"
      }
   },
   "updated_by_id":3,
   "created_by_id":3,
   "created_at":"2021-11-10T12:54:39.368Z",
   "updated_at":"2021-11-10T12:54:39.368Z"
}
```
:::

## Create

Required permission: `admin.sla`

`POST`-Request sent: `/api/v1/slas`

:::: details

::: tabs key:reqres

=== Request

``` json
{
   "name":"new sla",
   "first_response_time":"120",
   "response_time":"",
   "update_time":"120",
   "solution_time":"120",
   "condition":{
      "ticket.state_id":{
         "operator":"is",
         "value":"2"
      }
   },
   "calendar_id":"1",
}
```

=== Response

``` json
# HTTP-Code 201 Created

{
   "id":2,
   "calendar_id":1,
   "name":"new sla",
   "first_response_time":120,
   "response_time":null,
   "update_time":120,
   "solution_time":120,
   "condition":{
      "ticket.state_id":{
         "operator":"is",
         "value":"2"
      }
   },
   "updated_by_id":3,
   "created_by_id":3,
   "created_at":"2021-11-10T12:54:39.368Z",
   "updated_at":"2021-11-10T12:54:39.368Z"
}
```
:::
::::

## Aktualisierung

Required permission: `admin.sla`

`PUT`-Request sent: `/api/v1/slas/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

``` json
{
   "name":"update sla",
   "first_response_time":"120",
   "response_time":"",
   "update_time":"120",
   "solution_time":"120",
   "condition":{
      "ticket.state_id":{
         "operator":"is",
         "value":"2"
      }
   },
   "calendar_id":"1",
   "id":2
}
```

=== Response

``` json
# HTTP-Code 200 Ok

{
   "id":2,
   "calendar_id":1,
   "name":"update sla",
   "first_response_time":120,
   "response_time":null,
   "update_time":120,
   "solution_time":120,
   "condition":{
      "ticket.state_id":{
         "operator":"is",
         "value":"2"
      }
   },
   "updated_by_id":3,
   "created_by_id":3,
   "created_at":"2021-11-10T12:54:39.368Z",
   "updated_at":"2021-11-10T13:02:52.053Z"
}
```
:::
::::

## Delete

Required permission: `admin.sla`

`DELETE`-Request sent: `/api/v1/slas/{id}`

::: danger
**This is a permanent removal!**

Please note that removing SLA configurations cannot be undone.
:::

::: details Show response

Response:

``` json
# HTTP-Code 200 Ok

{}
```
:::
