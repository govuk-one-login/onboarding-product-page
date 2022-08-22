import * as EmailValidator from 'email-validator';
import {Request, Response} from 'express';
import {promises as fs} from 'fs';
import SheetsService from "../lib/sheets/SheetsService";

export const mailingList = async function(req: Request, res: Response) {
  const personalName = req.body.personalName;
  const organisationName = req.body.organisationName;
  const contactEmail = req.body.contactEmail;
  const serviceName = req.body.serviceName;
  let errorMessages: Map<String, String> = new Map<String, String>();

  const values = new Map<string, string>([
    ["personalName", personalName],
    ["organisationName", organisationName],
    ["contactEmail", contactEmail],
    ["serviceName", serviceName]
  ]);

  const onlyLettersPattern = /^[a-zA-Z\-\s]{1,300}$/;
  const onlyLettersAndNumbersPattern = /^[a-zA-Z\-0-9_\s]{1,300}$/;

  if(!onlyLettersPattern.test(personalName)) {
    errorMessages.set('personalName', 'Enter your name');
  }

  if(!onlyLettersAndNumbersPattern.test(organisationName)) {
    errorMessages.set('organisationName', 'Enter your organisation name');
  }

  if(contactEmail === "") {
    errorMessages.set('contactEmail', 'Enter your government email address');
  } else if(!EmailValidator.validate(contactEmail)){
    errorMessages.set('contactEmail', 'Enter an email address in the correct format, like name@example.gov.uk');
  } else {
    try {
      const emails = await fs.readFile("./valid-email-domains.txt", "utf-8");
      let validEmailDomains = [];
      validEmailDomains = emails.split("\n");

      const isEmailGovUK = validEmailDomains.find(suffix => {
        // @ts-ignore
        return contactEmail.trim().endsWith(suffix) && suffix != "";
      });

      if (!isEmailGovUK) {
        errorMessages.set('contactEmail', 'Enter a government email address');
      }
    } catch (error) {
      console.error("List of valid email domains could not be loaded.");
      console.error(error);
      process.kill(process.pid, 'SIGTERM');
    }
  }

  if(!onlyLettersAndNumbersPattern.test(serviceName)) {
    errorMessages.set('serviceName', 'Enter the name of your service');
  }

  if(errorMessages.size != 0) {
    res.render('mailing-list.njk', { errorMessages: errorMessages, values: values });
  } else {

    let sheet = new SheetsService(process.env.MAILING_LIST_SPREADSHEET_ID as string);
    let values = new Map<string, string>();
    values.set('name', personalName);
    values.set('organisation', organisationName);
    values.set('email', contactEmail);
    values.set('service', serviceName);

    try {
      await sheet.init();
      await sheet.appendValues(values,
        process.env.MAILING_LIST_SHEET_DATA_RANGE as string,
        process.env.MAILING_LIST_SHEET_HEADER_RANGE as string
      );
      res.redirect('/mailing-list/confirmation');
    } catch(err) {
      console.error(err);
      res.status(500);
      res.render('there-is-a-problem.njk');
    }

  }

}
