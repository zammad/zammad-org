---
title: Rails Commands
order: 2
---

# Rails Commands

Zammad uses Ruby on Rails so you can make use of the [Rails
console](http://guides.rubyonrails.org/command_line.html){target=_blank}.

:::warning
Please double check your commands before running, as some of those
commands might cause data loss or damaged tickets! If you're unsure,
**use a test system first**!
:::

## Starting Zammad's Rails Console

### Execute a Single Command

:::info
Replace `{COMMAND}` with your command you want to run.
:::

:::tip
If you enter a `p` in front of your command (e.g. like
`rails r 'p Delayed::Job.count'`), you'll actually receive a printed
output (without you won't!).
:::

:::tabs key:installmethod

=== Docker Installation

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '{COMMAND}'
```

=== Package Installation

```sh
zammad run rails r '{COMMAND}'

```

=== Source / Development Installation

```sh
rails r '{COMMAND}'
```

:::

### Run Interactive Rails Console

:::tabs key:installmethod

=== Docker Installation

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

=== Package Installation

```sh
zammad run rails c

```

=== Source / Development Installation

```sh
rails c
```

:::

### Rails Console Safe Mode

Normally, starting Rails console requires certain third party services
to be up and running. You may receive errors and console will refuse to start
in case they are not available.

However, it's possible to start Rails console in safe mode by setting
a special environment variable. With `ZAMMAD_SAFE_MODE=1`
set, these checks be ignored.

```sh
ZAMMAD_SAFE_MODE=1 zammad run rails c
```

## Ticket Commands

### Get the RAW Email

The following command will help you to check on received EML-files
Zammad fetched. This comes in handy if you delete Mails upon fetching
and you need to check the EML-file itself.

To get the first articles EML-file, you can use the following command.
In our example the ticket number in question is `101234`.

```ruby
Ticket.find_by(number:'101234').articles.first.as_raw.content
```

If needed, you can also get the raw content of later articles (you'll
need to find the correct article though). Again, we expect `101234` to
be our ticket number.

In the first step we get all article IDs of the
ticket:

```ruby
Ticket.find_by(number:'101234').article_ids
```

Output:

```ansi
[4, 3, 2]
```

From the list we get, we can then get the articles content:

```ruby
Ticket::Article.find(3).as_raw.content
```

:::info
If you just use `Ticket::Article.find(3)` you can see further
information (like who sent the mail, when we fetched it, ...).
:::

### Update All Tickets of a Specific Customer

:::warning
Please note that this action can be expensive resource wise, if you
have many tickets, this might slow down Zammad.
:::

```ruby
Ticket.where(customer_id: 4).update_all(customer_id: 1)
```

### Get Ticket State Types

This will show all state types needed for creating new ticket states:

```ruby
Ticket::StateType.pluck(:id, :name)
```

Above will return both, the type ID and name - e.g.:

```ansi
`[[1, "new"], [2, "open"], ...`.
```

## User Commands

### Find User

In order to work on user information or to check for specific
information, you'll need to find it first.

User ID already known:

```ruby
User.find(4)
```

Searching for the user by his email address:

```ruby
User.find_by(email: 'your@email')
```

Searching for the user by his login:

```ruby
User.find_by(login: 'john.doe')
```

### Unlock a Locked User Account

:::tip
Unlocking a locked user account is also supported by Zammad's web UI!
:::

It sometimes happens that a user locks himself out by wildly trying the
wrong password multiple times. Depending on your maximum failing login
count (<span class="title-ref">default: 10 times</span>), Zammad might
lock the account.

The user can't login any more (forever) if he doesn't change the
password or you reset the counter.

```ruby
u=User.find(**USERID**)
```

```ruby
u.login_failed=0
```

```ruby
u.save!
```

You can also double check if the account is locked by running the
following command (result needs to be 1 above your limit, so
11 for the default of 10 failing logins):

```ruby
User.find(**USERID**).login_failed
```

### Change / Update Email Address of User

If needed, you can simply change the email address of the user.

:::info
Please note that the login attribute is not affected by this and
Zammad thus might show different information within the UI.
:::

```ruby
u = User.find(**USERID**)
```

```ruby
u.email = 'user@exmaple.com'
```

```ruby
u.save!
```

You need to find the user ID of the user first for this.

### Change / Update Login Name of User

Change the user name of the user (e.g. if you want to login with a
shorter username instead of a mail address)

```ruby
u = User.find(**USERID**)
```

```ruby
u.login = 'user@exmaple.com'
```

```ruby
u.save!
```

You need to find the user ID of the user first for this.

### Set Admin Rights for User

Don't have access to Zammad anymore? Grant yourself or another user
administrative rights.

```ruby
u = User.find_by(email: 'you@example.com')
```

```ruby
u.roles = Role.where(name: ['Agent', 'Admin'])
```

```ruby
u.save!
```

### Set Password for User

You or the user did forget his password? No problem! Simply reset it by
hand if needed.

```ruby
User.find_by(email: 'you@example.com').update!(password: 'your_new_password')
```

### Remove Password for User

If you added a second authentication method (e.g. LDAP) after launch,
there still may be a password in Zammad's own user management. In cases
like that users will be able to login with their (local) Zammad password
in addition to the credentials stored on the external authentication
provider. Simply remove the password stored by Zammad.

```ruby
User.find_by(email: 'you@example.com').update!(password: nil)
```

## Group Commands

### Find a Group

```ruby
Group.find_by(name: 'Users').follow_up_possible
```

## Chat Commands

### Remove IP Address Logs

Use the following command to remove all IP address records
from closed chats that haven't been updated in the last seven days:

```ruby
Chat::Session.where(state: 'closed').where('updated_at < ?', 7.days.ago).each do |session|
next if session.preferences['remote_ip'].blank?
```

```ruby
session.preferences.delete('geo_ip')
```

```ruby
session.preferences.delete('remote_ip')
```

```ruby
session.save!(touch: false)
end
```

## Zammad Settings

In this section, you can find some settings which you can set in the Zammad UI
as well.

### Auto Shutdown Setting

Defines if an automatic shutdown of Zammad is performed when the the database
has been changed (e.g. after custom attributes have been created in the
object manager).
The underlying system (Systemd, Docker, Kubernetes) will then restart the
processes/containers after this shutdown. The default setting is `true`.

Setting this to `false` might only make sense in very rare cases and you
have to restart the Zammad services then manually.

```ruby
Setting.set('auto_shutdown', 'true')
```

### Ticket_hook Setting

This will give you the ticket hook that you'll find inside the `[]` in
front of the ticket number. By default this will be
`Ticket#` - you shouldn't change this setting in a productive system.

```ruby
Setting.get('ticket_hook')
```

### FQDN Setting

Get the current FQDN setting of Zammad and, if needed, adjust it.

:::info
This setting has no effect on SSL certificates or any web server
configurations.
:::

Get current FQDN:

```ruby
Setting.get('fqdn')
```

Set a new FQDN:

```ruby
Setting.set('fqdn', 'new.domain.tld')
```

### HTTP(s) Setting

This setting indirectly belongs to your FQDN setting and is relevant for
variable based URLs (e.g. in notifications) Zammad generated.

:::warning
This setting also affects Zammad's CSRF token behavior. If you set
this to e.g. HTTPs but you're using HTTP, logging in will
fail!

It has no effect on SSL certificates or any web server configuration.
:::

Get the current http type:

```ruby
Setting.get('http_type')
```

Change the http type to HTTPs:

```ruby
Setting.set('http_type', 'https')
```

### Storage Provider Setting

The storage provider setting is set to `DB` on default installations.
However, if you receive a lot of attachments or have a fairly busy
installation, using the database to store attachments is not the best
approach.

Get the current attachment storage:

```ruby
Setting.get('storage_provider')
```

Change attachment storage to database

```ruby
Setting.set('storage_provider', 'DB')
```

If you have already stored files and want to move them, you can use the
following example. Please be aware that this operation should only be
executed in non-productive environments. In case you have to perform it
in production environments, you should specify a sleep delay - otherwise
your Zammad can be unresponsive.

Move files from DB to File with a specified delay after each file in seconds:

```ruby
Store::File.move('DB', 'File', delay_in_sec)
```

The following settings are available in a default installation:

- `DB` (database)
- `File` (Filesystem (`/opt/zammad/storage/`))

### Configuring Elasticsearch

If your Elasticsearch installation changes, you can use the following
commands to ensure that Zammad still can access Elasticsearch.

Change Elasticsearch URL:

```ruby
Setting.set('es_url', 'http://127.0.0.1:9200')
```

Change Elasticsearch user (e.g. for authentication):

```ruby
Setting.set('es_user', 'elasticsearch')
```

Change the Elasticsearch password for authentication:

```ruby
Setting.set('es_password', 'zammad')
```

Change the index name:

```ruby
Setting.set('es_index', Socket.gethostname + '_zammad')
```

Ignore files by file extension from being indexed:

```ruby
Setting.set('es_attachment_ignore', %w[.png .jpg .jpeg .mpeg .mpg .mov .bin .exe .box .mbox])
```

Limit the attachment size:

```ruby
Setting.set('es_attachment_max_size_in_mb', 50)
```

Turn SSL verification on or off:

```ruby
Setting.set('es_ssl_verify', 'false')
```

### Enable Proxy

Set a proxy to use by Zammad:

```ruby
Setting.set('proxy', 'proxy.example.com:3128')
```

```ruby
Setting.set('proxy_username', 'some user')
```

```ruby
Setting.set('proxy_password', 'some pass')
```

### Disable Asciifold

This feature is turned on by default. In case you need a more exact search, you can turn it off:

```ruby
Setting.set('es_asciifolding', false)
```

After changing the setting, make sure to [rebuild the search index](/en/tutorials/connect-config-elasticsearch#build-rebuild-the-searchindex).

## Hidden Settings

In this section you can find some settings that you won't find within the
Zammad UI. Those settings might come in handy as it can change Zammad's
behavior.

### Send All Outgoing EMails to a BCC-Mailbox

This option allows you to send all outgoing emails (not notifications)
to a specific mailbox. Please note that this shouldn't be a mailbox
you're importing already! This will apply to all groups and is a global
setting.

```ruby
Setting.set('system_bcc', 'alias@domain.tld')
```

You can easily check the current BCC-Setting by running the following:

```ruby
Setting.get('system_bcc')
```

### Activate Counter on Grouped Overviews

This enables a ticket number value in each heading for grouped elements.

Enable counter for grouped overviews:

```ruby
Setting.set('ui_table_group_by_show_count', true)
```

Disable counter for grouped overviews:

```ruby
Setting.set('ui_table_group_by_show_count', false)
```

Get current setting (`nil` is false):

```ruby
Setting.get('ui_table_group_by_show_count')
```

### Default Ticket Type on Creation

Zammad allows you to define the default article type upon ticket
creation. By default this will be a incoming phone call.

You can choose between

- `phone-in` (incoming call, **default**),
- `phone-out` (outgoing call) and
- `email-out` (Sending an email out).

```ruby
Setting.set('ui_ticket_create_default_type', 'email-out')
```

To check what setting is set currently, simply run:

```ruby
Setting.get('ui_ticket_create_default_type')
```

### Show a Note During Article Creation

If you need to show your agents a note with important information during the article creation, you can create
such a static note for different article types. Be aware that there are two settings: one for ticket creation and the
other for article creation in an existing ticket. Adjust the commands below to use it for the desired article types and
replace the text with yours. In case you don't want a note for all article types, simply omit these types.

![Screenshot shows a note during article creation](/screenshots/cypress/reference/rails-commands.cy.js/article-creation-note.png)

#### Ticket Creation

```ruby
Setting.set('ui_ticket_create_notes', {
      :"phone-in"  => "You're about to note a incoming phone call.",
      :"phone-out" => "You're about to note an outgoing phone call.",
      :"email-out" => "You're going to send out an email."
   })
```

#### New Article in Existing Tickets

```ruby
Setting.set('ui_ticket_add_article_hint', {
      :"note-internal"  => "You are writing an |internal note|, only people of your organization will see it.",
      :"note-public"    => "You are writing a |public note|.",
      :"phone-internal" => "You are writing an |internal phone note|, only people of your organization will see it.",
      :"phone-public"   => "You are writing a |public phone note|.",
      :"email-internal" => "You are writing an |internal email|, only people of your organization will see it.",
      :"email-public"   => "You are writing a |public email|."
   })
```

#### Check Current Configuration

```ruby
Setting.get('ui_ticket_create_notes')
```

```ruby
Setting.get('ui_ticket_add_article_hint')
```

#### Markup Options

To apply text formatting, use the following markup:

- ``||italic||``
- ``|bold|``
- ``_underline_``
- ``//strikethrough//``
- ``§key§`` (renders a keyboard key like [[key]])
- ``¶`` (newline)
- ``[link text](/example.com)``

### Show Email Address of Customer on Customer Selection (Ticket Creation)

By default, Zammad will not display the email addresses of customers.
The below option allows you to change this behavior.

```ruby
Setting.set('ui_user_organization_selector_with_email', true)
```

Get the current state of this setting with:

```ruby
Setting.get('ui_user_organization_selector_with_email')
```

### Change Font Settings for Outgoing HTML Emails

:::info
Some clients (like Outlook) might fallback to other settings while it
might work for other clients.
:::

The below setting allows you to adjust Zammad's email font setting. This
setting does not require a service restart.

```ruby
Setting.set("html_email_css_font", "font-family:'Helvetica Neue', Helvetica, Arial, Geneva, sans-serif; font-size: 12px;")
```

Get the current state of this setting with:

```ruby
Setting.get('html_email_css_font')
```

### Highlight Customer's Open Ticket Count

This option enhances the selected customer's open tickets count. It
highlights the count in different colors if they hit a threshold.

```ruby
Setting.set('ui_sidebar_open_ticket_indicator_colored', true)
```

Above settings has specific thresholds as follows. You **cannot** adjust
these thresholds.

| Situation / View      | no indication | warning (orange) | danger (red) |
|-----------------------|---------------|------------------|--------------|
| **Ticket Zoom**       | \< 2          | 2                | \>= 3        |
| **New Ticket dialog** | 0             | 1                | \>= 2        |

### Activate Attachment Tab in Sidebar

This option activates a new tab in the right sidebar in the ticket view
which shows all attachments of the currently viewed ticket.

```ruby
Setting.set('ui_ticket_zoom_sidebar_article_attachments', 'true')
```

### Time Period for Showing Customer Profile on New Calls

Zammad shows the customer profile dialog when a call of this customer is
incoming and there is an existing ticket of this customer in this time
period. The default time period is 30 days. If there is no ticket in
this period, the customer dialog is not shown automatically.

Set the time period to 90 days:

```ruby
Setting.set('cti_customer_last_activity', '90')
```

### Set Public "Notes" as SLA relevant

Normally, notes aren't SLA relevant. Use the following command to include
publicly-visible notes when tracking SLA compliance (internal notes _will never_
affect SLA calculations). Be aware that this setting will disable the option
to delete public notes.

:::info
By default, customers are not notified when public notes are added to a
ticket. Set up a trigger if you wish to change this behavior.
:::

Enable SLA to count notes as communication:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: true)
```

Enable SLA to ignore notes as communication:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: false)
```

### Activate Priority Icon

To activate additional icons which represent the priority, use the command
below:

```ruby
Setting.set('ui_ticket_priority_icons', true)
```

## Other Useful Commands

### Remove AI Feature

Zammad's AI feature is completely optional and requires a configuration before any AI request is made. However, if you
don't want to see the feature, you can do so by setting the permission to inactive.

Disable any AI provider, in case you already configured it:

```ruby
Setting.set('ai_provider', false)
```

Disable permission to hide the settings from UI:

```ruby
Permission.where("name LIKE 'admin.ai%'").update!(active: false)
```

To re-enable it, set the `active` flag to `true`.

### Fetch Emails

The below command will do a manual fetch of mail channels. This will
also show errors that might appear within that process.

```ruby
Channel.fetch
```

### Reprocess Failed Emails

When Zammad fetches an email it cannot parse (e.g. due to a parser bug or
a malformed message), it will store the email in the database and warn in
the monitoring section about it.

In case of a malformed message (e.g. an invalid email address in one of
the header fields), you may need to manually edit the email before Zammad
can process it. To do so, follow the steps below.

#### Export all Failed Emails to a Local Folder

```sh
rake zammad:email_parser:failed_email:export_all`
```

You can find the location of the exported email in the output of your console.
Every time you perform an export of failed (unprocessable) emails, it creates
one folder containing all failed emails at the time of execution.

#### Edit the Email

The email has been exported in the step above. Now you can have a look
at it and try to repair it. Make sure to leave the file name untouched,
as the import will otherwise fail.

#### Import and Reprocess Locally Modified Email

After editing the email, run:

```sh
rake zammad:email_parser:failed_email:import path/to/your/email.eml
```

This will apply your changes from the file to the database. You can also pass
the entire folder as argument, so all `.eml` files in it will we imported
and reprocessed. If the reprocessing of the email was successful, the
file(s) will be deleted, and the empty folder removed.

:::tip
Make sure to run these commands only from the main Zammad folder
`/opt/zammad`. There may be problems if you try to run it from within
the generated subfolder.
:::

#### Delete Unwanted Emails

In case of unwanted emails such as spam, you can delete them from the
database after exporting them with the following command:

```sh
rake zammad:email_parser:failed_email:delete path/to/your/email.eml
```

If you pass the export folder as argument instead, all contained emails
will be removed from the database, their files deleted and finally the
empty folder removed.

### Show and Retry Failed Data Privacy Jobs

In rare cases, Zammad's data privacy jobs might fail. To show them, you can use
the following rake command:

```sh
rake zammad:data_privacy:failed:show
```

To retry failed data privacy jobs, you can use the following command. However,
without changing the underlying issue that caused the failure, the job will fail
again. So make sure to check the logs for the root cause of the failure and fix
it before retrying the job.

```sh
rake zammad:data_privacy:failed:retry
```

### Fill a Test System With Test Data

:::danger
Don't run this in a productive environment! This can slow down Zammad
and is hard to revert!
:::

The below command will add `50` agents, `1000` customers, `20` groups,
`40` organizations, `5` new overviews and `100` tickets. You can always
use `0` to not create specific items. Zammad will create random data
which make no logical sense.

```ruby
FillDb.load(agents: 50,customers: 1000,groups: 20,organizations: 40,overviews: 5,tickets: 100,)
```

## Deleting Records

:::danger
☠️ The commands listed here cause **irrecoverable data loss**! Only
proceed if you know what you're doing and you
[have a backup](/en/tutorials/backup-restore)!
:::

### Removing Tickets (And Their Articles)

Delete a ticket (specified by database ID):

```ruby
Ticket.find(4).destroy
```

Delete all tickets:

```ruby
Ticket.destroy_all
```

Keep some tickets (specified by database ID); delete the rest:

```ruby
tickets_to_keep = [1, 2, 3]
```

```ruby
Ticket.where.not(id: tickets_to_keep).destroy_all
```

### Removing Users

:::warning
Customers **may not** be deleted while they have tickets remaining in
the system.

As such, the examples below will delete not only the specified
customers, but **all tickets associated with them**, as well. Below
commands delete without any further warnings.
:::

:::tip
If you're not sure what to do and need to learn more about what Zammad
does upon removing users, please consider using Zammad's UI options instead.
You can find the data privacy feature in Zammad's admin interface under
_System > Data Privacy_.
:::

Removing users is possible in 2 ways: A single user and in bulk.

Remove a single user:

```ruby
User.find_by(email: '<email address>').destroy
```

Remove several users:

```ruby
User.where(
      email: ['<email address 1>', '<email address 2>']
   ).destroy_all
```

### Removing Organizations

:::info
Removing an organization does **not** delete associated customers.
:::

#### Step 1: Select organizations

By "active" status:

```ruby
organizations = Organization.where(active: false)
```

By name:

```ruby
organizations = Organization.where(name: 'Acme')
```

By partial match on notes:

```ruby
organizations = Organization.where('note LIKE ?', '%foo%')
```

#### Step 2: Preview affected organizations

```ruby
puts organizations.map { |org| "ORGANIZATION #{org.name}" }.join("\n")
```

#### Step 3: Proceed with Deletion

```ruby
organizations.each do |org|
    puts %{Preparing deletion of organization "#{org.name}"...}
```

```ruby
org.members.each do |member|
    puts "  Removing #{member.fullname} from organization..."
    member.update!(organization_id: nil)
end
```

```ruby
    puts "  Deleting #{org.name}..."
    org.destroy
   end
```

### Removing System Records

Remove all online notifications:

```ruby
OnlineNotification.destroy_all
```

Remove all entries from the Activity Stream (dashboard):

```ruby
ActivityStream.destroy_all
```

Remove entries for all recently viewed objects(tickets, users, organizations):

```ruby
RecentView.destroy_all
```

Remove all history information from tickets, users and organizations
(dangerous!):

```ruby
History.destroy_all
```

### Reset Zammad Installation

::: danger

Below commands are incomplete intentionally, error outputs will hint you
through! The following operations will cause data loss and are for
development / testing only.

Don't forget to stop Zammad before trying to drop the database!
:::

Truncate the database:

```sh
rake zammad:db:truncate
```

Migrate the database:

```sh
rake db:migrate
```

Load the seed data:

```sh
rake db:seed
```

Clear cache and reload the settings:

```sh
rake zammad:db:rebuild
```

::: tip

You can also use the `zammad:db:reset` command to reset your instance. This task
will truncate the database, run the migrations, seed the database, clear the
cache and reload the settings. However, it will not ask for your confirmation
between each step, so you should use it with caution.
:::
