---
order: 4
outline:
  - 2
  - 2
title: 'Elasticsearch Indexed Attributes'
---

# Elasticsearch Indexed Attributes

You can find a list of the main object attributes indexed by Elasticsearch
(ES) below. In other words, if you wish to find a ticket, article, or user
via the Zammad search box, ES can search in any of the fields below.

::: info

- This page lists Zammad's default object attributes which are indexed by ES. There are some more ES indexes, mainly
  about objects in the admin interface of Zammad. They are out of scope of this documentation.
- Attributes marked as <Badge type="info" text="SLA"/> are only set if the ticket is affected by SLA calculation.
  Please note that some attributes may not be set if specific conditions are not met.
- Also note that some attributes may be reset to `null` if no longer applicable.
- All timestamps provided by Zammad are UTC by default. This also applies to times provided by ES.

:::

## Преглед

You can find details about each object attribute in the next section. In
this section, you can get a quick overview about the most important objects
and how they look as complete JSON output.

:::: tabs

=== Ticket

Open details to show complete ticket structure: <Badge type="danger" text="Huge content ahead!"/>

::: details

<<< @/fixtures/es-indexed-attributes/complete-ticket.json

:::

=== Article

The following structure is already included in the ticket index (see first tab) and added here separately for
overview reasons. Open details to see the article content:

::: details

<<< @/fixtures/es-indexed-attributes/complete-article.json

:::

=== User

Open details to show complete user structure:

::: details

<<< @/fixtures/es-indexed-attributes/complete-user.json

:::

=== Organization

Open details to show complete organization structure:

::: details

<<< @/fixtures/es-indexed-attributes/complete-organization.json

:::

::::

## Тикет

The following index contains below mentioned information: `*_ticket`

### `article`

