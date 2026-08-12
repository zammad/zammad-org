require_relative 'helpers'

puts 'Start seeding the Zammad system...'

puts 'Setting user avatars...'

# Admin Lauren Brooks
SeedHelpers.set_avatar_for_user(login: 'lauren@fastlane.inc', file: './assets/lauren-brooks.jpg')

# Head of Customer Relation Ethan Kwan
SeedHelpers.set_avatar_for_user(login: 'ethan@fastlane.inc', file: './assets/ethan-kwan.jpg')

# Agent 2nd level Julian Reyes
SeedHelpers.set_avatar_for_user(login: 'julian@fastlane.inc', file: './assets/julian-reyes.jpg')

# Agent 2nd level Thomas Lee
SeedHelpers.set_avatar_for_user(login: 'thomas@fastlane.inc', file: './assets/thomas-lee.jpg')

# Agent 1st level Liam Chen
SeedHelpers.set_avatar_for_user(login: 'liam@fastlane.inc', file: './assets/liam-chen.jpg')

# Agent 1st level Alex Jensen
SeedHelpers.set_avatar_for_user(login: 'alex@fastlane.inc', file: './assets/alex-jensen.jpg')

# Agent 1st level Emily Wilson
SeedHelpers.set_avatar_for_user(login: 'emily@fastlane.inc', file: './assets/emily-wilson.jpg')

# Head of IT Hannah Taylor
SeedHelpers.set_avatar_for_user(login: 'hannah@fastlane.inc', file: './assets/hannah-taylor.jpg')

# IT infrastructure Jackson Lee
SeedHelpers.set_avatar_for_user(login: 'jackson@fastlane.inc', file: './assets/jackson-lee.jpg')

# IT support Emily Tran
SeedHelpers.set_avatar_for_user(login: 'emily.t@fastlane.inc', file: './assets/emily-tran.jpg')

# Head of logistics Ava Moreno
SeedHelpers.set_avatar_for_user(login: 'ava@fastlane.inc', file: './assets/ava-moreno.jpg')

# Head of Sales Morgan Reed
SeedHelpers.set_avatar_for_user(login: 'morgan@fastlane.inc', file: './assets/morgan-reed.jpg')

# B2B customer 1
SeedHelpers.set_avatar_for_user(login: 'evely.smith@midlandbank.biz', file: './assets/evelyn-smith.jpg')

puts 'Creating tickets...'

### Ticket section ###

