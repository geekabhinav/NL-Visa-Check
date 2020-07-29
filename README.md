# NL-Visa-Check

## Why Even?
NBN trying to get an appointment at Netherlands embassy at New Delhi, but the slots seem to get full immeditaely. This script (if run as cron), will periodically check if slots available and can trigger mail, text, TG or call, to notify him whenever slots become available.

## Prerequisites 
Have node installed (JS MASTERRACE!!!)

### Steps to run 
* `yarn install` or `npm i`
* run `node scrape.js`

### How to Know if it's Working?
Switch to Sydney since the appointments are open there. Change flag on `line #18` to `true`, and it will look for Sydney appointment
