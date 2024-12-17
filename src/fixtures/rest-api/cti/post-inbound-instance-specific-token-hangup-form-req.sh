curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
  --form 'event="hangup"' \
  --form 'from="493023125741"' \
  --form 'to="492214710334"' \
  --form 'direction="in"' \
  --form 'callId="2d77882f-68df-40f0-8c62-b642589c00bc"' \
  --form 'answeringNumber="emily@fastlane.inc"' \
  --form 'cause="normalClearing"'
