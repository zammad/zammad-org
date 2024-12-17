curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
  --form 'event="answer"' \
  --form 'from="493023125741"' \
  --form 'to="492214710334"' \
  --form 'direction="out"' \
  --form 'callId="371e2cd7-67ff-4fd9-892b-030c8d128fb1"' \
  --form 'caller[]="Lauren Brooks"' \
  --form 'caller[]="Emily Tran"'
