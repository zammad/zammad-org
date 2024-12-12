---
order: 2
title: Checklist
---

# Checklist

Zammad has different checklist endpoints:

- [Checklists](#checklists)
- [Checklist items](#checklist-items)
- [Checklist templates](#checklist-templates)

:::info
*Checklist templates* include their items whereas the *standard
checklist* has a separate item endpoint.
:::

## Checklists

:::info
To add checklist items, use the [checklist items endpoint](#checklist-items).
:::

### Show

Required permission: `ticket.agent`

`GET`-Request sent: `/api/v1/checklists/{checklist id}`

::: details Show response

``` json
# HTTP-Code 200 OK

{
   "name": "Return order",
   "sorted_item_ids": [
      "18",
      "19",
      "20",
      "21"
   ],
   "updated_by_id": 3,
   "created_by_id": 3,
   "ticket_id": 4,
   "id": 6,
   "created_at": "2024-10-15T08:47:50.860Z",
   "updated_at": "2024-10-15T08:50:52.698Z",
   "item_ids": [
      18,
      19,
      20,
      21
   ]
}
```
:::

### Show By Ticket

Required permission: `ticket.agent`

`GET`-Request sent: `/api/v1/checklists/by_ticket/{ticket id}`

::: details Show response

``` json
# HTTP-Code 200 OK

{
   "id": 6,
   "assets": {
      "Checklist": {
         "6": {
            "name": "Return order",
            "sorted_item_ids": [
               "18",
               "19",
               "20",
               "21"
            ],
            "updated_by_id": 3,
            "created_by_id": 3,
            "ticket_id": 4,
            "id": 6,
            "created_at": "2024-10-15T08:47:50.860Z",
            "updated_at": "2024-10-15T08:50:52.698Z",
            "item_ids": [
               18,
               19,
               20,
               21
            ]
         }
      },
      "ChecklistItem": {
         "18": {
            "text": "Prepare shipment",
            "checked": false,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_by_id": 3,
            "checklist_id": 6,
            "id": 18,
            "created_at": "2024-10-15T08:47:51.036Z",
            "updated_at": "2024-10-15T08:47:59.717Z"
         },
         "19": {
            "text": "Inform customer",
            "checked": false,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_by_id": 3,
            "checklist_id": 6,
            "id": 19,
            "created_at": "2024-10-15T08:48:02.042Z",
            "updated_at": "2024-10-15T08:48:12.726Z"
         },
         "20": {
            "text": "Hand over the goods to the shipping company",
            "checked": false,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_by_id": 3,
            "checklist_id": 6,
            "id": 20,
            "created_at": "2024-10-15T08:48:14.216Z",
            "updated_at": "2024-10-15T08:49:10.467Z"
         },
         "21": {
            "text": "Check whether return has arrived",
            "checked": false,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_by_id": 3,
            "checklist_id": 6,
            "id": 21,
            "created_at": "2024-10-15T08:49:12.388Z",
            "updated_at": "2024-10-15T08:49:40.746Z"
         }
      }
   }
}
```
:::

### Create

Required permission: `ticket.agent`

`POST`-Request sent: `/api/v1/checklists`

:::: details Show request/response

::: tabs key:reqres

=== Request

``` json
{
   "ticket_id": 7,
   "template_id": 1
}
```

=== Response

``` json
# HTTP-Code 200 OK

{
   "id": 13,
   "assets": {
      "Checklist": {
         "13": {
            "id": 13,
            "name": "Return order",
            "sorted_item_ids": [
               "36",
               "37",
               "38",
               "39"
            ],
            "created_by_id": 3,
            "updated_by_id": 3,
            "created_at": "2024-11-06T13:52:03.826Z",
            "updated_at": "2024-11-06T13:52:03.916Z",
            "item_ids": [
               36,
               37,
               38,
               39
            ]
         }
      },
      "ChecklistItem": {
         "36": {
            "id": 36,
            "text": "Prepare shipment",
            "checked": false,
            "checklist_id": 13,
            "created_by_id": 3,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_at": "2024-11-06T13:52:03.874Z",
            "updated_at": "2024-11-06T13:52:03.874Z"
         },
         "37": {
            "id": 37,
            "text": "Inform customer",
            "checked": false,
            "checklist_id": 13,
            "created_by_id": 3,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_at": "2024-11-06T13:52:03.888Z",
            "updated_at": "2024-11-06T13:52:03.888Z"
         },
         "38": {
            "id": 38,
            "text": "Hand over the goods to the shipping company",
            "checked": false,
            "checklist_id": 13,
            "created_by_id": 3,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_at": "2024-11-06T13:52:03.898Z",
            "updated_at": "2024-11-06T13:52:03.898Z"
         },
         "39": {
            "id": 39,
            "text": "Check whether return has arrived",
            "checked": false,
            "checklist_id": 13,
            "created_by_id": 3,
            "updated_by_id": 3,
            "ticket_id": null,
            "created_at": "2024-11-06T13:52:03.907Z",
            "updated_at": "2024-11-06T13:52:03.907Z"
         }
      },
      "Ticket": {
         "7": {
            "checklist_id": 13,
            "updated_by_id": 3,
            "number": "16007",
            "title": "complaint wrong items in order #55194711",
            "customer_id": 6,
            "organization_id": 3,
            "group_id": 1,
            "owner_id": 1,
            "state_id": 4,
            "pending_time": null,
            "priority_id": 2,
            "id": 7,
            "note": null,
            "first_response_at": null,
            "first_response_escalation_at": null,
            "first_response_in_min": null,
            "first_response_diff_in_min": null,
            "close_at": "2024-11-06T11:57:07.439Z",
            "close_escalation_at": null,
            "close_in_min": null,
            "close_diff_in_min": null,
            "update_escalation_at": null,
            "update_in_min": null,
            "update_diff_in_min": null,
            "last_close_at": "2024-11-06T11:57:07.439Z",
            "last_contact_at": "2024-09-05T12:05:17.455Z",
            "last_contact_agent_at": "2024-09-05T12:05:17.455Z",
            "last_contact_customer_at": "2024-09-04T14:05:17.394Z",
            "last_owner_update_at": null,
            "create_article_type_id": 1,
            "create_article_sender_id": 2,
            "article_count": 2,
            "escalation_at": null,
            "type": null,
            "time_unit": null,
            "preferences": {},
            "created_by_id": 6,
            "created_at": "2024-09-04T14:05:17.394Z",
            "updated_at": "2024-11-06T13:52:03.918Z",
            "referencing_checklist_ids": [],
            "article_ids": [
               13,
               14
            ],
            "ticket_time_accounting_ids": []
         }
      },
      "Group": {
         "1": {
            "id": 1,
            "signature_id": 1,
            "email_address_id": null,
            "name": "Sales",
            "name_last": "Sales",
            "parent_id": null,
            "assignment_timeout": null,
            "follow_up_possible": "yes",
            "reopen_time_in_days": null,
            "follow_up_assignment": true,
            "active": true,
            "shared_drafts": true,
            "note": "Fast Lane Sales",
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:04:59.574Z",
            "updated_at": "2024-11-05T14:05:09.464Z",
            "user_ids": [
               4,
               3,
               5
            ]
         },
         "2": {
            "id": 2,
            "signature_id": null,
            "email_address_id": null,
            "name": "Support::2nd Level",
            "name_last": "2nd Level",
            "parent_id": null,
            "assignment_timeout": null,
            "follow_up_possible": "yes",
            "reopen_time_in_days": null,
            "follow_up_assignment": true,
            "active": true,
            "shared_drafts": true,
            "note": null,
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:08.581Z",
            "updated_at": "2024-11-05T14:05:09.477Z",
            "user_ids": [
               4,
               3,
               5
            ]
         },
         "3": {
            "id": 3,
            "signature_id": null,
            "email_address_id": null,
            "name": "IT Internal",
            "name_last": "IT Internal",
            "parent_id": null,
            "assignment_timeout": null,
            "follow_up_possible": "yes",
            "reopen_time_in_days": null,
            "follow_up_assignment": true,
            "active": true,
            "shared_drafts": true,
            "note": null,
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:08.610Z",
            "updated_at": "2024-11-05T14:05:09.485Z",
            "user_ids": [
               4,
               3,
               5
            ]
         }
      },
      "User": {
         "1": {
            "id": 1,
            "organization_id": null,
            "login": "-",
            "firstname": "-",
            "lastname": "",
            "email": "",
            "image": null,
            "image_source": null,
            "web": "",
            "phone": "",
            "fax": "",
            "mobile": "",
            "department": "",
            "street": "",
            "zip": "",
            "city": "",
            "country": "",
            "address": "",
            "vip": false,
            "verified": false,
            "active": false,
            "note": "",
            "last_login": null,
            "source": null,
            "login_failed": 0,
            "out_of_office": false,
            "out_of_office_start_at": null,
            "out_of_office_end_at": null,
            "out_of_office_replacement_id": null,
            "preferences": {},
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:04:58.476Z",
            "updated_at": "2024-11-05T14:04:58.476Z",
            "role_ids": [],
            "two_factor_preference_ids": [],
            "organization_ids": [],
            "authorization_ids": [],
            "overview_sorting_ids": [],
            "group_ids": {}
         },
         "6": {
            "id": 6,
            "organization_id": 3,
            "login": "evely.smith@midlandbank.biz",
            "firstname": "Evelyn",
            "lastname": "Smith",
            "email": "evely.smith@midlandbank.biz",
            "image": "4b1cb1fae2e608ffa72099774e1f57ad",
            "image_source": null,
            "web": "",
            "phone": "415-123-5858",
            "fax": "",
            "mobile": "",
            "department": null,
            "street": "",
            "zip": "",
            "city": "",
            "country": "",
            "address": "",
            "vip": false,
            "verified": false,
            "active": true,
            "note": "Main contact for Midland",
            "last_login": null,
            "source": null,
            "login_failed": 0,
            "out_of_office": false,
            "out_of_office_start_at": null,
            "out_of_office_end_at": null,
            "out_of_office_replacement_id": null,
            "preferences": {
               "lat": 37.8176155,
               "lng": -122.47831227441239,
               "tickets_closed": 2,
               "tickets_open": 1
            },
            "updated_by_id": 3,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:09.670Z",
            "updated_at": "2024-11-06T11:57:10.165Z",
            "role_ids": [
               3
            ],
            "two_factor_preference_ids": [],
            "organization_ids": [],
            "authorization_ids": [],
            "overview_sorting_ids": [],
            "group_ids": {}
         },
         "7": {
            "id": 7,
            "organization_id": 3,
            "login": "alex@fastlane.inc",
            "firstname": "Alexander",
            "lastname": "Jensen",
            "email": "alex@fastlane.inc",
            "image": "5911d228f3588c36a72d80eb0c1e4d08",
            "image_source": null,
            "web": "",
            "phone": "855-666-7777",
            "fax": "",
            "mobile": "",
            "department": null,
            "street": "",
            "zip": "",
            "city": "",
            "country": "",
            "address": "",
            "vip": false,
            "verified": false,
            "active": true,
            "note": "",
            "last_login": null,
            "source": null,
            "login_failed": 0,
            "out_of_office": false,
            "out_of_office_start_at": null,
            "out_of_office_end_at": null,
            "out_of_office_replacement_id": null,
            "preferences": {
               "tickets_closed": 1,
               "tickets_open": 1
            },
            "updated_by_id": 3,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:10.244Z",
            "updated_at": "2024-11-06T13:51:06.168Z",
            "role_ids": [
               3
            ],
            "two_factor_preference_ids": [],
            "organization_ids": [],
            "authorization_ids": [],
            "overview_sorting_ids": [],
            "group_ids": {}
         },
         "8": {
            "id": 8,
            "organization_id": 3,
            "login": "emily@fastlane.inc",
            "firstname": "Emily",
            "lastname": "Wilson",
            "email": "emily@fastlane.inc",
            "image": "99ba64a89f7783c099c304c9b00ff9e8",
            "image_source": null,
            "web": "",
            "phone": "0061 2 1234 7777",
            "fax": "",
            "mobile": "",
            "department": null,
            "street": "",
            "zip": "",
            "city": "",
            "country": "",
            "address": "",
            "vip": false,
            "verified": false,
            "active": true,
            "note": "",
            "last_login": null,
            "source": null,
            "login_failed": 0,
            "out_of_office": false,
            "out_of_office_start_at": null,
            "out_of_office_end_at": null,
            "out_of_office_replacement_id": null,
            "preferences": {
               "lat": -33.8275368,
               "lng": 151.0820211
            },
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:12.317Z",
            "updated_at": "2024-11-05T14:05:12.858Z",
            "role_ids": [
               3
            ],
            "two_factor_preference_ids": [],
            "organization_ids": [],
            "authorization_ids": [],
            "overview_sorting_ids": [],
            "group_ids": {}
         },
         "3": {
            "id": 3,
            "organization_id": 2,
            "login": "lauren@fastlane.inc",
            "firstname": "Lauren",
            "lastname": "Brooks",
            "email": "lauren@fastlane.inc",
            "image": "7a6a0d1d94ad2037153cf3a6c1b49a53",
            "image_source": null,
            "web": "",
            "phone": "",
            "fax": "",
            "mobile": "",
            "department": null,
            "street": "",
            "zip": "",
            "city": "",
            "country": "",
            "address": null,
            "vip": false,
            "verified": false,
            "active": true,
            "note": "",
            "last_login": "2024-11-06T08:32:10.202Z",
            "source": null,
            "login_failed": 0,
            "out_of_office": false,
            "out_of_office_start_at": null,
            "out_of_office_end_at": null,
            "out_of_office_replacement_id": null,
            "preferences": {
               "locale": "en-us",
               "notification_config": {
                  "matrix": {
                     "create": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": true,
                           "subscribed": true,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "update": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": true,
                           "subscribed": true,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "reminder_reached": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": false,
                           "subscribed": false,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "escalation": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": false,
                           "subscribed": false,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     }
                  }
               },
               "intro": true,
               "keyboard_shortcuts_clues": true,
               "theme": "light"
            },
            "updated_by_id": 3,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:08.938Z",
            "updated_at": "2024-11-06T08:34:36.031Z",
            "role_ids": [
               1,
               2
            ],
            "two_factor_preference_ids": [],
            "organization_ids": [],
            "authorization_ids": [],
            "overview_sorting_ids": [],
            "group_ids": {
               "1": [
                  "full"
               ],
               "2": [
                  "full"
               ],
               "3": [
                  "full"
               ]
            }
         },
         "4": {
            "id": 4,
            "organization_id": 2,
            "login": "jackson@fastlane.inc",
            "firstname": "Jackson",
            "lastname": "Lee",
            "email": "jackson@fastlane.inc",
            "image": "95afc1244af5cb8b77edcd7224c5d5f8",
            "image_source": null,
            "web": "",
            "phone": "",
            "fax": "",
            "mobile": "",
            "department": null,
            "street": "",
            "zip": "",
            "city": "",
            "country": "",
            "address": null,
            "vip": false,
            "verified": false,
            "active": true,
            "note": "",
            "last_login": null,
            "source": null,
            "login_failed": 0,
            "out_of_office": false,
            "out_of_office_start_at": null,
            "out_of_office_end_at": null,
            "out_of_office_replacement_id": null,
            "preferences": {
               "locale": "en-us",
               "notification_config": {
                  "matrix": {
                     "create": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": true,
                           "subscribed": true,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "update": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": true,
                           "subscribed": true,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "reminder_reached": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": false,
                           "subscribed": false,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "escalation": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": false,
                           "subscribed": false,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     }
                  }
               }
            },
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:09.247Z",
            "updated_at": "2024-11-05T14:05:09.329Z",
            "role_ids": [
               1,
               2
            ],
            "two_factor_preference_ids": [],
            "organization_ids": [],
            "authorization_ids": [],
            "overview_sorting_ids": [],
            "group_ids": {
               "1": [
                  "full"
               ],
               "2": [
                  "full"
               ],
               "3": [
                  "full"
               ]
            }
         },
         "5": {
            "id": 5,
            "organization_id": 2,
            "login": "emily.t@fastlane.inc",
            "firstname": "Emma",
            "lastname": "Taylor",
            "email": "emily.t@fastlane.inc",
            "image": "b64fef91c29105b4a08a2a69be08eda3",
            "image_source": null,
            "web": "",
            "phone": "",
            "fax": "",
            "mobile": "",
            "department": null,
            "street": "",
            "zip": "",
            "city": "",
            "country": "",
            "address": null,
            "vip": false,
            "verified": false,
            "active": true,
            "note": "",
            "last_login": null,
            "source": null,
            "login_failed": 0,
            "out_of_office": false,
            "out_of_office_start_at": null,
            "out_of_office_end_at": null,
            "out_of_office_replacement_id": null,
            "preferences": {
               "locale": "en-us",
               "notification_config": {
                  "matrix": {
                     "create": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": true,
                           "subscribed": true,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "update": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": true,
                           "subscribed": true,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "reminder_reached": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": false,
                           "subscribed": false,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     },
                     "escalation": {
                        "criteria": {
                           "owned_by_me": true,
                           "owned_by_nobody": false,
                           "subscribed": false,
                           "no": false
                        },
                        "channel": {
                           "email": true,
                           "online": true
                        }
                     }
                  }
               }
            },
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:09.444Z",
            "updated_at": "2024-11-05T14:05:09.565Z",
            "role_ids": [
               2
            ],
            "two_factor_preference_ids": [],
            "organization_ids": [],
            "authorization_ids": [],
            "overview_sorting_ids": [],
            "group_ids": {
               "1": [
                  "full"
               ],
               "2": [
                  "full"
               ],
               "3": [
                  "full"
               ]
            }
         }
      },
      "Organization": {
         "3": {
            "id": 3,
            "name": "Midland Bank",
            "shared": true,
            "domain": "",
            "domain_assignment": false,
            "active": true,
            "vip": false,
            "note": "Financial industry; very good customer!",
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:08.651Z",
            "updated_at": "2024-11-05T14:05:08.651Z",
            "member_ids": [
               6,
               7,
               8
            ],
            "secondary_member_ids": []
         },
         "2": {
            "id": 2,
            "name": "Joe's car parts",
            "shared": true,
            "domain": "",
            "domain_assignment": false,
            "active": true,
            "vip": false,
            "note": "Their shipping department often needs computer spare parts as well as printers!",
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:05:08.629Z",
            "updated_at": "2024-11-05T14:05:08.629Z",
            "member_ids": [
               3,
               4,
               5
            ],
            "secondary_member_ids": []
         }
      },
      "Role": {
         "3": {
            "id": 3,
            "name": "Customer",
            "preferences": {},
            "default_at_signup": true,
            "active": true,
            "note": "People who create Tickets ask for help.",
            "updated_by_id": 3,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:04:58.608Z",
            "updated_at": "2024-11-05T14:05:25.323Z",
            "permission_ids": [
               61,
               63,
               64,
               65,
               67,
               68,
               71
            ],
            "knowledge_base_permission_ids": [],
            "group_ids": {}
         },
         "1": {
            "id": 1,
            "name": "Admin",
            "preferences": {},
            "default_at_signup": false,
            "active": true,
            "note": "To configure your system.",
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:04:58.562Z",
            "updated_at": "2024-11-05T14:04:58.562Z",
            "permission_ids": [
               1,
               56,
               58,
               62
            ],
            "knowledge_base_permission_ids": [],
            "group_ids": {}
         },
         "2": {
            "id": 2,
            "name": "Agent",
            "preferences": {},
            "default_at_signup": false,
            "active": true,
            "note": "To work on Tickets.",
            "updated_by_id": 1,
            "created_by_id": 1,
            "created_at": "2024-11-05T14:04:58.592Z",
            "updated_at": "2024-11-05T14:04:58.592Z",
            "permission_ids": [
               52,
               54,
               57,
               60,
               62
            ],
            "knowledge_base_permission_ids": [],
            "group_ids": {}
         }
      }
   }
}
```
:::
::::

### Aktualisierung

Required permission: `ticket.agent`

`PATCH`-Request sent: `/api/v1/checklists/{checklist id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

``` json
{
   "name": "New checklist name",
   "sorted_item_ids": [
      "34",
      "33",
      "32"
   ]
}
```

=== Response

``` json
# HTTP-Code 200 OK

{
   "name": "New checklist name",
   "sorted_item_ids": [
      "34",
      "33",
      "32"
   ],
   "updated_by_id": 3,
   "created_by_id": 3,
   "ticket_id": 7,
   "id": 12,
   "created_at": "2024-10-16T06:57:51.474Z",
   "updated_at": "2024-10-16T07:49:06.923Z",
   "item_ids": [
      32,
      33,
      34
   ]
}
```
:::
::::

### Delete

Required permission: `ticket.agent`

`DELETE`-Request sent: `/api/v1/checklists/{checklist id}`

::: details Show response

``` json
# HTTP-Code 200 OK
```
:::

## Checklist Items

### Show

Required permission: `ticket.agent`

`GET`-Request sent: `/api/v1/checklist_items/{checklist item id}`

::: details Show response

``` json
# HTTP-Code 200 OK

{
   "text": "Hand over the goods to the shipping company",
   "checked": false,
   "updated_by_id": 3,
   "ticket_id": null,
   "created_by_id": 3,
   "checklist_id": 6,
   "id": 20,
   "created_at": "2024-10-15T08:48:14.216Z",
   "updated_at": "2024-10-15T08:49:10.467Z"
}
```
:::

### Create

Required permission: `ticket.agent`

`POST`-Request sent: `/api/v1/checklist_items`

:::: details Show request/response

::: tabs key:reqres

=== Request

``` json
{
   "text": "New Item via API!",
   "checklist_id": 12,
   "checked": false
}
```

=== Response

``` json
# HTTP-Code 200 OK

{
   "id": 35,
   "text": "New Item via API!",
   "checked": false,
   "checklist_id": 12,
   "created_by_id": 3,
   "updated_by_id": 3,
   "created_at": "2024-10-16T08:00:35.347Z",
   "updated_at": "2024-10-16T08:00:35.347Z",
   "ticket_id": null
}
```
:::
::::

### Aktualisierung

Required permission: `ticket.agent`

`PATCH`-Request sent: `/api/v1/checklist_items/{checklist item id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

``` json
{
   "text": "Changed checklist item",
   "checked": true
}
```

=== Response

``` json
# HTTP-Code 200 OK

{
   "text": "Changed checklist item",
   "checked": true,
   "updated_by_id": 3,
   "ticket_id": null,
   "created_by_id": 3,
   "checklist_id": 6,
   "id": 20,
   "created_at": "2024-10-15T08:48:14.216Z",
   "updated_at": "2024-10-15T12:19:35.235Z"
}
```

:::
::::

### Delete

Required permission: `ticket.agent`

`DELETE`-Request sent: `/api/v1/checklist_items/{checklist item id}`

::: details Show response

``` json
# HTTP-Code 200 OK
```
:::

## Checklist Templates

### Show

Required permission: `admin.checklists` or `ticket.agent`

`GET`-Request sent: `/api/v1/checklist_templates/{checklist template id}`

::: details Show response

``` json
# HTTP-Code 200 OK

{
     "name": "Return order",
     "active": true,
     "updated_by_id": 3,
     "created_by_id": 3,
     "id": 28,
     "sorted_item_ids": [
         "18",
         "19",
         "20",
         "21"
     ],
     "created_at": "2024-10-15T12:43:14.642Z",
     "updated_at": "2024-10-15T12:43:34.242Z",
     "item_ids": [
         18,
         19,
         20,
         21
     ]
 }
```
:::

### Create

Required permission: `admin.checklists`

`POST`-Request sent: `/api/v1/checklist_templates`


:::: details Show request/response

::: tabs key:reqres

=== Request

``` json
{
   "name": "My checklist template",
   "active": true,
   "items": [
      "Item 1",
      "Item 2",
      "Item 3"
   ]
}
```

=== Response

``` json
# HTTP-Code 200 OK

{
   "id": 30,
   "name": "Test API II",
   "active": true,
   "sorted_item_ids": [
      "22",
      "23",
      "24"
   ],
   "created_by_id": 3,
   "updated_by_id": 3,
   "created_at": "2024-10-15T12:46:31.927Z",
   "updated_at": "2024-10-15T12:46:31.982Z",
   "item_ids": [
      22,
      23,
      24
   ]
}
```
:::
::::


### Aktualisierung

Required permission: `admin.checklists`

`PATCH`-Request sent: `/api/v1/checklist_templates/{checklist template id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

``` json
{
   "name": "My changed checklist template name",
   "active": true,
   "items": [
      "Item 7",
      "Item 8",
      "Item 9"
      ]
}
```

=== Response

``` json
# HTTP-Code 200 OK

{
   "name": "My changed checklist template name",
   "active": true,
   "updated_by_id": 3,
   "created_by_id": 3,
   "id": 30,
   "sorted_item_ids": [
      "25",
      "26",
      "27"
   ],
   "created_at": "2024-10-15T12:46:31.927Z",
   "updated_at": "2024-10-15T12:51:22.245Z",
   "item_ids": [
      25,
      26,
      27
   ]
}
```
:::
::::

### Delete

Required permission: `admin.checklists`

`DELETE`-Request sent: `/api/v1/checklist_templates/{checklist template id}`

:::details Show response

``` json
# HTTP-Code 200 OK
```
:::