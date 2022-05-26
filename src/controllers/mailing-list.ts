import express, {NextFunction, Request, Response} from 'express';
import SheetsService from "../lib/sheets/SheetsService";
import Validation from "../lib/validation";
import fs from 'fs';
import isRfc822Compliant from "../lib/validation/email-validator/isRfc822Compliant";
import {isGovernmentEmailAddress} from "../lib/validation/email-validator/emailValidator";

export const mailingList = async function(req: Request, res: Response) {
  const personalName = req.body.personalName;
  const organisationName = req.body.organisationName;
  const contactEmail = req.body.contactEmail;
  const serviceName = req.body.serviceName;
  let errorMessages: Map<String, String> = new Map<String, String>();

  const formValueHolder = {
    personalNameHolder: personalName,
    organisationNameHolder: organisationName,
    contactEmailHolder: contactEmail,
    serviceNamehHolder: serviceName
  }

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
  } else if(!isRfc822Compliant(contactEmail)){
    errorMessages.set('contactEmail', 'Enter an email address in the correct format, like name@example.gov.uk');
  } else {
      if (! await isGovernmentEmailAddress(contactEmail)) {
        errorMessages.set('contactEmail', 'Enter a government email address');
      }
  }

  if(!onlyLettersAndNumbersPattern.test(serviceName)) {
    errorMessages.set('serviceName', 'Enter the name of your service');
  }

  if(errorMessages.size != 0) {
    res.render('mailing-list.njk', { errors: errorMessages, values: formValueHolder });
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
