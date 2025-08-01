---
title: User Profile
order: 7
---

# Manage Your User Profile

![Screenshot shows user profile settings](/screenshots/cypress/user-profile.cy.js/user-profile-settings-full.png)

## Avatar Menu

In the left navigation sidebar, you can find an avatar icon in the bottom
left corner. This icon can display your profile picture or your initials.

Clicking on this icon opens a menu where you can find different things:

![Screenshot shows user detail panel](/screenshots/cypress/user-profile.cy.js/user-menu-detail-panel.png)

- **Appearance** with toggle to switch between dark and light mode (or based on your
  web browser)
- **Keyboard shortcuts**: opens a popup where you can see the available keyboard
  shortcuts. You can open this popup by pressing the [[?]] button on
  your keyboard as well.
- **Profile settings**: opens your profile settings where you can adjust your
  avatar, password, notification settings and much more, see next section.

## Profile Settings

In your profile settings, you can adjust things concerning your account and
your personal settings. Some of the options may not be available for you,
depending on how your system is configured and your permissions.

### Appearance

Change the appearance of Zammad. Available options:

- Dark mode
- Light mode
- Sync with computer

The last option tries to detect your browser's preference. It depends on your
web browser. If it doesn't work, you can choose one of the other options.

::: tip
If you want to switch quickly between dark and light mode, you can also use
the toggle in the [avatar menu](#avatar-menu) or use the keyboard shortcut by
simply pressing [[d]].
:::

### Language

Choose your preferred language of Zammad.

### Avatar

In this section, you can adjust your avatar image. By default, the initials of
your user are displayed on a colored background. If you want to add an image,
simply upload one or use your camera, if you have one.

After capturing or uploading an image, you can crop it. Have a look at the
preview at the top of the right side panel.

### Out of Office

Define absence periods (e.g. for your vacation), and designate a substitute to
handle your tickets while you are away.

Your designated substitute will receive updates on new tickets and changes to
existing ones while you're away. Additionally, your custom overviews are
available for this agent to keep track of your tickets. You receive
notifications while you are absent, too.

### Password

Change the password of your account. Update it by entering your old password,
the new password and confirm the new one by entering it again.

### Two-factor Authentication

Set up a two-factor authentication (2FA) to increase the security of your
account. Your admin must have activated at least one 2FA method. It may be even
enforced to use a 2FA method by your admin.

After following the [2FA guide](./guides/two-factor-auth), you have to provide
your second factor at the next login. If you can't provide your configured 2FA
method, contact your admin who can reset it.

### Devices

Here you can find a list of all devices logged into your Zammad account.
If necessary, you can revoke the access by clicking the delete icon in the
"Actions" column.

### Token Access

Generate a personal access token for a third party application to access the
Zammad API. After clicking the `New Personal Access Token` button, you can set
a name, an expiration date and configure the permissions for this token.

### Notifications

Adjust the notifications you get. You can adjust:

- For which ticket actions you get notified (e.g. for new tickets, for
  escalated tickets)
- For which ticket you get notified based on the assignment and your relation
  to it (e.g. only yours, not assigned, subscribed tickets)
- On which way you get notified (only in browser or additionally via email)
- For tickets in which group you get notified

Additionally, you can select a notification sound or disable the sound.

::: tip
To get notified via sound and notification on your operating system, you have
to allow Zammad to send you notifications. This is requested when Zammad wants
to send you a notification the first time.

If you refused it and want to allow it now, it depends on your browser on how
to do that. Usually there is an icon in the address bar where you can adjust
the permissions of the site.
:::

### Overviews

Change the order of overviews for your account. Simply drag & drop them
by clicking the handles on the left side.

If your admin changes the order, your custom order remains. You can switch back
to your admin's order by clicking the `Reset Overview Order` button.

### Calendar

Zammad allows you to subscribe to a calender feed (ical) to see tickets in
your favorite calendar application.

Use either the upper "Combined subscription URL" to subscribe to all tickets or
the lower "Direct subscription URL". With the later one, you can define which
tickets based on ticket states and assignment you want to include.
