---
order: 9
title: 'Two-Factor Authentication'
---

# Two-Factor Authentication

Two-factor authentication (2FA) enhances the security of your Zammad account
by adding an extra layer of verification beyond a password. It requires you
to provide two different types of authentication factors, typically
something you know (like a password) and something you possess (like a
mobile device or a security token), to ensure that you are an authorized
individual who can access the account.

Two-Factor Authentication is an **optional feature**. Administrators must
activate it to be visible in your profile settings. The 2FA usage may be
even enforced by your admin. In this case, you can't use Zammad unless you
set up at least one 2FA method.

## Setup

If the system admin has enabled this feature, you can head to _Avatar > Profile > Two-factor Authentication_ to set it
up. Depending on the enabled two-factor methods, you may see one or more options in the table.

To set up a two-factor method, use the ::+:: button and follow the steps.

![Screenshot shows 2FA methods in user profile
settings](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-setup.png)

In a modal dialog, you will be asked to confirm your current password.

Depending on the chosen two-factor method, you will be guided through the
setup process, which includes specific steps.  Continue with using an
[Authentication App](#authentication-app) or a [Security
Key](#security-key).

### Authentication App

The authenticator app method is a type of two-factor authentication that
uses a mobile application to generate one-time codes for account
verification. After setting up the authenticator app on your device, you
will link it to your Zammad account.

![Screenshot shows app authentication
configuration](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup.png)

First, make sure you have installed an authenticator app on your mobile
device. Recommended apps are:

- [Google Authenticator](https://support.google.com/accounts/answer/1066447)
- [Authy](https://support.authy.com/hc/en-us/articles/115001945848-Installing-Authy-apps/)
- [Microsoft
  Authenticator](https://support.microsoft.com/en-us/account-billing/download-and-install-the-microsoft-authenticator-app-351498fc-850a-45da-b7b6-27e523b8702a)

Next, open the authenticator app on your device and find a **Scan QR Code**
action, or similar. Point your camera to the Zammad screen and scan the
shown QR code in the middle.

::: tip
If your device is not able to scan the QR code, first click on it to reveal your secret. Next, add a manual entry to
your authenticator app and enter the provided secret when asked.
:::

Your authenticator app should immediately add the new entry for your Zammad
account, and a 6-digit code will be displayed next to it together with a
timer.

Back in Zammad, enter the provided code to the **Security Code** field and
click on **Set Up**. Go on either by setting up another 2FA method
([security key](#security-key)) or check how to [log in with 2FA](#sign-in).

### Security Key

The security keys method is a type of a two-factor authentication that uses
Web Authentication API in the browser for verifying your identity. You may
register multiple hardware or software security keys with your Zammad
account and then they can be used during the sign-in process.

Initially, you will be presented with an empty side panel instructing you to
**Set Up** your first key.

![Screenshot shows security key authentication
configuration](/screenshots/documentation/use/two-factor-auth-usage/2fa-security-key-panel.png)

Then, enter a descriptive **Name for this security key** you will be
registering with your account, so you could later identify it in the
list. Then, click on **Next**.

Next, depending you your browser, you will be presented with different
options. Select one that refers to your chosen security key and follow the
instructions on the screen.

![Screenshot shows security key authentication
configuration](/screenshots/documentation/use/two-factor-auth-usage/2fa-passkey-auth.png)

You may be asked by the browser to interact with a key or a device so you
can prove you are in physical possession of it (e.g. enter its PIN to unlock
it).

::: warning
You will have limited time (measured in tens of seconds) to register your key. Better to have it ready before you
proceed!
:::

If the registration was successful, the modal dialog will close and you are
good to go. In case of errors, you will be able to **Retry** the
registration of the key.

Once set up, security keys can be managed by choosing **Edit** action next
to the two-factor authentication method.

You have an option to remove a key or set up additional ones. There is no
limit in number of security keys you can set up, but keep in mind you cannot
register an already registered key for your account. Removal of the last
security key will effectively remove the complete security keys method for
your account.

## Sign-in

When you set up two-factor authentication for your Zammad account, during
the next sign-in you will be asked to provide the same two-factor method
after entering correct username and password. Depending on the chosen
two-factor method, this may be a security code, hardware key, etc.

In case you are having issues during sign-in with your preferred two-factor
authentication method, you can switch to another one, provided you have set
it up previously.

Look for **Try another method** link below the sign in box. In case you
don't see this link, you probably have no other available two-factor methods
set up, or your admin has disabled this feature.

![Log in screen with link to "Try another
method"](/screenshots/documentation/use/two-factor-auth-usage/2fa-link-another-method.png)

Alternatively, you can also use one of your recovery codes, which are
auto-generated for your account during the initial setup of the two-factor
authentication. Click on **Or use one of your recovery codes**, enter one of
your unused codes and click on **Sign in**.

![Log in screen with recovery codes
link](/screenshots/documentation/use/two-factor-auth-usage/2fa-login-recovery-codes.png)

::: warning
You can use a single recovery code only once! In case you exhaust the list of your recovery codes, it is recommended
you regenerate them for your account.
:::

## Generate Recovery Codes

Recovery codes are one-time use security codes that can be used to sign in
if you lose access to your other two-factor authentication methods. They can
only be used as a **backup method**.

If the feature is enabled by the admin, recovery codes will be automatically
generated for you during the setup of your initial two-factor authentication
method.

You will be asked to print out or save the generated recovery codes in a
safe place. Once used, a recovery code cannot be reused.

![Screenshot shows output of recovery codes during 2FA
setup](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup-recovery-codes.png)

You also have an option to regenerate your recovery codes at any time, which
invalidates already existing recovery codes and provides you with a list of
fresh codes. You can do this by clicking on `Regenerate recovery codes`
button in your profile's 2FA settings.

## Set a Default 2FA Method

To set an already set up two-factor method as default, use the ::a:: actions
menu next to it in your profile's 2FA settings and choose **Set as
default**.

In order to identify your current default two-factor authentication method,
look for a small blue badge next to the method name.

![Screenshot shows list of 2FA methods and default
method](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-overview.png)

A default two-factor authentication method is just your preferred method
during the sign-in process. You will always have an option to try signing in
using another method.

## Edit a 2FA Method

![Screenshot shows the action menu for an already set up 2FA
method](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-action-menu.png)

To edit an already set up two-factor method, use the ::a:: actions menu next
to it and choose **Edit**. In a modal dialog, you will be asked to confirm
your current password.

Depending on the chosen two-factor method, you will be guided again through
the setup process. Normally, editing a method will simply renew it and
replace the older setup, but some methods do support advanced functions
(e.g. adding multiple security keys).

## Remove a 2FA Method

To remove an already set up two-factor method, use the ::a:: actions menu
next to it and choose **Remove**. In a modal dialog, you will be asked to
confirm the removal with your current password.