Array with all articles belonging to the ticket. See [article
section](#article-1) for details.

::: details

<<< @/fixtures/es-indexed-attributes/article.json

:::

### `article_count`

Number of articles within the ticket.

Пример: `1`

### `checklist`

Complete checklist structure and elements.

::: details

<<< @/fixtures/es-indexed-attributes/checklist.json

:::

### `close_at`

First close time, set once. See `last_close_at` for the last close time (if
ticket was reopened and closed again).

Example: `"2025-03-20T06:48:46.438Z"`

### `close_diff_in_min` <Badge type="info" text="SLA"/>

Depends on `close_in_min` and tells how many minutes the ticket was closed
relative to SLAs solution time.

Examples: `239`, `-5`

### `close_escalation_at` <Badge type="info" text="SLA"/>

Timestamp when the ticket would escalate in case solution time is violated.

Examples: `null`, `"2025-02-03T15:50:20.673Z"`

### `close_in_min` <Badge type="info" text="SLA"/>

Value in minutes for how long the ticket was open based on business hours.

Examples: `null`, `11`

### `create_article_sender`

Sender of the article (System, Agent, Customer)

::: details

<<< @/fixtures/es-indexed-attributes/create_article_sender.json

:::

### `create_article_sender_id`

ID of the user that created the article.

Примери: `1`, `2`

### `create_article_type`

Information of first article of a ticket.

::: details

<<< @/fixtures/es-indexed-attributes/create_article_type.json

:::

### `create_article_type_id`

ID of the type of the first article.

Пример: `5`

### `created_at`

Timestamp of ticket creation.

Example: `"2025-02-24T16:17:27.210Z"`

### `created_by`

Details of the user who created the ticket. Have a look at the [user
section](#user) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID of user who created the ticket.

Пример: `3`

### `customer`

Details of the customer of the ticket. Have a look at the [user
section](#user) for more information.

### `customer_id`

ID of customer who created the ticket.

Пример: `8`

### `escalation_at` <Badge type="info" text="SLA"/>

Timestamp of the next applicable escalation, independent of escalation type.

Examples: `null`, `"2025-02-24T16:28:38.535Z"`

### `first_response_at` <Badge type="info" text="SLA"/>

Timestamp of the first response to the customer (communication type).

Examples: `null`, `"2025-02-24T16:28:38.303Z"`

### `first_response_diff_in_min` <Badge type="info" text="SLA"/>

Depends on `first_response_in_min` and tells how many minutes the first
response took relative to the first response time of your SLA.

Examples: `null`, `10`, `-6`

### `first_response_in_min` <Badge type="info" text="SLA"/>

Value in minutes about how long the first response took based on the
business hours.

Examples: `null`, `11`

### `group`

Details of the group of the ticket. Have a look at the [group
section](#group-1) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/group.json

:::

### `group_id`

ID of the current group

Пример: `1`

### `id`

ID of the Ticket

Examples: `1`, `111`

### `last_close_at`

Last close time, set on each closing of ticket.

Examples: `null`, `"2025-02-03T14:50:20.673Z"`

### `last_contact_agent_at`

Timestamp of last communication type contact of any agent.

Examples: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_at`

Timestamp of last contact/article of type communication, independent of who
created it.

Examples: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_customer_at`

Timestamp of last contact/article of type communication from customer.

Examples: `null`, `"2025-02-24T16:28:38.303Z"`

### `mention_user_ids`

Array with user IDs of mentioned or subscribed users.

Examples: `[3, 5]`, `[]`

### `note`

Note of ticket, only set via console or API.

Пример: `null`

### `number`

Број тикета.

Examples: `1010138`, `202006231010138`

### `organization`

Details of the customer organization of the ticket. Have a look at the
[organization section](#organization-2) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID of the customers organization of the ticket.

Examples: `null`, `2`

### `owner`

Details of the user who is owner of the ticket. Have a look at the [user
section](#user) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/owner.json

:::

### `owner_id`

User ID of the ticket owner.

Examples: `null`, `3`

### `pending_time`

Timestamp of set pending time. Only if a pending state is set and
independent of the pending state type.

Examples: `null`, `"2025-02-24T17:44:06.912Z"`

### `preferences`

Special information for internal functions. May not be available in your
system, contains information for internal system functions.

### `priority`

Details of the priority state of the ticket. Have a look at the [priority
section](#ticket-priority) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/priority.json

:::

### `priority_id`

Priority ID of the ticket.

Пример: `2`

### `state`

Details of the state of the ticket. Have a look at the [state
section](#ticket-state) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/state.json

:::

### `state_id`

ID актуелног стања тикета.

Примери: `1`, `4`

### `tags`

Array with all tags attached to the ticket.

Examples: `["order", "complaint"]`, `[]`

### `time_unit`

Accounted time units for ticket (total).

Examples: `null`, `15`

### `title`

Title/subject of ticket.

Examples: `Feedback Form`, `Need help`

### `type` <Badge type="warning" text="deprecated"/>

Value: `null`

### `update_diff_in_min` <Badge type="info" text="SLA"/>

Depends on `update_in_min` and tells how many minutes the last ticket update
took relative to the update time setting of the SLA.

Examples: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_escalation_at` <Badge type="info" text="SLA"/>

Timestamp when the ticket would escalate in case the SLA update period is
violated.

Examples: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_in_min` <Badge type="info" text="SLA"/>

Value in minutes for how long the last ticket update took based on the
business hours and update time.

Examples: `null`, `5`, `-10`

### `updated_at`

Timestamp of last ticket update.

Example: `"2025-02-24T16:28:38.303Z"`

### `updated_by`

Details of the user who updated the ticket. Have a look at the [user
section](#user) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID of user who updated the ticket.

Примери: `1`, `3`

## Приоритет тикета

The following index contains below mentioned information:
`*_ticket_priority`

### `active`

Defines if the priority is active or not.

Values: `true`, `false`

### `created_at`

Timestamp of priority creation.

Example: `"2025-02-03T14:50:20.724Z"`

### `created_by_id`

ID of the user who created the priority.

Пример: `1`

### `default_create`

Defines if the priority is the default priority for ticket creation or not.

Values: `false`, `true`

### `id`

ID приоритета.

Пример: `3`

### `name`

Назив приоритета.

Example: `"3 high"`

### `note`

Note for priority that has been set via console or API.

Пример: `"null"`

### `ui_color`

CSS class for the highlight color for tickets with this priority.

Examples: `"null"`, `"high-priority"`

### `ui_icon`

CSS class for highlight icon for tickets with this priority.

Examples: `"null"`, `"important"`

### `updated_at`

Timestamp of last change.

Example: `"2025-02-03T14:50:20.724Z"`

### `updated_by_id`

ID of the user who performed the last update.

Пример: `1`

## Стање тикета

The following index contains below mentioned information: `*_ticket_state`

### `active`

Defines if state is active (available) or not.

Values: `true`, `false`

### `created_at`

Timestamp of the creation of the state.

Example: `"2025-02-03T14:50:20.694Z"`

### `created_by_id`

ID of user who created the state.

Пример: `1`

### `default_create`

Defines if the state is the default state for ticket creation.

Values: `false`, `true`

### `default_follow_up`

Defines if the state is the default follow up state on ticket follow ups.

Values: `false`, `true`

### `id`

ID of the state.

Пример: `7`

### `ignore_escalation`

Defines if SLA calculation is ignored for this state.

Values: `false`, `true`

### `name`

Назив стања.

Example: `"pending close"`

### `next_state`

Contains all follow up state information if applicable, may not be available
depending on the state type

::: details

<<< @/fixtures/es-indexed-attributes/next_state.json

:::

### `next_state_id`

ID of follow up state.

Examples: `null`, `4`

### `note`

Note that has been set via console or API.

Пример: `"null"`

### `state_type`

Contains all available information of the states type

::: details

<<< @/fixtures/es-indexed-attributes/state_type.json

:::

### `state_type_id`

ID of the state type.

Пример: `4`

### `updated_at`

Timestamp of last update of the state.

Example: `"2025-02-03T14:50:20.694Z"`

### `updated_by_id`

ID of user who performed the last update of the state.

Пример: `1`

## Чланак

The following index contains below mentioned information: `*_ticket`

Articles are part of the ticket index. To reduce complexity we decided to
provide it in its own section.

### `body`

Article body in plaintext.

Example: `"Hi,\n\nplease send me:\n1 [...] \nThank you\n\nJohn Doe"`

### `cc`

The email-addresses set as CC.

Examples: `null`, `alias@domain.tld`

### `content_type`

Content type of article.

Examples: `"text/html"`, `"text/plain"`

### `created_at`

Timestamp of article creation.

Example: `"2025-02-22T03:47:59.290Z"`

### `created_by_id`

ID of user who created the article.

Пример: `10`

### `detected_language`

Language code of detected language.

Examples: `"en"`, `"de"`, `null`

### `detected_language_name`

Language name of detected language.

Examples: `"English"`, `"German"`

### `from`

Name (and email address) of article creator.

Examples: `"Nicole Braun <nicole.braun@zammad.org>"`, `"John Doe"`

### `id`

Internal ID of the article.

Пример: `16`

### `in_reply_to`

"In-Reply-To" header from email, if applicable.

Пример: `null`

### `internal`

Defines if article is internal or not.

Values: `false`, `true`

### `message_id`

Message ID of email, if applicable.

Пример: `null`

### `origin_by_id`

ID of user (or ID of original creator if created on behalf of another user)
who created the article.

Пример: `null`

### `preferences`

Internal preferences, may be empty.

Пример: `{}`

### `reply_to`

Contains the "Reply-To" header, if applicable.

Пример: `null`

### `sender_id`

ID of the user who sent/created the article.

Пример: `2`

### `subject`

Subject of the article.

Example: `"My amazing subject"`

### `ticket_id`

ID of the ticket, the article belongs to.

Пример: `9`

### `to`

Email address of "To" header or group which was set with this article.

Examples: `support@example.com`,`"Support"`, `null`

### `type_id`

ID of type of article (e.g. phone, email, web).

Пример: `1`

### `updated_at`

Timestamp of last update of article.

`"2025-02-22T03:47:59.290Z"`

### `updated_by_id`

ID of the user who updated the article.

Пример: `10`

## Корисник

### `active`

Defines, if a user is active.

Values: `true`, `false`

### `address`

Address of the user.

Examples: `""`, `"Hauptstraße 100, 99999 Berlin"`

### `city`

Name of the city of the user.

Examples: `""`, `"Berlin"`

### `country`

Name of the country of the user.

Examples: `""`, `"Germany"`

### `created_at`

Timestamp of creation of user.

Example: `"2025-02-22T12:47:56.460Z"`

### `created_by_id`

ID of user who created the user.

Пример: `1`

### `department`

Назив одељења.

Examples: `""`, `"IT"`

### `email`

Email address of user.

Examples: `""`, `"nicole.braun@zammad.org"`

### `fax`

Fax number of user.

Examples: `""`, `"+49 123 456 789 01"`

### `firstname`

First name of the user.

Examples: `""`, `"John"`

### `id`

Internal ID of the user.

Пример: `8`

### `last_login`

Timestamp of the last login of the user.

Examples: `null`, `"2025-02-23T12:47:56.460Z"`

### `lastname`

Last name of the user.

Examples: `""`, `"Doe"`

### `login`

Login name of the user, always set and unique, can differ from email.

Examples: `"auto-1234567"`, `"jdoe"`

### `mobile`

Mobile phone number of user.

Examples: `""`, `"+49 123 456 789"`

### `note`

Note of user object.

Examples: `""`, `"Some text."`

### `organization`

Details of the organization, the user is member of. Have a look at the
[organization section](#organization-2) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID of the organization, the user is member of.

Пример: `3`

### `out_of_office`

Defines, if the user has activated the out of office function.

Values: `false`, `true`

### `out_of_office_end_at`

End date out of office period.

Examples: `null`, `"2025-02-26"`

### `out_of_office_replacement_id`

ID of the user who replaces this user during the out of office period.

Examples: `null`, `3`

### `out_of_office_start_at`

Begin date of out of office period.

Examples: `null`, `"2025-02-24"`

### `permissions`

Set permissions of the user as array.

::: details

<<< @/fixtures/es-indexed-attributes/permissions.json

:::

### `phone`

Phone number of the user.

Examples: `""`, `"+49 1234 567 890"`

### `preferences`

Details of the preferences of the user, may contain `notification_config`,
`locale` and other internal system information.

::: details

<<< @/fixtures/es-indexed-attributes/preferences.json

:::

### `role_ids`

Array with role IDs which are assigned to the user.

Пример: `[1, 2]`

### `street`

Name of the street of the user.

Examples: `""`, `"Hauptstraße 100"`

### `updated_at`

Timestamp of last update of the user.

Example: `"2025-02-25T00:27:52.308Z"`

### `updated_by_id`

ID of user who updated this user.

Пример: `3`

### `verified`

Defines if the user has verified the account or not.

Values: `false`, `true`

### `vip`

Defines if the user has VIP state or not.

Values: `false`, `true`

### `web`

Web URL of the user.

Examples: `""`, `"https://zammad.org"`

### `zip`

ZIP code of the user.

Examples: `""`, `"123456"`

## Организација

The following index contains below mentioned information: `*_organization`

### `active`

Defines, if the organization is active or not.

Values: `true`, `false`

### `created_at`

Timestamp of creation date of organization.

Example: `"2025-02-22T12:47:54.807Z"`

### `created_by`

Details of the user who created the organization. Have a look at the [user
section](#user) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID of the user who created the organization.

Пример: `1`

### `domain`

Домен организације.

Examples: `"null"`, `"example.com"`

### `domain_assignment`

Defines if domain assignment is active or not, depends on `domain`.

Values: `false`, `true`

### `id`

Internal ID of the organization.

Пример: `1`

### `members`

Array with details of each user who is a member of the organization. Have a
look at the [user section](#user) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/members.json

:::

### `name`

Name of the organization.

Example: `"Fast Lane Hardware Inc."`

### `note`

Note of organization object.

Example: `"IT hardware and custom PC builds."`

### `shared`

Defines if it is a "shared organization" or not.

Values: `false`, `true`

### `updated_at`

Timestamp of last update of the organization.

Example: `"2025-02-22T12:47:54.807Z"`

### `updated_by`

Details of the user who updated the organization. Have a look at the [user
section](#user) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID of user who updated the organization.

Пример: `1`

### `vip`

Defines if the organization has VIP status or not.

Values: `false`, `true`

## Група

The following index contains below mentioned information: `*_group`

### `active`

Defines, if the group is active or not.

Values: `false`, `true`

### `assignment_timeout`

Time in minutes, an agent can be inactive until the ownership is removed.

Examples: `null`, `30`

### `created_at`

Timestamp of creation of group.

Example: `"2025-02-24T23:55:06.980Z"`

### `created_by_id`

ID of the user who created the group.

Пример: `1`

### `email_address`

Details about the email address of the group.

::: details

<<< @/fixtures/es-indexed-attributes/email_address.json

:::

### `email_address_id`

ID of the email address of the group.

Пример: `3`

### `follow_up_assignment`

Defines, if ticket owners are still assigned after a follow up.

Values: `false`, `true`

### `follow_up_possible`

Defines if a follow up on a closed ticket is possible or not.

Values: `"yes"`, `"no"`

### `id`

Internal ID of the group.

Пример: `1`

### `name`

Назив групе.

Examples: `"Support"`, `"IT"`

### `note`

Note for the group object.

Пример: `null`

### `signature`

Details of the signature of the group.

::: details

<<< @/fixtures/es-indexed-attributes/signature.json

:::

### `signature_id`

Internal ID of the signature.

Пример: `1`

### `updated_at`

Timestamp of the last group update.

Example: `"2025-02-24T23:55:06.980Z"`

### `updated_by_id`

ID of the user who updated the group.

Пример: `3`

## CTI Log

The following index contains below mentioned information: `*_cti_log`

### `call_id`

Unique ID of the call.

Пример: `6`

### `comment`

Optional comment.

Пример: `""`

### `created_at`

Creation date of call.

Example: `"2025-02-22T11:48:01.703Z"`

### `direction`

Call direction.

Values: `in`, `out`

### `done`

Defines if call displays as "to do" within UI.

Values: `true`, `false`

### `duration_talking_time`

Call duration time in seconds.

Пример: `27`

### `duration_waiting_time`

Waiting time in seconds until call got answered.

Пример: `77`

### `end_at`

Timestamp of call end.

Example: `"2025-02-25T08:49:40.647Z"`

### `from`

Calling number.

Example: `491711234567890`

### `from_comment`

Name of calling number, if applicable.

Examples: `null`, `"John"`, `"Doe"`

### `from_pretty`

Pretty version of `from` with spacing and added `+`.

Example: `+49 171 1234567890`

### `id`

Internal ID of log entry.

Пример: `8`

### `initialized_at`

Timestamp of call initialization, usually matches `created_at`.

Example: `"2025-02-25T08:47:56.753Z"`

### `preferences`

Детаљи личних подешавања, интерне информације.

::: details

<<< @/fixtures/es-indexed-attributes/call-log-preferences.json

:::

### `queue`

Queue, the call was answered in.

Examples: `null`, `491711234567890`

### `start_at`

Timestamp the call was answered.

Example: `"2025-02-25T08:49:13.050Z"`

### `state`

Last state of the call.

Examples: `hangup`, `voicemail`

### `to`

Dialed number.

Example: `491711234567890`

### `to_comment`

Display name of called number, if applicable.

`"null"`, `"John"`, `"Doe"`

### `to_pretty`

Pretty version of `to`.

Example: `+49 171 1234567890`

### `updated_at`

Last update of entry.

Example: `"2025-02-25T08:49:40.647Z"`

## Chat Session

The following index contains below mentioned information: `*_chat_session`

### `chat`

Details of the chat topic.

::: details

<<< @/fixtures/es-indexed-attributes/chat.json

:::

### `chat_id`

ID of the chat topic.

Пример: `1`

### `created_at`

Timestamp of chat creation

`"2025-02-25T10:26:24.376Z"`

### `created_by_id` <Badge type="warning" text="deprecated"/>

ID of user who created the chat.

Value: `null`

### `id`

ID сесије ћаскања.

Пример: `1`

### `messages`

Array with all messages of the chat.

::: details

<<< @/fixtures/es-indexed-attributes/messages.json

:::

### `name`

The name for the chat user which was set by the agent, if applicable.

Examples: `null`, `"John Doe"`

### `preferences`

Various internal Meta data of the session_id

::: details

<<< @/fixtures/es-indexed-attributes/chat-session-preferences.json

:::

### `session_id`

Unique ID of chat session.

Example: `92f2909631f1ad5ff4d5d1e046952be8`

### `state`

Current state of chat session.

Пример: `closed`

### `tags`

Tags which got applied to the chat session by the agent, if applicable.

Example: `["order", "refund"]`

### `updated_at`

Timestamp of last update of the chat.

Example: `"2025-02-25T10:27:03.341Z"`

### `updated_by_id`

ID of the user who updated the chat session the last time.

Examples: `null`, `3`

### `user`

Details of chat agent. See [user section](#user) for more information.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `user_id`

ID of the agent of the chat.

Пример: `3`