# return-shipping ticket
johndoe = User.find_by(login: 'john.doe@example.com')
liamchen = User.find_by(login: 'liam@fastlane.inc')
UserInfo.current_user_id = johndoe.id
created_at = Time.zone.now - 6.months - 2.hours
ticket1 = Ticket.create(
  title:      'Refund for order 4388019',
  group:      Group.find_by(name: 'Support::1st Level'),
  customer:   johndoe,
  owner_id:   liamchen.id,
  state:      Ticket::State.find_by(name: 'closed'),
  priority:   Ticket::Priority.find_by(name: '2 normal'),
  created_at: created_at,
  updated_at: created_at,
)
ticket1.tag_add('return')
ticket1.tag_add('delayed refund')
article = Ticket::Article.create(
  ticket:       ticket1,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{johndoe.fullname} <#{johndoe.email}>",
  to:           'support@fastlane.inc',
  subject:      'Refund for order 4388019',
  body:         "Hi Fast lane team,

I've sent back the goods for the mentioned delivery number but the refunding is still open.
Please check and send me the money.

Best regards


#{johndoe.fullname}",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)
UserInfo.current_user_id = liamchen.id
created_at = Time.zone.now - 6.months - 1.hour
article = Ticket::Article.create(
  ticket:       ticket1,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{liamchen.fullname} via <support@fastlane.inc>",
  to:           "#{johndoe.fullname} <#{johndoe.email}>",
  body:         "Hi #{johndoe.firstname},<br/>
<br/>
we are very sorry that this went wrong. I checked your case
and it seems that the receipt of your parcel was not registered properly.<br/>
<br/>
We already triggered the transfer of the money. Additionally, you get a discount of 5% on your next order in our online shop. Use the code <code>c92n4sl29</code> at the check out.<br/>
<br/>
<span class='js-signatureMarker'></span>
<br/>
--<br/>
Greetings,<br/>
<br/>
#{liamchen.fullname}<br/>",
  content_type: 'text/html',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)
UserInfo.current_user_id = johndoe.id
created_at = Time.zone.now - 6.months + 1.day + 5.hours
article = Ticket::Article.create(
  ticket:       ticket1,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{johndoe.fullname} <#{johndoe.email}>",
  to:           'support@fastlane.inc',
  body:         "Hi #{liamchen.firstname},<br/>
<br/>
thanks a lot, I already got the money!
<br/> <br/>
#{johndoe.firstname}<br/>",
  content_type: 'text/html',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

# b2b custom order ticket 1
evelynsmith = User.find_by(login: 'evely.smith@midlandbank.biz')
morganreed = User.find_by(login: 'morgan@fastlane.inc')
UserInfo.current_user_id = evelynsmith.id
created_at = Time.zone.now - 100.minutes
ticket2 = Ticket.create(
  title:      'Order of 10 laptops XYX3000',
  group:      Group.find_by(name: 'Sales'),
  customer:   evelynsmith,
  owner_id:   morganreed.id,
  state:      Ticket::State.find_by(name: 'open'),
  priority:   Ticket::Priority.find_by(name: '2 normal'),
  created_at: created_at,
  updated_at: created_at,
  escalation_at: Time.zone.now - 40.minutes,
  first_response_escalation_at: Time.zone.now - 40.minutes,
  close_escalation_at: Time.zone.now + 200.minutes, 
)
article = Ticket::Article.create(
  ticket:       ticket2,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{evelynsmith.fullname} <#{evelynsmith.email}>",
  to:           'sales@fastlane.inc',
  subject:      'Order of 10 laptops XYX3000',
  body:         "Dear Morgan,

hope you're doing fine! We are growing and have 10 new employees.

Therefore we need 10 additional laptops (same as from our last order). Please let me know when they can be delivered.

Thanks! See you at your VIP customer event next week :-)

Evelyn
",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

UserInfo.current_user_id = morganreed.id
created_at = Time.zone.now - 37.minutes
article = Ticket::Article.create(
  ticket:       ticket2,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{morganreed.fullname} via <sales@fastlane.inc>",
  to:           "#{evelynsmith.fullname} <#{evelynsmith.email}>",
  body:         "Hello Evelyn,

  we have them in stock for the same price. I'll check with our logistics department when the items can be shipped and let you know.

  Best regards

  Morgan",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

UserInfo.current_user_id = morganreed.id
created_at = Time.zone.now - 33.minutes
article = Ticket::Article.create(
  ticket:       ticket2,
  type:         Ticket::Article::Type.find_by(name: 'note'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{morganreed.fullname} <#{morganreed.email}>",
#  to:           'sales@fastlane.inc',
  body:         "Hi Ava,
  <br/> <br/>
  Midland Bank ordered 10x <code>XYX3000</code>. They want to know when it can be shipped. Be aware that we have the special shipment agreement, so it has to be forwarded by 'Hanson Freight'.
  <br/> <br/>
  Thanks!
  <br/> <br/>
  Morgan",
  content_type: 'text/html',
  internal:     true,
  created_at:   created_at,
  updated_at:   created_at,
)

Mention.subscribe!(ticket2, User.find_by(login: 'ava@fastlane.inc'))

#onboarding ticket internal
hannahtaylor = User.find_by(login: 'hannah@fastlane.inc')
laurenbrooks = User.find_by(login: 'lauren@fastlane.inc')
UserInfo.current_user_id = hannahtaylor.id
created_at = Time.zone.now - 2.days
ticket3 = Ticket.create(
  title:      'Onboarding new colleague',
  group:      Group.find_by(name: 'IT Internal'),
  customer:   hannahtaylor,
  owner_id:   laurenbrooks.id,
  state:      Ticket::State.find_by(name: 'open'),
  priority:   Ticket::Priority.find_by(name: '3 high'),
  created_at: created_at,
  updated_at: created_at,
)
ticket3.tag_add('internal')
ticket3.tag_add('HR')
ticket3.tag_add('onboarding')
article = Ticket::Article.create(
  ticket:       ticket3,
  type:         Ticket::Article::Type.find_by(name: 'web'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{hannahtaylor.fullname} <#{hannahtaylor.email}>",
  to:           'operations@fastlane.inc',
  subject:      'Onboarding new colleague',
  body:         "Dear Lauren,

  as I already told you, our new colleague for the IT department starts next month.

  I've added the onboarding checklist. Please have a look at it and make sure everything works when he is starting.

  Hannah
  ",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

onboarding_checklist_template = ChecklistTemplate.create!(name: 'Onboarding')
onboarding_checklist_template.replace_items!([
  'Buy a desk and a chair',
  'Provide date and time of the first working day',
  'Allocate a bike parking space',
  'Create an access card for the building',
  'IT equipment',
  'Schedule a meeting with the complete department in the first week (duration at least 1 hour)',
])

ticket3_checklist = Checklist.create_from_template!(ticket3, onboarding_checklist_template)

#onboarding ticket internal: IT equipment
hannahtaylor = User.find_by(login: 'hannah@fastlane.inc')
laurenbrooks = User.find_by(login: 'lauren@fastlane.inc')
UserInfo.current_user_id = hannahtaylor.id
created_at = Time.zone.now - 2.days + 5.minutes
ticket4 = Ticket.create(
  title:      'IT | Onboarding new colleague',
  group:      Group.find_by(name: 'IT Internal'),
  customer:   hannahtaylor,
  owner_id:   laurenbrooks.id,
  state:      Ticket::State.find_by(name: 'open'),
  priority:   Ticket::Priority.find_by(name: '3 high'),
  created_at: created_at,
  updated_at: created_at,
)
ticket4.tag_add('internal')
ticket4.tag_add('onboarding')
ticket4.tag_add('IT equipment')
article = Ticket::Article.create(
  ticket:       ticket4,
  type:         Ticket::Article::Type.find_by(name: 'web'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{hannahtaylor.fullname} <#{hannahtaylor.email}>",
  to:           'operations@fastlane.inc',
  subject:      'IT | Onboarding new colleague',
  body:         "IT equipment
  ",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

it_checklist_template = ChecklistTemplate.create!(name: 'IT checklist')
it_checklist_template.replace_items!([
  'Get laptop',
  'Get mobile phone',
  'Install Linux',
  'Create Zammad account',
  'Assign 2FA token'
])

ticket4_checklist = Checklist.create_from_template!(ticket4, it_checklist_template)

ticket3_checklist.items.find_by(text: 'IT equipment').update(text: "#{Setting.get('ticket_hook')}#{ticket4.number}")


#support ticket from b2c customer
petraparker = User.find_by(login: 'pparker@hotmail.com')
alexjensen = User.find_by(login: 'alex@fastlane.inc')
thomaslee = User.find_by(login: 'thomas@fastlane.inc')
UserInfo.current_user_id = petraparker.id
created_at = Time.zone.now - 47.minutes
ticket5 = Ticket.create(
  title:      'Laptop not working [Order 931529477]',
  group:      Group.find_by(name: 'Support::2nd Level'),
  customer:   petraparker,
  owner_id:   thomaslee.id,
  state:      Ticket::State.find_by(name: 'open'),
  priority:   Ticket::Priority.find_by(name: '2 normal'),
  created_at: created_at,
  updated_at: created_at,
)
ticket5.tag_add('laptop')
ticket5.tag_add('problem')
ticket5.tag_add('boot issue')
article = Ticket::Article.create(
  ticket:       ticket5,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{petraparker.fullname} <#{petraparker.email}>",
  to:           'support@fastlane.inc',
  subject:      'Laptop not working [Order 931529477]',
  body:         "Hello Fast Lane Team,

First of all I have to say that your service is exceptional! I ordered a customized laptop and 1 day later I had it in my hands! Great!

However, there is a problem with the device. I am not able to get it to work. Of course I plugged in the charging cable, but only one LED on the side of the device flashes when I press the power button.

Do you have any idea what could be the problem here? I have already searched the web but have not found any reference to this behavior.

Thank you for your help!

  Best regards",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

UserInfo.current_user_id = alexjensen.id
article = Ticket::Article.create(
  ticket:       ticket5,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{alexjensen.fullname} via <support@fastlane.inc>",
  to:           "#{petraparker.fullname} <#{petraparker.email}>",
  subject:      'Laptop not working [Order 931529477]',
  body:         "Hello Petra,

thank you for your praise, which I am happy to pass on to the other departments.

Regarding your problem: this is indeed unusual. Can you please tell us what color the LED is flashing and how often it flashes?

Thank you for your help!

Alex",
  content_type: 'text/plain',
  internal:     false,
  created_at:   Time.zone.now - 36.minutes,
  updated_at:   created_at,
)

UserInfo.current_user_id = petraparker.id
file = File.open("#{__dir__}/assets/led-flashing.jpg", 'rb')
contents = Base64.strict_encode64(file.read)
article = Ticket::Article.create(
  ticket:       ticket5,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{petraparker.fullname} <#{petraparker.email}>",
  to:           'support@fastlane.inc',
  subject:      'Laptop not working [Order 931529477]',
  body:         "Hi Alex,
<br/><br/>
yeah sure: it flashes 3x white (short) and 1x red (long). It is a hidden LED which is located between the ports on the right side of the device:<br/>
<br/>
<img src=\"data:image/jpeg;base64,#{contents}\" width=\"500\">
<br/>
<br/>
Hope that this helps. If you need anything more from my side, let me know.
<br/><br/>
Petra",
  content_type: 'text/html',
  internal:     false,
  created_at:   Time.zone.now - 20.minutes,
  updated_at:   created_at,
)

UserInfo.current_user_id = alexjensen.id
article = Ticket::Article.create(
  ticket:       ticket5,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{alexjensen.fullname} via <support@fastlane.inc>",
  to:           "#{petraparker.fullname} <#{petraparker.email}>",
  subject:      'Laptop not working [Order 931529477]',
  body:         "Thanks a lot!

We have not yet had this behavior in support. I'll clarify with 2nd level how we can help you. We'll get back to you as soon as possible.

Alex",
  content_type: 'text/plain',
  internal:     false,
  created_at:   Time.zone.now - 11.minutes,
  updated_at:   created_at,
)

UserInfo.current_user_id = alexjensen.id
article = Ticket::Article.create(
  ticket:       ticket5,
  type:         Ticket::Article::Type.find_by(name: 'web'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{alexjensen.fullname} via <support@fastlane.inc>",
  body:         "Hi Thomas,

I have never seen this error and our knowledge base has no reference to it.

RMA? Or can we ask our engineering team for help?",
  content_type: 'text/plain',
  internal:     true,
  created_at:   Time.zone.now - 7.minutes,
  updated_at:   created_at,
)

# Demo ticket for screenshots of some elements
mola = User.find_by(login: 'mola@babangida.xz')
ava = User.find_by(login: 'ava@fastlane.inc')
UserInfo.current_user_id = mola.id
created_at = Time.zone.now - 1.hours
ticket6 = Ticket.create(
  title:      'My battery is dead / order 110572',
  group:      Group.find_by(name: 'Support'),
  customer:   mola,
  owner_id:   ava.id,
  state:      Ticket::State.find_by(name: 'open'),
  priority:   Ticket::Priority.find_by(name: '1 low'),
  created_at: created_at,
  updated_at: created_at,
)
article = Ticket::Article.create(
  ticket:       ticket6,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{mola.fullname} <#{mola.email}>",
  to:           'support@fastlane.inc',
  subject:      'My battery is dead / order 110572',
  body:         "Hi Fast Lane Team,

I just received my new mobile phone and the battery seems dead. It only lasts about 15 minutes after a full charge. What's the process now?

This is unusable for me currently.

Mola
",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
  preferences:  {
    'security' => {
      'type' => 'PGP',
      'sign' => { 'success' => true, 'comment' => 'Successfully signed and verified.' },
      'encryption' => { 'success' => true, 'comment' => 'Successfully encrypted.' },
    }
  },
)

# Second article on the demo ticket with security error states — captures
# the ArticleBubbleSecurityWarning banner and fail-state icons for the
# secure-email documentation screenshots.
UserInfo.current_user_id = mola.id
created_at = Time.zone.now - 30.minutes
article = Ticket::Article.create(
  ticket:       ticket6,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{mola.fullname} <#{mola.email}>",
  to:           'support@fastlane.inc',
  subject:      'Re: My battery is dead / order 110572',
  body:         "Any update on this?\n",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
  preferences:  {
    'security' => {
      'type' => 'PGP',
      'sign' => { 'success' => false, 'comment' => 'Unable to find certificate for validation' },
      'encryption' => { 'success' => false, 'comment' => 'Unable to find private key to decrypt' },
    }
  },
)

#another ticket for the user detail stats
hannahtaylor = User.find_by(login: 'hannah@fastlane.inc')
laurenbrooks = User.find_by(login: 'lauren@fastlane.inc')
UserInfo.current_user_id = hannahtaylor.id
created_at = Time.zone.now - 55.days
ticket7 = Ticket.create(
  title:      'My account is locked',
  group:      Group.find_by(name: 'IT Internal'),
  customer:   hannahtaylor,
  owner_id:   laurenbrooks.id,
  state:      Ticket::State.find_by(name: 'closed'),
  priority:   Ticket::Priority.find_by(name: '2 normal'),
  created_at: created_at,
  updated_at: created_at,
  close_at:   created_at + 1.days,
)
article = Ticket::Article.create(
  ticket:       ticket7,
  type:         Ticket::Article::Type.find_by(name: 'web'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{hannahtaylor.fullname} <#{hannahtaylor.email}>",
  to:           'operations@fastlane.inc',
  subject:      'My account is locked',
  body:         "Hi Lauren,

  it seems that I'm no longer able to sign in to our ERP. Can you please check and reset my account? Maybe related with the new security measures? Thanks!

  Best,
  Hannah
  ",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

article = Ticket::Article.create(
  ticket:       ticket7,
  type:         Ticket::Article::Type.find_by(name: 'note'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  body:         "Hi Hannah,

  I checked your account and it seems that it got locked because of a missing
  2FA method. I re-enabled your account. At the next login, you have to set up
  a 2FA method. Feel free to get in touch again if you need further assistance!

  Have a nice day,
  Lauren
  ",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

# Yet another B2C WhatsAppticket
christyler = User.find_by(login: 'christyler@pear.com')
emilywilson = User.find_by(login: 'emily@fastlane.inc')
UserInfo.current_user_id = christyler.id
created_at = Time.zone.now - 3.hours
ticket8 = Ticket.create(
  title:      'New WhatsApp message from Chris Tyler (+1 666 123 4567)',
  group:      Group.find_by(name: 'Support::1st Level'),
  customer:   christyler,
  owner_id:   emilywilson.id,
  state:      Ticket::State.find_by(name: 'open'),
  priority:   Ticket::Priority.find_by(name: '2 normal'),
  created_at: created_at,
  updated_at: created_at,
)

UserInfo.current_user_id = christyler.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{christyler.fullname} <#{christyler.mobile}>",
  subject:      'Delivery not received',
  body:         "Hi, I ordered a power drill from your store last week, and it was supposed to be delivered yesterday, but I haven't received it yet. Can you help?",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at,
  updated_at:   created_at,
)

UserInfo.current_user_id = emilywilson.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{emilywilson.fullname}",
  body:         "Hello! I'm sorry to hear that your order hasn't arrived. I'd be happy to help. Could you please provide your order number?",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at + 5.minutes,
  updated_at:   created_at + 5.minutes,
)

UserInfo.current_user_id = christyler.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{christyler.fullname} <#{christyler.mobile}>",
  body:         "Sure, it's OD782491",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at + 12.minutes,
  updated_at:   created_at + 12.minutes,
)

UserInfo.current_user_id = emilywilson.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{emilywilson.fullname}",
  body:         "Thank you. Let me check the status of your order... It looks like the package was marked as delivered yesterday at 3:42 PM to the front porch of your address. Is there any chance someone else received it or it was misplaced?",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at + 26.minutes,
  updated_at:   created_at + 26.minutes,
)

UserInfo.current_user_id = christyler.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{christyler.fullname} <#{christyler.mobile}>",
  body:         "Hmm, I don't see it anywhere. Maybe it was stolen?",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at + 27.minutes,
  updated_at:   created_at + 27.minutes,
)

UserInfo.current_user_id = emilywilson.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{emilywilson.fullname}",
  body:         "I understand how frustrating that must be. We can initiate a missing package investigation with the courier. In the meantime, we can either reship your order or issue a full refund—whichever you prefer.",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at + 35.minutes,
  updated_at:   created_at + 35.minutes,
)

UserInfo.current_user_id = christyler.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{christyler.fullname} <#{christyler.mobile}>",
  body:         "I'd like to get the drill as soon as possible, so please reship it.",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at + 41.minutes,
  updated_at:   created_at + 41.minutes,
)

UserInfo.current_user_id = emilywilson.id
article = Ticket::Article.create(
  ticket:       ticket8,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{emilywilson.fullname}",
  body:         "Absolutely. We'll send out a replacement today with express shipping at no extra cost. You should receive it within 2 business days. I'll send you the new tracking details shortly.",
  content_type: 'text/plain',
  internal:     false,
  created_at:   created_at + 55.minutes,
  updated_at:   created_at + 55.minutes,
)

# Yet another B2B ticket
amberwright = User.find_by(login: 'amber.wright@joes-carparts.com')
morganreed = User.find_by(login: 'morgan@fastlane.inc')
UserInfo.current_user_id = amberwright.id
created_at = Time.zone.now - 42.minutes
ticket9 = Ticket.create(
  title:      'Inquiry about hardware procurement',
  group:      Group.find_by(name: 'Sales'),
  customer:   amberwright,
  owner_id:   morganreed.id,
  state:      Ticket::State.find_by(name: 'open'),
  priority:   Ticket::Priority.find_by(name: '2 normal'),
  created_at: created_at,
  updated_at: created_at,
)

UserInfo.current_user_id = amberwright.id
file = File.open("#{__dir__}/assets/joes-signature.jpg", 'rb')
contents = Base64.strict_encode64(file.read)
article = Ticket::Article.create(
  ticket:       ticket9,
  type:         Ticket::Article::Type.find_by(name: 'email'),
  sender:       Ticket::Article::Sender.find_by(name: 'Customer'),
  from:         "#{amberwright.fullname} <#{amberwright.email}>",
  subject:      'Hardware Inquiry',
  body:         "Dear Sales Team,
<br/><br/>
I'm reaching out on behalf of Joe's Car Parts, a growing car part seller with
350 employees across three regional shops. We're expanding and centralizing IT
infrastructure and are interested in establishing a partnership with a reliable
hardware supplier.
<br/><br/>
The procurement consists of enterprise-grade computing equipment, including high-performance
workstations, servers, networking gear, endpoint devices and peripherals. You can find the 
detailed specifications and quantities in the attached document. 
<br/><br/>
Additionally, we would appreciate information about product availability and return
policies.
<br/><br/>
We're looking to order the first batch until the end of next month and would
welcome the opportunity to discuss how we might collaborate.
<br/><br/>
In case you have any questions or need further information, please don't hesitate
to contact me. I look forward to your response and the possibility of working
together.
<br/><br/>
Best regards,
<br/> -----
<br/>Amber Wright
<br/>Sales Manager
<br/>amber.wright@joes-carparts.com
<br/>(555) 666-0123
<br/>
<br/>Joe's Car Parts
<br/> <img src=\"data:image/jpeg;base64,#{contents}\" width=\"300\" >",
  content_type: 'text/html',
  internal:     false,
  attachments:  [{
      "filename": "inquiry_joes_car_parts.xlsx",
      "data": "test",
      "mime-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  ],
  created_at:   created_at,
  updated_at:   created_at,
)

UserInfo.current_user_id = morganreed.id
article = Ticket::Article.create(
  ticket:       ticket9,
  type:         Ticket::Article::Type.find_by(name: 'whatsapp message'),
  sender:       Ticket::Article::Sender.find_by(name: 'Agent'),
  from:         "#{morganreed.fullname}",
  body:         "
Amber also gave me a call. We had a good talk, and they'd be happy to see a solid offer from us.
The offer needs to be in by the end of the next week at the latest so that procurement can happen
on time.
",
  content_type: 'text/html',
  internal:     true,
  created_at:   created_at + 17.minutes,
  updated_at:   created_at + 17.minutes,
)

puts 'Creating overviews...'
# 2 individual overviews with 8-10 tickets in there
UserInfo.current_user_id = 1
overview_role = Role.find_by(name: 'Agent')
Overview.create_if_not_exists(
  name:      'Open Tickets by Group',
  link:      'open-group',
  prio:      1000,
  role_ids:  [overview_role.id],
  condition: {
    'ticket.state_id' => {
      operator: 'is',
      value:    [1, 2, 3, 4, 5],
    },
  },
  group_by:        'group',
  group_direction: 'ASC',
  order:     {
    by:        'created_at',
    direction: 'ASC',
  },
  view:      {
    d:                 %w[title customer group created_at],
    s:                 %w[title customer group created_at],
    m:                 %w[number title customer group created_at],
    view_mode_default: 's',
  },
)

puts 'Configuring two-factor authentication...'

morganreed = User.find_by(login: 'morgan@fastlane.inc')
UserInfo.current_user_id = morganreed.id
User::TwoFactorPreference.create!(user_id: morganreed.id, method: 'authenticator_app', configuration: { 'secret' => 'NKBGKAQNCXWU4ZH4SHZYVQQCQTBX7R2V', 'provisioning_uri' => 'otpauth://totp/Zammad%20Test%20System:admin%40example.com?secret=NKBGKAQNCXWU4ZH4SHZYVQQCQTBX7R2V&issuer=Zammad%20Test%20System', 'last_otp_at' => 1746454920 })
# Recovery codes have to be hashed at seed time using the live
# application_secret (PasswordHash.crypt peppers with it). A pre-baked
# argon2id hardcoded in the file will not verify once db:seed has run
# with a different secret. Render a known plaintext (the recovery code
# the Cypress 2FA guide expects) and repeat it many times so the test
# can be run multiple times against the same stack instance.
known_code  = '7f80b91f6bcd7b60'
hashed_codes = Array.new(50) { PasswordHash.crypt(known_code) }
User::TwoFactorPreference.create!(user_id: morganreed.id, method: 'recovery_codes', configuration: { 'codes' => hashed_codes })

puts 'Setting up system...'

# System preparation
lauren = User.find_by(login: 'lauren@fastlane.inc')
UserInfo.current_user_id = lauren.id
Taskbar.create!([
                  { user_id: lauren.id, last_contact: Time.zone.now - 3.minutes, key: "Ticket-#{ticket1.id}", callback: 'TicketZoom', state: { 'ticket' => { 'owner_id' => liamchen.id }, 'article' => {} }, params: { 'ticket_id' => ticket1.id, 'shown' => true }, prio: 2, notify: false, active: false },
                  { user_id: lauren.id, last_contact: Time.zone.now - 10.minutes, key: "Ticket-#{ticket2.id}", callback: 'TicketZoom', state: { 'ticket' => { 'owner_id' => morganreed.id }, 'article' => {} }, params: { 'ticket_id' => ticket2.id, 'shown' => true }, prio: 2, notify: true, active: false },
                  { user_id: lauren.id, last_contact: Time.zone.now - 10.minutes, key: "Ticket-#{ticket3.id}", callback: 'TicketZoom', state: { 'ticket' => { 'owner_id' => lauren.id }, 'article' => {} }, params: { 'ticket_id' => ticket3.id, 'shown' => true }, prio: 3, notify: false, active: false },
                  { user_id: lauren.id, last_contact: Time.zone.now - 10.minutes, key: "Ticket-#{ticket4.id}", callback: 'TicketZoom', state: { 'ticket' => { 'owner_id' => lauren.id }, 'article' => {} }, params: { 'ticket_id' => ticket4.id, 'shown' => true }, prio: 3, notify: false, active: false },
                  { user_id: lauren.id, last_contact: Time.zone.now - 10.minutes, key: "Ticket-#{ticket5.id}", callback: 'TicketZoom', state: { 'ticket' => { 'owner_id' => thomaslee.id }, 'article' => {} }, params: { 'ticket_id' => ticket5.id, 'shown' => true }, prio: 2, notify: true, active: true },
                  { user_id: lauren.id, last_contact: Time.zone.now - 10.minutes, key: "Ticket-#{ticket8.id}", callback: 'TicketZoom', state: { 'ticket' => { 'owner_id' => emilywilson.id }, 'article' => {} }, params: { 'ticket_id' => ticket8.id, 'shown' => true }, prio: 2, notify: true, active: true },
                 ])

# Product logo
product_logo = {
  content: File.open("#{__dir__}/assets/FastLaneHardwareInc.svg", 'rb').read,
  file_extension: 'svg',
  mime_type: 'image/svg+xml',
}
logo_timestamp = Service::SystemAssets::ProductLogo.store_logo(product_logo)
Setting.set('product_logo', logo_timestamp)

KnowledgeBase::Locale.where(system_locale_id: Locale.find_by(locale: 'en-us').id).update(primary: true)

# Knowledge Base: categories and answers
puts 'Creating knowledge base categories and answers...'

# Create knowledge base if it does not exist yet.
kb = KnowledgeBase.active.first
if kb.nil?
  kb_locale_id = Locale.find_by!(locale: 'en-us').id
  kb = KnowledgeBase.create!(
    iconset:           'FontAwesome',
    color_highlight:   '#38ae6a',
    color_header:      '#f9fafb',
    color_header_link: 'hsl(206,8%,50%)',
    homepage_layout:   'grid',
    category_layout:   'grid',
    active:            true,
    kb_locales_attributes: [
      {
        system_locale_id: kb_locale_id,
        primary:          true,
      },
    ],
  )
end

kb_locale = kb.kb_locales.find_by!(system_locale_id: Locale.find_by!(locale: 'en-us').id)

# Helper: create an answer with translation and published content.
def create_kb_answer(category:, kb_locale:, title:, body:, internal_note: nil)
  answer = KnowledgeBase::Answer.create!(
    category_id:   category.id,
    internal_note: internal_note,
  )

  # Create content without the after_save callback that assumes a translation exists.
  content = KnowledgeBase::Answer::Translation::Content.new(body: body)
  KnowledgeBase::Answer::Translation::Content.skip_callback(:save, :after, :bump_translation_edited_at)
  content.save!
  KnowledgeBase::Answer::Translation::Content.set_callback(:save, :after, :bump_translation_edited_at)

  KnowledgeBase::Answer::Translation.create!(
    title:        title,
    kb_locale_id: kb_locale.id,
    answer_id:    answer.id,
    content_id:   content.id,
  )

  # Publish by setting the timestamp directly (the state machine delegates to timestamps).
  answer.update!(published_at: Time.zone.now)

  answer
end

# --- Category: Getting Started ---
category_getting_started = KnowledgeBase::Category.create!(
  knowledge_base_id: kb.id,
  category_icon:     'fa-hand-pointer',
)
KnowledgeBase::Category::Translation.create!(
  category_id: category_getting_started.id,
  kb_locale_id: kb_locale.id,
  title: 'Getting started',
)

create_kb_answer(
  category:   category_getting_started,
  kb_locale:  kb_locale,
  title:      'Welcome to Fast Lane Support',
  body:       '<p>Welcome to Fast Lane Hardware Support! We are here to help you with all your IT hardware needs. Whether you have questions about your order, need technical assistance, or want to learn about our products, our knowledge base has you covered.</p><p>Use the search bar or browse through our categories to find the information you need. Our support team is also available to assist you with any issues that are not covered here.</p>',
)

create_kb_answer(
  category:     category_getting_started,
  kb_locale:    kb_locale,
  title:        'How to contact support',
  internal_note: 'How to reach support',
  body:         '<p>You can reach our support team through several channels:</p><ul><li><strong>Email:</strong> Send a message to support@fastlane.inc and we will respond within one business day.</li><li><strong>Phone:</strong> Call us at +49 123 4567890 during business hours (Monday to Friday, 9:00 to 17:00 CET).</li><li><strong>Ticket system:</strong> Submit a ticket through our support portal for the fastest response. You can track the status of your request at any time.</li></ul><p>For urgent hardware failures, please call our emergency hotline at +49 123 4567891.</p>',
)

create_kb_answer(
  category:     category_getting_started,
  kb_locale:    kb_locale,
  title:        'Setting up your account',
  internal_note: 'Account setup guide',
  body:         '<p>When you first access Fast Lane Support, you will be guided through a quick setup process:</p><ol><li><strong>Verify your email address:</strong> Check your inbox for a verification link and click it to activate your account.</li><li><strong>Complete your profile:</strong> Add your name, phone number, and any other relevant details so our support team can reach you quickly.</li><li><strong>Set your preferences:</strong> Choose your preferred language and notification settings.</li></ol><p>Once your account is set up, you can submit tickets, browse our knowledge base, and track all your support requests in one place.</p>',
)

# --- Category: Products & Orders ---
category_products = KnowledgeBase::Category.create!(
  knowledge_base_id: kb.id,
  category_icon:     'fa-box',
)
KnowledgeBase::Category::Translation.create!(
  category_id: category_products.id,
  kb_locale_id: kb_locale.id,
  title: 'Products and orders',
)

create_kb_answer(
  category:     category_products,
  kb_locale:    kb_locale,
  title:        'How to track your order',
  internal_note: 'Order tracking instructions',
  body:         '<p>You can track your order status at any time through your Fast Lane Support account:</p><ol><li>Log in to your account at support.fastlane.inc.</li><li>Navigate to <strong>My Orders</strong> in the dashboard.</li><li>Click on the order number to view detailed tracking information.</li></ol><p>Order tracking is updated in real-time. You will also receive email notifications at each stage: order confirmed, shipped, out for delivery, and delivered.</p><p>If your order shows as delivered but you have not received it, please contact our support team within 48 hours.</p>',
)

create_kb_answer(
  category:     category_products,
  kb_locale:    kb_locale,
  title:        'Return and exchange policy',
  internal_note: 'Return policy details',
  body:         '<p>Fast Lane Hardware offers a 30-day return policy for most products. Here is what you need to know:</p><ul><li><strong>Eligibility:</strong> Items must be in original packaging and unused condition. Custom-built systems have a 14-day return window.</li><li><strong>How to initiate:</strong> Log in to your account, go to the order, and click <strong>Request Return</strong>. You will receive a return authorization number and shipping label.</li><li><strong>Refund timeline:</strong> Refunds are processed within 5-7 business days after we receive and inspect the returned item.</li><li><strong>Exchanges:</strong> If you need a different product, contact support to arrange an exchange instead of a refund.</li></ul><p>Defective items are covered under our warranty and can be returned at any time during the warranty period. See the warranty section for details.</p>',
)

create_kb_answer(
  category:     category_products,
  kb_locale:    kb_locale,
  title:        'Warranty and repairs',
  internal_note: 'Warranty information',
  body:         '<p>All Fast Lane Hardware products come with a standard 2-year manufacturer warranty. Here are the key details:</p><ul><li><strong>Coverage:</strong> Hardware defects in materials and workmanship. Normal wear and tear, accidental damage, and unauthorized modifications are not covered.</li><li><strong>Extended warranty:</strong> Available for purchase within 30 days of buying your product. Extends coverage to 4 years.</li><li><strong>Claim process:</strong> Submit a warranty claim through your account under <strong>My Orders</strong> &gt; <strong>Warranty Claims</strong>. Include a description of the issue and any error messages.</li><li><strong>Turnaround:</strong> Warranty repairs are typically completed within 5-10 business days. Expedited service is available for an additional fee.</li></ul><p>For warranty status on an existing repair, check the claim status in your account or contact support with your claim number.</p>',
)

# --- Category: Technical Support ---
category_technical = KnowledgeBase::Category.create!(
  knowledge_base_id: kb.id,
  category_icon:     'fa-wrench',
)
KnowledgeBase::Category::Translation.create!(
  category_id: category_technical.id,
  kb_locale_id: kb_locale.id,
  title: 'Technical support',
)

create_kb_answer(
  category:     category_technical,
  kb_locale:    kb_locale,
  title:        'Basic troubleshooting steps',
  internal_note: 'General troubleshooting steps',
  body:         '<p>If you are experiencing issues with your hardware, try these basic troubleshooting steps before contacting support:</p><ol><li><strong>Restart the device:</strong> Many issues can be resolved by simply restarting your computer or peripheral.</li><li><strong>Check connections:</strong> Ensure all cables are properly connected and seated. Look for loose or damaged cables.</li><li><strong>Update drivers:</strong> Visit our downloads page to get the latest drivers for your hardware.</li><li><strong>Run diagnostics:</strong> Use our built-in diagnostic tool (available in the support app) to identify common issues.</li><li><strong>Check system requirements:</strong> Verify that your system meets the minimum requirements for the product you are having trouble with.</li></ol><p>If these steps do not resolve the issue, please submit a support ticket with details about what you have tried and any error messages you have seen.</p>',
)

create_kb_answer(
  category:     category_technical,
  kb_locale:    kb_locale,
  title:        'Downloading and installing drivers',
  internal_note: 'Driver download instructions',
  body:         '<p>To download drivers for your Fast Lane Hardware products:</p><ol><li>Visit our <strong>Downloads</strong> section at support.fastlane.inc/downloads.</li><li>Select your product category and model number.</li><li>Choose the driver for your operating system (Windows, Linux, or macOS).</li><li>Download and run the installer. Follow the on-screen instructions.</li><li>Restart your computer after installation to ensure the driver is properly loaded.</li></ol><p><strong>Tip:</strong> Keep your drivers up to date for the best performance and compatibility. Enable automatic updates in the Fast Lane Support app to receive notifications when new drivers are available.</p>',
)

create_kb_answer(
  category:     category_technical,
  kb_locale:    kb_locale,
  title:        'System compatibility and requirements',
  internal_note: 'System compatibility info',
  body:         '<p>Before purchasing or installing Fast Lane Hardware products, check the system requirements:</p><ul><li><strong>Processor:</strong> Intel Core i5 (8th gen or newer) or AMD Ryzen 5 (2000 series or newer) for most products.</li><li><strong>Memory:</strong> Minimum 8 GB RAM recommended. 16 GB or more for high-performance configurations.</li><li><strong>Storage:</strong> SSD with at least 50 GB free space for software installations.</li><li><strong>Operating System:</strong> Windows 10/11, Ubuntu 20.04+, or macOS 12+.</li><li><strong>USB:</strong> USB 3.0 or later ports for peripherals and external storage.</li></ul><p>For specific product compatibility, check the product page or contact our sales team before making a purchase. They can help you choose the right configuration for your needs.</p>',
)

# --- Category: Billing & Payments ---
category_billing = KnowledgeBase::Category.create!(
  knowledge_base_id: kb.id,
  category_icon:     'fa-credit-card',
)
KnowledgeBase::Category::Translation.create!(
  category_id: category_billing.id,
  kb_locale_id: kb_locale.id,
  title: 'Billing and payments',
)

create_kb_answer(
  category:     category_billing,
  kb_locale:    kb_locale,
  title:        'Accepted payment methods',
  internal_note: 'Accepted payment methods',
  body:         '<p>Fast Lane Hardware accepts the following payment methods:</p><ul><li><strong>Credit/Debit cards:</strong> Visa, Mastercard, American Express</li><li><strong>PayPal:</strong> Pay securely with your PayPal account</li><li><strong>Bank transfer:</strong> Available for B2B orders over 500 EUR. Payment terms: net 30 days.</li><li><strong>Purchase order:</strong> For approved B2B customers with established credit terms.</li></ul><p>All online payments are processed securely via encrypted connections. We never store your full card details on our servers.</p>',
)

create_kb_answer(
  category:     category_billing,
  kb_locale:    kb_locale,
  title:        'Viewing and downloading invoices',
  internal_note: 'Invoice information',
  body:         '<p>You can access all your invoices through your Fast Lane Support account:</p><ol><li>Log in to support.fastlane.inc.</li><li>Go to <strong>Billing</strong> in the dashboard.</li><li>Click <strong>Invoice History</strong> to see all past invoices.</li><li>Click the download icon next to any invoice to save it as a PDF.</li></ol><p>Invoices are generated automatically when your order is confirmed. You will also receive a copy via email. For B2B customers, invoices can be sent directly to your accounting department upon request.</p>',
)

create_kb_answer(
  category:     category_billing,
  kb_locale:    kb_locale,
  title:        'Refund process and timelines',
  internal_note: 'Refund process',
  body:         '<p>Refunds are processed based on the original payment method:</p><ul><li><strong>Credit card:</strong> 5-7 business days after approval</li><li><strong>PayPal:</strong> 3-5 business days after approval</li><li><strong>Bank transfer:</strong> 7-10 business days after approval</li><li><strong>Purchase order:</strong> Credit memo issued within 5 business days</li></ul><p>You will receive an email notification when your refund is processed. If you have not received your refund within the stated timeframe, please check with your bank or payment provider, then contact our support team if needed.</p>',
)

puts 'Knowledge base categories and answers created.'

# Activate Time Accounting
Setting.set('time_accounting', true)
Setting.set('time_accounting_unit', 'hour')
Setting.set('time_accounting_selector', {"condition"=>{"ticket.state_id"=>{"operator"=>"is", "value"=>["5", "1", "2", "6", "3"]}}})
Setting.set('time_accounting_types', true)
Ticket::TimeAccounting::Type.create!(name: 'Internal', created_by_id: 1, updated_by_id: 1)
Ticket::TimeAccounting::Type.create!(name: 'B2C Support', created_by_id: 1, updated_by_id: 1)


# UserInfo.current_user_id = morganreed
# OnlineNotification.create!([
#                              { o_id: ticket1.id, object_lookup_id: ObjectLookup.by_name('Ticket'), type_lookup_id: TypeLookup.by_name('create'), user_id: morganreed.id, seen: false, updated_by_id: agent3.id, created_by_id: agent3.id, created_at: Time.zone.now - 90.minutes },
#                           ])

# # activity stream
# ActivityStream.create!([
#                          { activity_stream_type_id: TypeLookup.by_name('create'), activity_stream_object_id: ObjectLookup.by_name('Ticket'), permission_id: Permission.lookup(name: 'ticket.agent'), group_id: 1, o_id: ticket1.id, created_by_id: agent2.id, created_at: Time.zone.now - 4.hours },
#                         ])

# CTI/phone
calc_plus = 1
if Cti::Log.last.nil?
  # empty, can start by '1'
  call_id_counter = 1
else
  # not empty, need to calculate from last ID
  call_id_counter = Cti::Log.last.call_id.to_i
end

call_id_counter = call_id_counter + calc_plus
Cti::Log.create(
  direction:    'in',
  from:         '4930609854180',
  from_comment: johndoe.fullname,
  to:           '4930609811111',
  to_comment:   liamchen.fullname,
  call_id:      call_id_counter.to_s.rjust(5, '0'),
  comment:      '',
  state:        'newCall',
  done:         false,
  preferences:  {
    from: [
      {
        caller_id: '4930726128135',
        comment:   nil,
        level:     'known',
        object:    'User',
        o_id:      2,
        user_id:   2,
      }
    ]
  },
  created_at:   Time.zone.now,
)

puts 'Enabling AI providers...'

SeedHelpers.set_setting_without_validation(name: 'ai_provider', value: true)

puts 'Enabling ticket duplicate detection feature...'

# Enable ticket duplicate detection feature with 'customer_id' as the attribute to check for duplicates.
SeedHelpers.set_setting_without_validation(name: 'ticket_duplicate_detection', value: true)
SeedHelpers.set_setting_without_validation(name: 'ticket_duplicate_detection_attributes', value: ['customer_id'])

# Add a article creation note for one type for a screenshot
Setting.set('ui_ticket_add_article_hint', {
      :"note-public"    => "You are writing a |public note|.",
   })

puts 'Enabling PGP integration for secure email screenshots...'

# Enable PGP so the Encrypt/Sign buttons show up in the reply editor and the
# security status badges show up on ticket articles. Dummy keys below are for
# documentation screenshots only, never use them for anything else.
Setting.set('pgp_integration', true)

UserInfo.current_user_id = 1

# Private key for the support group (ticket 7's group email), so agent replies
# can be signed and the "Sign" button is available.
PGPKey.create!(
  key: File.read("#{__dir__}/assets/pgp/support-fastlane-inc.asc"),
)

# Public key for the customer on ticket 7, so agent replies can be encrypted
# and the "Encrypt" button is available.
PGPKey.create!(
  key: File.read("#{__dir__}/assets/pgp/mola-babangida-xz.pub.asc"),
)

# Disable import mode at the end of the seeding process so users can create new tickets.
Setting.set('import_mode', false)

puts 'Done!'
