/**
 * @name Mission GTFO India
 * @author AwkDev
 *
 * @desc Goes through Netherlands immigration website to see if visa appointmnet is available.
 */
const puppeteer = require('puppeteer')

// sydney 
const SYDNEY_URL = 'https://www.vfsvisaonline.com/Netherlands-Global-Online-Appointment_Zone1/AppScheduling/AppWelcome.aspx?P=wClNiU4hmfBtBSfTMP3wVn00rGAUYRxphZxioDYfEy0%3D'

// new delhi
const DELHI_URL = 'https://www.vfsvisaonline.com/Netherlands-Global-Online-Appointment_Zone1/AppScheduling/AppWelcome.aspx?P=c%2F75XIhVUvxD%2BgDk%2BH%2BCGBV5n9rG51cpAkEXPymduoQ%3D'


// make this true if you just want to test if script works.
// it's working for sydney as of 29-07-2020 22:10:00 IST
const TEST_SYDNEY = false

try {
    (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setViewport({ width: 1280, height: 800 })
        await page.goto(TEST_SYDNEY ? SYDNEY_URL : DELHI_URL, { waitUntil: 'networkidle0' })
        const link = await page.evaluate(() => {
            return $('a').get(2).click()
        });
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });
        
        if(!TEST_SYDNEY) {
            const select = await page.evaluate(() => {
                $('select').val(26)
                $('input[type="submit"]').click()
            });
        }

        await page.waitForSelector('select#plhMain_cboVisaCategory')

        const selectApplicantType = await page.evaluate(() => {
            $('select#plhMain_cboVisaCategory').val(914)
            $('input[type="submit"]:nth-child(1)').click()
        });

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        const slotUnavailable = await page.evaluate(() => {
            return $('span#plhMain_lblMsg').text() === 'No date(s) available for appointment.'
         });

        if(slotUnavailable) {
            console.log("***** PLS DONT KILL SELF FREN :( Will check again after a while *****")
        } else {
            console.log("####### YAYYYYY SLOT AVAILABLE!!!! GO SIGN UP ############")
        }
        await page.screenshot({ path: 'result.png' })
        await browser.close()
    })()
} catch (err) {
    console.error(err)
}