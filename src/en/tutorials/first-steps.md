---
title: First Steps in Zammad
order: 1
---

# First Steps in Zammad

Congratulations, it seems you successfully installed Zammad. To start with your
fresh installed Zammad, head over to the next section. Alternatively, you
have other options:

- [Migrate from another supported ticketing system](/en/tutorials/migrate)
- [Restore Zammad from an existing backup](/en/tutorials/backup-restore)

## Getting Started Wizard

If you visit Zammad's web page the first time, you'll be greeted by its Getting
Started Wizard. It will guide you through the first most important things.

### Step 1: Create Your First Administrator Account

Fill in the required information in the dialog. Your email address and password
are important. These are your credentials to log in.

Zammad applies the following password policy by default:

- 10 characters or more
- At least 2 UPPER and 2 lower characters
- One or more digits

### Step 2: Provide Company Information

You can upload a custom logo of your company here. The instance address is
detected automatically and only requires adjustment in case it is detected
wrong. If you skip it, you can adjust these things later too.

### Step 3: Email Notification Channel

By default, Zammad uses sendmail. This can be changed to SMTP here.

Zammad uses `noreply@<your-fqdn>` as sender address by default. SMTP setups
might fail - you can skip this step with choosing sendmail and adjust it later!

### Step 4: Your First Email Channel <Badge type="info" text="optional" />

If you want to start right away, you can connect your email account already.

:::danger
By default, Zammad reacts to fetched emails (e.g. deletes them and sends
automatically generated answers) If that’s not what you want, skip this step
for now.
:::

After finishing the wizard you are automatically logged in to the just
created account.

## Next Steps

The list below might help you to find the right way. However, you should
adapt it to your needs. You can find additional information across this
documentation.

- Configure your required groups
- Adjust triggers as needed
- Add postmaster filters if needed
- Configure SLAs if needed
- Add email / social media channels & signatures
- Go back to group settings to add outgoing email addresses
- Add Text Modules
- Add Organizations
- Configure roles if needed
- Consider third party logins or LDAP integration for easier logins
- Add agent accounts
- Consider backup strategies for Zammad

:::tip

**Are you still lost?**

If you need help or you'll need to get in production a lot faster, you can also
book workshops with one of our
[Zammad consultants](https://zammad.com/en/company/contact){target=_blank}.
:::
