---
title: Glossary
order: 1
---

# Glossary

Ever wondered what we mean by a specific term?
We've been collecting the most relevant terms below for your insight.

<VPGlossary>

Admin
: An admin(istrator) is a user in Zammad who has special rights and manages your
  Zammad. An admin can, for example, configure user permissions, time recording
  settings, automation and text modules.
  If you're looking for someone to adjust anything in your Zammad, your admin
  is the right person to ask for.

Agent
: An agent is a user in Zammad who works on tickets and responds to customer
  inquiries. Agents can be admins too, meaning that they can change settings,
  user permissions and so on (see above).

API
: An API (Application Programming Interface) is a set of rules and protocols
  that allow different software applications to communicate with each other.
  It allows you to connect third-party systems with your Zammad (e.g. social
  media, messengers, monitoring tools).

  You can learn more on our
  [API landing page](https://zammad.com/en/product/features/rest-api){target=_blank}
  as well as in our [API reference](/en/reference/rest-api/intro).

Article
: Each item within a ticket is called article. Ticket articles
  can be internal (only agents can see them) or public
  (customers can see them too; e.g. public notes or outgoing emails) and include
  formatted text as well as attachments and inline images.

Automation
: There are many processes that can be automated with Zammad.
  This means that certain actions take place automatically.
  An automation can be time-based or action-based and should cover every
  conceivable automation scenario.
  An example could be the recurring deletion of customers who are no longer
  needed or the assignment of groups based on ticket attributes.

Autosave
: Zammad's autosave feature makes sure that no work is lost. So if your browser
  crashes, simply log in again and resume where you were before.
  Learn more on our
  [Autosave landing page](https://zammad.com/en/product/features/autosave){target=_blank}.

Branding
: Every company has a different identity. This is why Zammad lets you add your
  logo, signature, links and other things!

Changelog
: With every new release comes a new changelog. It is basically a list of all
  the things that have changed, from new enhancements to bug fixes.

  You can find them all on our
  [GitHub](https://github.com/zammad/zammad/blob/stable/CHANGELOG.md){target=_blank}!

Checkmk
: Checkmk is a powerful IT monitoring tool that can send real-time status
  alerts to Zammad via email or REST API. Set these alerts up in Checkmk,
  and Zammad will automatically create, update and close tickets based on
  the health of your system.

Clearbit
: Clearbit is a service designed to collect information on your
  contacts. Thus, new queries from unknown users in Zammad can be automatically
  enriched with information such as company, number of employees,
  annual turnover, industry and much more.

Conflict Warning
: When two agents edit the same ticket at the same time, a lot can go wrong -
  from duplicate replies to overwritten messages. Zammad helps you to avoid
  this with its integrated conflict warning. So if you see another agent's
  avatar and a little pen at the bottom of your ticket, it means the other agent
  is currently editing it.

Content Sidebar
: Right sidebar in the ticket view which includes the sidebar tabs and the
  active sidebar (if opened).

Core Workflows
: This feature allows you to configure dynamic fields and ticket masks based on
  attribute available in Zammad. For example you can disable or hide fields,
  make them visible based on other fields or attributes, make them mandatory and
  much more!

CTI
: CTI stands for Computer Telephony Integration and allows you to collect
  detailed information on all your incoming and outgoing calls.
  This includes, for example, a call log, an overview of which agent is
  currently on a call, a caller ID search, and even a Do-Not-Disturb-Mode.

Custom Development (CD)
: We are constantly working on improving Zammad, and we keep adding new
  features with every single release. However, sometimes our customers might
  require a very specific new feature, addition, or adjustment that is either
  very urgent or very particular to their individual use case.
  This is when a custom development can take place: We offer the customer to
  develop the desired feature at a price that we agree upon previously
  (which is based on the expected hours needed for completion).

Customer
: A customer is a person you communicate with via Zammad.
  For each customer there is a profile page showing all the tickets and more
  information. Customers can be assigned to one or more organizations.
  Each customer can access their individual
  Customer Interface, where they see all their tickets with the current
  status and live updates.

Dashboard
: The dashboard is the individual welcome page in Zammad and gives
  you feedback about your work.
  Here you can find all sorts of overviews, such as the open tickets,
  the average waiting time, or the reopening rate. You can also see what your
  colleagues are doing by checking the Activity Stream.

Dialog
: A dialog is a element which pops up in the middle of the screen because of its
  importance. An example could be the dialog which asks you to save or discard
  your unsaved changes.

Documentation
: You will probably have noticed already: you are reading a part of Zammad's
  documentation. 😉

Elasticsearch
: Zammad offers an Elasticsearch integration (a free and open search engine)
  that makes the search process within Zammad super fast and powerful. You
  can even connect a reporting tool like Grafana to your Elasticsearch to
  create powerful reports and statistics.

Escalation
: An escalation is what happens after the deadline for a ticket has passed. You
  can configure it with Zammad's SLAs. An escalated ticket is marked red in your
  taskbar and the overviews.

Exchange Integration
: The Exchange integration allows you to sync your contacts from your
  Exchange address book to Zammad. Every time a contact is updated
  in Exchange, it will be reflected in Zammad. This gives you direct
  access to all your contacts in your Zammad.

External Authentication
: External authentication is an easy, one-click option for your users to log
  into Zammad. It has various benefits: not only is it faster but it also
  means that your users will have to remember fewer passwords.
  Zammad currently supports more than ten login providers, such as Facebook,
  GitHub, GitLab, Google, or Microsoft / Office365.

Feature
: A feature is a specific capability or functionality that Zammad provides to
  you such as our integrations, productivity tools or additional channels.
  We keep adding new features with every release.

Feature Request
: You can let us know if you are missing a particular feature in Zammad.
  We collect all of your wishes in our community forum in the
  [feature request category](https://community.zammad.org/c/stuff-you-like-zammad-to-have-feel-free-to-discuss-and-add-proposals/6/all){target=_blank}.
  If a request comes in regularly and we think that it would be a
  great addition, we'll put it on our roadmap and start working on it.

Feature Sponsoring
: If an organization urgently requires one of the features on the list,
  they can fast-forward the development and put it on top of the list by
  sponsoring it, which means that they cover the costs for the development.

GitHub
: GitHub is a service for the version management of software development
  projects. It uses Git, a software that tracks changes in file sets.
  Here at Zammad, we use it to maintain our repository.

  As Zammad is an open-source project, many developers and tech-lovers from all
  over the world contribute to it. GitHub is where we coordinate all of this.
  You can find the repository [here](https://github.com/zammad/zammad){target=_blank}.

  Besides our own repo, Zammad also has an integration for GitHub.
  It creates a data exchange that shows you all relevant information about your
  issues directly in a sidebar tab, such as status or assignees.

GitLab
: GitLab is similar to GitHub.
  Here at Zammad, we use it for our internal development.

  There is also an integration that allows users to connect GitLab to Zammad
  so that all their issues and their corresponding changes are reflected in
  Zammad's sidebar tab as well.

Grafana
: Grafana is an open-source reporting tool.
  Zammad users on the Plus plan can integrate it into their instance and
  receive detailed analytics on their performance.

  Hooking up Grafana to Elasticsearch is an possibility you can do on your
  on-premise installation as well.

Groups
: Groups are a synonym for departments or processing groups.
  Incoming tickets can be assigned to groups.
  Within the group, an owner can be defined, who is then responsible for
  this ticket. The access to tickets is controlled via the roles. In a role you
  can define which permission it has based on the different groups.
  The possible permissions are "read", "create", "change", "overview" and
  "full" (or none of them).

  If you have worked with the OTRS system in the past, you might remember the
  principle of "queues". The groups in Zammad are the same as the queues in
  OTRS.

Icinga
: Icinga is a monitoring system that monitors the availability of an
  organization's entire system infrastructure.
  It can be integrated into Zammad so that it triggers a ticket in case
  of a warning situation.

i-doit
: i-doit is a CMDB (Configuration Management Data Base).
  It helps you to keep an eye on every piece of the physical and digital
  infrastructure. A corresponding integration makes it possible to connect
  it to Zammad, where it adds a new tab to Zammad's ticket sidebar so
  you can link to existing i-doit objects for easy reference.
  It also allows you to create Zammad tickets in i-doit.

Issue-Tracking System
: Issue trackers are usually systems that track processes on a technical level.
  Two of the best-known examples are GitHub and GitLab.

  Zammad is also often referred to as an issue-tracking system.
  However, as a helpdesk, it focuses on communication at the customer
  level rather than the technical level.

Kibana <Badge type="info" text="on-premise only" />
: Kibana is a browser-based open-source reporting tool that focuses on data
  evaluation. It was developed by Elastic, which is why it is not a surprise
  that it uses data from Elasticsearch for its analytics.

  Kibana can be integrated with Zammad, allowing for helpdesk data to be
  mapped in the reporting tool.

Knowledge Base
: Think of a very extensive set of FAQs - that's exactly what the
  Zammad knowledge base is. It collects all important information:
  definitions, processes, how-tos, organizational charts, etc.

  Knowledge base articles can be either internal or external, so you can
  either show them to the world (good for information on your product or
  service, for example) or keep them for your team (e.g. for internal processes
  or team info).

LDAP
: A Lightweight Directory Access Protocol (LDAP) helps provide information
  about your users within Zammad. Authentication of users against the LDAP
  and LDAP role mapping to Zammad roles are also possible.

Macro
: A macro is a series of actions. By starting the macro, the actions are
  triggered and executed, so users don't have to work through each
  individual step separately. It saves an enormous amount of time and ensures
  that no step is forgotten.

  You can define your own macros and perform actions based on all available
  attributes in the ticket.

Mentions
: Mentions are a Zammad feature that allows you to tag another agent in a
  ticket. Just type `@@` and the name. The selected person will be notified
  and will be watching the ticket from now on.

Migrator / Migration Wizard
: If a company wants to switch from another helpdesk software to Zammad,
  they often have one concern: What about their existing data?
  That's why we have built our migration wizards that help with migrating all
  data.

Monit
: Monit is an open-source monitoring tool that relies on a simple setup and
  a strong community. You can integrate it with Zammad - this way,
  a ticket is created every time you receive an email in Monit.

Navigation
: Navigation means the left sidebar in Zammad which contains navigation tabs,
  the search, notifications and many more items, depending on your system.

Navigation Tab
: One element of the navigation. You can have multiple tabs open and quickly
  switch between them.

Nagios
: Nagios is another monitoring tool that alerts IT teams when an incident
  happens. It can be integrated with Zammad so that a ticket is created in
  case of an alert.

On-Premise
: This term means that Zammad is not provided as a cloud service of the
  company Zammad, but runs on a server which is controlled by a user or
  customer of Zammad. Self hosting means the same.

Organization
: An organization is a grouping of customers that operate within the same
  company or company group.
  A customer, whose organization is "sharing", has access to all tickets of its
  organization.

Owner
: The owner of a ticket is the person responsible for and working on it.
  The owner can be changed to another agent.
  In this case, it is recommended to leave a handover note in the ticket so
  that the new owner knows what to do.

Parent/Child Relationship
: If one ticket results in other subtasks (or additional correspondences),
  you can split it into several tickets. The main one will then be the parent
  ticket and the tickets with related subtopics are children.
  By the way: in the same way, you can also merge two tickets into one.

Placetel
: Placetel is a Cloud Telephone System that allows users to make phone calls
  via VoIP. Use your regular phone number and call someone directly on their
  mobile or landline while still having all communication in one place
  in Zammad.

  Integrating a Placetel account with Zammad provides users with a call log,
  making the history of their correspondences even more accurate.
  Callers are identified directly by their caller ID - a key function that
  saves agents a lot of time when assigning callers.

Priority
: Every ticket gets assigned a priority. By default, the priority is 2 (normal).
  Additionally there are the priorities 1 (low) and 3 (high). You can even
  add more priorities to your Zammad.

Release
: Every few months, we release a new version of Zammad which is called a
  release. Every release adds new features to our software. There are major and
  minor releases:
  major releases (such as Zammad 1.0, 2.0, etc.) bring major changes.
  Minor releases (such as 1.1, 2.1, etc.) are released in the meantime and bring
  smaller updates.

  In our [release notes](https://zammad.com/en/releases){target=_blank} you can
  find what features are included in new versions and also important information
  about what to consider before updating Zammad.

Role
: Every user has an assigned role. By default there are three roles:
  admin, agent, and customer.

  _Admins_ have the most rights: they can define roles, permissions,
  and settings for the entire team and instance.
  _Agents_ can view and edit tickets, but not change any settings other than
  those of their own profiles.
  _Customers_ can view their ticket's processing status in their
  customer interface.

  You can even add new roles to your Zammad.

Second Level Navigation
: Refers to an additional menu next to the navigation (e.g. when opening profile
  settings).

Side(Panel)
: This is the panel which is flying in on the right side for actions like ticket
  linking or ticket merging.

Sidebar Tab
: In the content sidebar, there are different tabs like "Customer",
  "Organization" and "Ticket", depending on your system and ticket. These are
  called sidebar tabs.

  An active sidebar tab is the currently opened sidebar tab.

Sipgate
: Sipgate is a SaaS solution for internet telephony.
  The Zammad integration for Sipgate provides users with a detailed call
  overview. If you have a customer that wants to get connected to a certain
  agent, the caller log will tell you if this colleague is currently available.

SLA
: A Service Level Agreement (SLA) is a contract between an end-user and a
  company that defines the minimum expected service requirements including
  quality, availability, and punctuality.
  They are used to set expectations and hold companies accountable for keeping
  their promises.

  You can easily set up SLAs in Zammad and define parameters such as the time
  for the first response, an update, and a solution. Once the deadline has been
  reached, the ticket will escalate.

S/MIME
: S/MIME is the most widely-supported method for secure email communication.
  By activating it in Zammad, all messages sent from Zammad will be signed and
  encrypted.

SSO
: Single-sign-on (SSO) allows you to access all your systems and devices with
  just one login. There are various providers that make this process easy and
  secure. Zammad currently supports SSO via SAML and Shibboleth.

State
: Every ticket has a state which reflects the current progress of resolving the
  issue. The state of a ticket can be changed manually or automatically based
  on automation or SLA. Each state has a state types. There are four state types
  by default and they are color-coded. You can even add additional states to
  your Zammad.

Tags
: Tags help you to categorize tickets. You can define them based on your use
  case. For example, if you're a retail business, your tags could be based on
  your product categories to help you organize tickets by the type of product
  they refer to.
  But they could also be based on the type of request, e.g. refund, delivery
  issue, complaint.

  Tags can be queried in conditions in an automation and also assigned
  automatically, for example depending on keywords in the ticket title.

Text Module
: If you find that you send the same answers over and over again,
  you can save yourself a lot of work and create a text module.
  This way, you just need to type the `::` shortcut in an article and all
  available text modules are shown from which you can select the desired one.
  You can limit the search results by adding parts of the text module's name,
  keywords or content after the `::`.

  For example, here at Zammad, we have a text module with the shortcut
  `::ilff`, which turns into `I look forward to your feedback`.

(Ticket) Template
: If you create many similar tickets, you can create a template for them. This
  is helpful for introductions to your product/service or for drawing up an
  offer.

User
: A user is any user of the ticket system. Each user has assigned
  permissions, which allow them to access certain areas and information.
  Users can have various roles, with the standard options being agent, admin,
  and customer.

Webhooks
: Webhooks are an easy way for systems to communicate with each
  other and allow you to send real-time data to any other application.
  We use them to allow our users to inform a third-party system about new
  information in Zammad.

Zammad
: Zammad is the greatest helpdesk in the world. Period.

</VPGlossary>
