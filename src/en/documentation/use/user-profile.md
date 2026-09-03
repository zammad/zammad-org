---
title: User profile
order: 7
---

# User profile

Adjust your account and personal settings in your user profile. Some of the options may not be available,
depending on how your system is configured and your permissions. Open it from the avatar menu in the sidebar. Read on
for more details.

## Avatar menu

To open the avatar menu, click on your avatar icon in the bottom left corner in the sidebar. This icon either shows
your initials or a profile picture.

![Screenshot shows user detail panel](/screenshots/cypress/documentation/use/user-profile.cy.js/avatar-menu.png)

The menu contains the following entries:

- **Link(s) to documentation**: depending on your roles you can see one or more documentation links.
- **Appearance**: switch between dark, light and automatic mode. The automatic mode displays Zammad according to your
  web browser's current preference.
- **Keyboard shortcuts**: opens a popup with the available keyboard shortcuts. Alternatively, press [[?]] on your
  keyboard to show it too.
- **Personal settings**: opens your personal settings where you can adjust your avatar, password, notification settings
  and much more, see next section.

## Personal settings

![Screenshot shows personal settings of a user](/screenshots/cypress/documentation/use/user-profile.cy.js/user-profile-settings-full.png)

### Appearance

Change the appearance of Zammad. Available options:

- Dark mode
- Light mode
- Automatic mode

The last option tries to detect your browser's preference. It depends on your web browser if it works.

::: tip
If you want to switch quickly between dark and light mode, you can also use the toggle in the
[avatar menu](#avatar-menu) or use the keyboard shortcut by simply pressing [[d]].
:::

### Language

Choose the language in which Zammad's UI is displayed.

### Avatar

Adjust your avatar image. By default, the initials of your user are displayed on a colored background. If you want to
add an image, simply upload one or use your camera, if you have one.

After capturing or uploading an image, you can crop it. Have a look at the preview at the top of the right flyout.

### Out of office

Define absence periods (e.g. for your vacation) and designate a substitute to handle your tickets while you are away.

Your designated substitute will receive updates on new tickets and changes to existing ones while you're away.
Additionally, your custom overviews are available for this agent to keep track of your tickets. You receive
notifications while you are absent, too.

### Password

Change the password of your account. To update it, provide your old password, the new password and confirm the new one
by typing it again.

### Two-factor authentication

Set up a two-factor authentication (2FA) to increase the security of your account. Your admin must have activated at
least one 2FA method. It may be even enforced to use a 2FA method by your admin.

After following the [2FA guide](./guides/two-factor-auth), you have to provide your second factor at the next login.
If you can't provide your configured 2FA method, contact your admin to reset it.

### Devices

Here you can find a list of all devices logged into your Zammad account. If necessary, you can revoke the access by
clicking the delete icon in the "Actions" column. This ends the session on this device and requires a new login on
this device.

### Token access

Generate a personal access token for a third party application to access the Zammad API. After clicking the
`New Personal Access Token` button, you can set a name, an expiration date and configure the permissions for this token.

After creating the token, it gets displayed in a dialog only once. Make sure to copy it because there is no possibility
to access it again.

![Screenshot shows flyout with created token and copy button](/screenshots/cypress/documentation/use/user-profile.cy.js/token-dialog.png)

### Notifications

Adjust the notifications you get. You can adjust:

- For which ticket actions you get notified (e.g. for new tickets, for escalated tickets)
- For which ticket you get notified based on the assignment and your relation to it (e.g. only yours, not assigned,
  subscribed tickets)
- On which way you get notified (only in browser or additionally via email)
- For tickets in which group you get notified

Additionally, you can select a notification sound or disable it.

::: tip
To get notified via sound and notification on your operating system, you have to allow Zammad to send you notifications.
This is requested when Zammad tries to send you a notification the first time.

If you refused it and want to allow it now, look for an icon in the address bar where you can adjust the permissions of
the site. It depends on your web browser, how to do it exactly. If you can't find it, search for it in the web or have
a look at your browser's settings.
:::

::: info
Notifications you have already read are removed from the list automatically. Ones you marked as read yourself disappear
after about ten minutes. Ones Zammad marked as read for you - which happens when someone else changes the state of the
ticket the notification belongs to - remain for about eight hours. Independently of this, no notification is kept for
longer than nine months.

The clean-up runs every two hours, so a notification can stay visible somewhat longer than the times given above.
:::

### Overviews

Change the order of overviews for your account. Simply drag & drop them by clicking the handles on the left side.
If your admin changes the order, your custom order remains. You can switch back to your admin's order by clicking the
`Reset Overview Order` button.

### Calendar

Zammad allows you to subscribe to a calendar feed (ical) to see tickets in your favorite calendar application.
Use either the upper **Combined subscription URL** to subscribe to all tickets or the lower **Direct subscription URL**.
By choosing the latter, you can define which tickets based on ticket you want to include based on the state and
assignment status.
